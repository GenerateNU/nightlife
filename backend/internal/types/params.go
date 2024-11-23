package types

import (
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/GenerateNU/nightlife/internal/storage"
	"github.com/GenerateNU/nightlife/internal/models"
)

type Params struct {
	Supabase config.Supabase
	Store    storage.Storage
}

type ReviewUpdateRequest struct {
	OverallRating  int    `json:"overall_rating"`
	AmbianceRating int    `json:"ambiance_rating"`
	MusicRating    int    `json:"music_rating"`
	CrowdRating    int    `json:"crowd_rating"`
	ServiceRating  int    `json:"service_rating"`
	ReviewText     string `json:"review_text"`
}

type ProfileUpdateRequest struct {
	FirstName         *string   `json:"first_name"`
	Username          *string   `json:"username"`
	Email             *string   `json:"email"`
	Age               *int      `json:"age"`
	Location          *string   `json:"location"`
	ProfilePictureURL *string   `json:"profile_picture_url"`
	PersonalityType   *string   `json:"personality_type"`
	Pronouns		  *string 	`json:"pronouns"`
	Biography		  *string 	`json:"biography"`
	InstagramURL	  *string	`json:"instagram_url"`
	TikTokURL		  *string	`json:"tik_tok_url"`
	TwitterURL		  *string	`json:"twitter_url"`
	Phone			  *string	`json:"phone"`
	Privacy			  *bool		`json:"privacy"`
<<<<<<< HEAD
}

type ReviewWithVenue struct {
	Review 			models.Review `json:"review"`
	Venue  			models.Venue  `json:"venue"`
=======
>>>>>>> f0f92f053b919d67761ee452977cb506d298f1ee
}