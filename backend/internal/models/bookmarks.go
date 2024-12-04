package models

import (
	"time"

	"github.com/google/uuid"
)

// Represents Bookmarks Event
type Bookmarks struct {
	VenueID    uuid.UUID `json:"venue_id"`
	UserID     uuid.UUID `json:"user_id"`
	BookmarkID int       `json:"bookmark_id"`
	CreatedAt  time.Time `json:"created_at"`
}
