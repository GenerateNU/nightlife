package models

import (
	"time"

	"github.com/google/uuid"
)

type Review struct {
	OverallRating  int8      `json:"overall_rating"`
	AmbianceRating int8      `json:"ambiance_rating"`
	MusicRating    int8      `json:"music_rating"`
	CrowdRating    int8      `json:"crowd_rating"`
	ServiceRating  int8      `json:"service_rating"`
	ReviewText     string    `json:"review_text"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	VenueID        uuid.UUID `json:"venue_id"`
	ReviewID       int8      `json:"review_id"`
}