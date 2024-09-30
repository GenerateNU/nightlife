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
	UpdateProfilePrefences(context.Context, uuid.UUID, string, string, string, string) error
	DeleteAccount(context.Context, uuid.UUID) error
	RemoveFriend(context.Context, uuid.UUID, string) error
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type Venues interface {
	DeleteVenue(context.Context, uuid.UUID) error
}
type VenueRatings interface {
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
}
