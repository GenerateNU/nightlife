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

	// location : Geographical point? 

	// VenueType string `json:"venue_type"`

	CreatedAt time.Time `json:"created_at"`

	//UpdatedAt time.Time `json:"updated_at"`
}