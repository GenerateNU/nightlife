package storage

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

type Storage interface {
	Close(context.Context) error
	Test
	Venue
	Review
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
