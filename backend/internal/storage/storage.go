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
	GetReviewByID
}

type Test interface {
	GetAllTests(context.Context) ([]models.Test, error)
}


type Venue interface {
	GetAllVenues(context.Context) ([]models.Test, error)
}

type Review interface {
	PatchVenueReview(ctx context.Context,overall_rating int8,ambiance_rating int8,music_rating int8, crowd_rating int8,service_rating int8,review_text string, venueID uuid.UUID, reviewID int8) error
}

type GetReviewByID interface {
	GetVenueReviews(ctx context.Context, review_id int8, venue_id uuid.UUID) ([]models.Review, error)
}