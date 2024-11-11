package models

import (
	"time"

	"github.com/google/uuid"
)

// Represents Venue Event
type Event struct {
	EventID   int       `json:"event_id"`
	Name      string    `json:"name"`
	Date      time.Time `json:"event_date"`
	Time      time.Time `json:"event_time"`
	ImagePath string    `json:"image_path"`
	VenueID   uuid.UUID `json:"venue_id"`
	CreatedAt time.Time `json:"created_at"`
}

func (e *Event) Validate() map[string]string {
	return nil
}
