package models

type ReviewWithVenue struct {
	Review Review `json:"review"`
	Venue  Venue  `json:"venue"`
}
