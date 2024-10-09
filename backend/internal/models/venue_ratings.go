package models

import "github.com/google/uuid"

type VenueRatings struct {
	VenueID        uuid.UUID `json:"venue_id"`
	VenueName      string    `json:"venue_name"`
	OverallRating  int       `json:"overall_rating"`
	AmbianceRating int       `json:"ambiance_rating"`
	MusicRating    int       `json:"music_rating"`
	CrowdRating    int       `json:"crowd_rating"`
	ServiceRating  int       `json:"service_rating"`
}
