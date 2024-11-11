package models

import (
	"time"

	"github.com/google/uuid"
)

type Venue struct {
	VenueID uuid.UUID `json:"venue_id"`

	Name string `json:"name"`

	Address string `json:"address"`

	City string `json:"city"`

	State string `json:"state"`

	ZipCode string `json:"zip_code"`

	Latitude float64 `json:"latitude"`

	Longitude float64 `json:"longitude"`

	// VenueType string `json:"venue_type"`

	PriceCap float64 `json:"price"`

	TotalRating float64 `json:"total_rating"`

	CreatedAt time.Time `json:"created_at"`



	//UpdatedAt time.Time `json:"updated_at"`
}
