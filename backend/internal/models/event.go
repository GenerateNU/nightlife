package models

import (
	"regexp"
	"time"

	"github.com/google/uuid"
)

// Represents Venue Event
type Event struct {
	EventID   int       `json:"event_id"`
	Name      string    `json:"name"`
	Date      time.Time `json:"event_date"`
	ImagePath string    `json:"image_path"`
	VenueID   uuid.UUID `json:"venue_id"`
	CreatedAt time.Time `json:"created_at"`
}

func (e *Event) Validate() map[string]string {
	errors := make(map[string]string)

	if e.Name == "" {
		errors["name"] = "Name required"
	}

	if e.Date.Before(time.Now()) {
		errors["date"] = "Event date already occurred"
	}

	imageEnding := regexp.MustCompile(`\.(jpg|jpeg|png|gif)$`)

	if e.ImagePath == "" || !imageEnding.MatchString(e.ImagePath) {
		errors["image_path"] = "invalid image path"
	}

	if e.VenueID == uuid.Nil {
		errors["venue_id"] = "invalid venue"
	}

	return errors
}
