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
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}


type UserRating interface {
	GetAllUserRatings(context.Context, uuid.UUID) ([]UserRating, error)
}