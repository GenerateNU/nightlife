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

	CreatedAt time.Time `json:"created_at"`

	//UpdatedAt time.Time `json:"updated_at"`

	TotalRating *float64 `json:"total_rating"`

	Price *float64 `json:"price"`
}

type VenueWithHours struct {
	VenueID        uuid.UUID `json:"venue_id"`
	Name           string    `json:"name"`
	Address        string    `json:"address"`
	City           string    `json:"city"`
	State          string    `json:"state"`
	ZipCode        string    `json:"zip_code"`
	Latitude       float64   `json:"latitude"`
	Longitude      float64   `json:"longitude"`
	VenueType      string    `json:"venue_type"`   // Venue type field added
	TotalRating    *float64  `json:"total_rating"` // Nullable fields are pointers
	Price          *float64  `json:"price"`
	AvgMainstream  *float64  `json:"avg_mainstream"`
	AvgPrice       *float64  `json:"avg_price"`
	AvgExclusive   *float64  `json:"avg_exclusive"`
	AvgEnergy      *float64  `json:"avg_energy"`
	MondayHours    string    `json:"monday_hours"`
	TuesdayHours   string    `json:"tuesday_hours"`
	WednesdayHours string    `json:"wednesday_hours"`
	ThursdayHours  string    `json:"thursday_hours"`
	FridayHours    string    `json:"friday_hours"`
	SaturdayHours  string    `json:"saturday_hours"`
	SundayHours    string    `json:"sunday_hours"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}
