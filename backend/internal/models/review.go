package models

import (
	"time"

	"github.com/google/uuid"
)

type Review struct {
	OverallRating    int8      `json:"overall_rating"`
	EnergyRating     int8      `json:"energy_rating"`
	MainstreamRating int8      `json:"mainstream_rating"`
	PriceRating      int8      `json:"price_rating"`
	CrowdRating      int8      `json:"crowd_rating"`
	HypeRating       int8      `json:"hype_rating"`
	ExclusiveRating  int8      `json:"exclusive_rating"`
	ReviewText       string    `json:"review_text"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	VenueID          uuid.UUID `json:"venue_id"`
	ReviewID         int8      `json:"review_id"`
}
