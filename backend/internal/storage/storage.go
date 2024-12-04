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
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Profile interface {
    CreatePreferences(context.Context, models.Preferences) error
    UpdateProfilePreferences(context.Context, uuid.UUID, string, string, string, string) error
    DeleteAccount(context.Context, uuid.UUID) error
	UserCharacter(context.Context, models.Preferences) error
	GetUserCharacter(context.Context, uuid.UUID) (string, error)
    RemoveFriend(context.Context, uuid.UUID, string) error
	GetProfileByColumn(context.Context, string, string) (models.Profile, error)
	GetAllUsers(context.Context) ([]models.Profile, error)
	AddUser(context.Context, models.Profile) error
	UserIDExists(context.Context, uuid.UUID) (bool, error)
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type Venues interface {
	DeleteVenue(context.Context, uuid.UUID) error
	DeleteReviewForVenue(context.Context, int8) error
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
	GetVenueFromID(context.Context, uuid.UUID) (models.Venue, error)
	GetVenueFromName(context.Context, string) (models.Venue, error)
	GetAllVenues(ctx context.Context) ([]models.Venue, error) 
}

type VenueRatings interface {
	DeleteReviewForVenue(context.Context, int8) error
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
}

type Friendship interface {
	CreateFriendship(context.Context, models.Friendship) error
}

type Review interface {
	PatchVenueReview(ctx context.Context, overallRating int8, ambianceRating int8, musicRating int8, crowdRating int8, serviceRating int8, reviewText string, venueID uuid.UUID, reviewID int8) error
}