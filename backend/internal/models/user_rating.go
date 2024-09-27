package models

import "github.com/google/uuid"

type UserRating struct {
	UserID uuid.UUID  `json:"user_id"`
	Username string   `json:"username"`
	VenueID uuid.UUID `json:"venue_id"`
	VenueName string  `json:"venue_name"`
	OverallRating int `json:"overall_rating"`
}