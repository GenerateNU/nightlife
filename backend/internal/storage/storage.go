package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

type Storage interface {
	Close()
	Test
	Venue
	Review
	UserRating
	Venues
	Profile
	Friendship
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Venue interface {
	GetAllVenues(context.Context) ([]models.Test, error)
}

type Review interface {
	PatchVenueReview(ctx context.Context, overallRating int8, ambianceRating int8, musicRating int8, crowdRating int8, serviceRating int8, reviewText string, venueID uuid.UUID, reviewID int8) error
}
type Profile interface {
	CreatePreferences(context.Context, models.Preferences) error
	UpdateProfilePreferences(context.Context, uuid.UUID, string, string, string, string) error
	DeleteAccount(context.Context, uuid.UUID) error
	RemoveFriend(context.Context, uuid.UUID, string) error
	GetProfileByUsername(context.Context, string) (models.Profile, error)
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type Venues interface {
	DeleteVenue(context.Context, uuid.UUID) error
	DeleteReviewForVenue(context.Context, int8) error
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
}

type Friendship interface {
	CreateFriendship(context.Context, models.Friendship) error
}
