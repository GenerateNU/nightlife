package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
)

type Storage interface {
	Close(context.Context) error
	Test
	Venue
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}


type Venue interface {
	GetAllVenues(context.Context) ([]models.Test, error)
}