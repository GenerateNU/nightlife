package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

type Storage interface {
	Close(context.Context) error
	Test
	UserRating
	Venues
	VenueRatings
	Profile
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Profile interface {
	CreatePreferences(context.Context, models.Preferences) error
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type Venues interface {
	DeleteVenue(context.Context, uuid.UUID) error
	DeleteReviewForVenue(context.Context, int8) error
}

type VenueRatings interface {
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
}
