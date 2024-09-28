package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
)

type Storage interface {
	Close(context.Context) error
	Test
	Profile
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}

type Profile interface {
	CreatePreferences(context.Context, models.Preferences) error
}
