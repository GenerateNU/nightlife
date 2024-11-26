package models

import (
	"database/sql"
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

	VenueType string `json:"venue_type"`

	CreatedAt time.Time `json:"created_at"`

	UpdatedAt sql.NullTime `json:"updated_at"`

	TotalRating float32 `json:"total_rating"`

	Price float32 `json:"price"`

	AvgEnergy float32 `json:"avg_energy"`

	AvgMainstream float32 `json:"avg_mainstream"`

	AvgPrice float32 `json:"avg_price"`

	AvgExclusive float32 `json:"avg_exclusive"`
}

