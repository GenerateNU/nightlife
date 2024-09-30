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
	Profile
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Profile interface {
	CreatePreferences(context.Context, models.Preferences) error
	CreateRatings(context.Context, models.UserRating) error
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}
