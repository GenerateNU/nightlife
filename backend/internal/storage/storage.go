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
	VenueRatings
	Friendship
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type VenueRatings interface {
	GetAllVenueRatings(context.Context, uuid.UUID) ([]models.VenueRatings, error)
}

type Friendship interface {
	CreateFriendship(context.Context, models.Friendship) error
}
