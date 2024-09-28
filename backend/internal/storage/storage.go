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
	Profiles
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]models.UserRating, error)
}

type Profiles interface {
	UpdateProfilePrefences(context.Context, uuid.UUID, string, string, string, string) error
}
