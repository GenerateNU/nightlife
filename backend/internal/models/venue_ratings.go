package models

import (
	"time"

	"github.com/google/uuid"
)

type VenueRatings struct {
	UserID           uuid.UUID `json:"user_id"`
	ReviewText       *string   `json:"review_text"`
	VenueID          uuid.UUID `json:"venue_id"`
	VenueName        string    `json:"venue_name"`
	OverallRating    int       `json:"overall_rating"`
	EnergyRating     int8      `json:"energy_rating"`
	MainstreamRating int8      `json:"mainstream_rating"`
	PriceRating      int8      `json:"price_rating"`
	CrowdRating      int8      `json:"crowd_rating"`
	HypeRating       int8      `json:"hype_rating"`
	ExclusiveRating  int8      `json:"exclusive_rating"`
	ImagePath        *string   `json:"image_path"`
	CreatedAt        time.Time `json:"created_at"`
}
