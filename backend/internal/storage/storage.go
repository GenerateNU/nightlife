package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"

)

type Storage interface {
	Close()
	Test
	UserRating
	Venues
	VenueRatings
	Profile
	Review
	Friendship
	Event
	Bookmarks
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Profile interface {
	CreatePreferences(context.Context, models.Preferences) error
	PatchProfile(context.Context, uuid.UUID, *string, *string, *string, *int, *string, *string, *string, *string, *string, *string, *string, *string, *string, *bool) error
	UpdateProfilePreferences(context.Context, uuid.UUID, string, string, string, string) error
	DeleteAccount(context.Context, uuid.UUID) error
	RemoveFriend(context.Context, uuid.UUID, string) error
	GetProfileByColumn(context.Context, string, string) (models.Profile, error)
	GetAllUsers(context.Context) ([]models.Profile, error)
	GetUserAuthoredReviews(context.Context, uuid.UUID) ([]models.Review, error)
	GetUserReviewsWithVenueData(ctx context.Context, userID uuid.UUID) ([]models.ReviewWithVenue, error)
	GetUserSavedVenues(context.Context, uuid.UUID) ([]models.Venue, error)
	GetUserVisitedVenues(context.Context, uuid.UUID) ([]models.Venue, error)
	GetUserLocation(ctx context.Context, userID uuid.UUID) (models.Location, error)
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
	CreateReview(context.Context, models.Review) error
}

type Venues interface {
	DeleteVenue(context.Context, uuid.UUID) error
	DeleteReviewForVenue(context.Context, int8) error
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
	GetVenueFromID(context.Context, uuid.UUID) (models.Venue, error)
	GetVenuesFromName(context.Context, string) ([]models.Venue, error)
	GetAllVenues(ctx context.Context) ([]models.Venue, error)
	GetVenuesByIDs(ctx context.Context, ids []uuid.UUID) ([]models.Venue, error)
	GetVenuesByLocation(ctx context.Context, latitude float64, longitude float64, radiusInMeters int) ([]models.Venue, error)
}

type VenueRatings interface {
	DeleteReviewForVenue(context.Context, int8) error
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
	GetAllVenuesWithFilter(ctx context.Context, where string, sort string) ([]models.Venue, error)
}

type Friendship interface {
	CreateFriendship(context.Context, models.Friendship) error
	GetFriendshipsByUserID(context.Context, uuid.UUID) ([]models.Friendship, error)
}

type Event interface {
	GetEventForVenue(context.Context, uuid.UUID) ([]models.Event, error)
}

type Review interface {
	PatchVenueReview(ctx context.Context, overallRating int8, energyRating int8, mainstreamRating int8, priceRating int8, crowdRating int8, hypeRating int8, exclusiveRating int8, reviewText string, venueID uuid.UUID, reviewID int8) error
}

type Bookmarks interface {
	GetBookmarkFromID(context.Context, uuid.UUID) (models.Bookmarks, error)
	CreateBookmark(context.Context, models.Bookmarks) error
}
