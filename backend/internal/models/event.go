package models

import "github.com/google/uuid"

// Represents Venue Event
type Event struct {
	EventID   int       `json:"event_id"`
	Name      string    `json:"name"`
	Date      int       `json:"event_date"`
	Time      string    `json:"event_time"`
	ImagePath string    `json:"image_path"`
	VenueID   uuid.UUID `json: "venueid"`
}

func (e *Event) Validate() map[string]string {
	return nil
}
