package types

import (
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/GenerateNU/nightlife/internal/storage"
)

type Params struct {
	Supabase config.Supabase
	Store    storage.Storage
}

type ReviewUpdateRequest struct {
	OverallRating    int    `json:"overall_rating"`
	EnergyRating     int8   `json:"energy_rating"`
	MainstreamRating int8   `json:"mainstream_rating"`
	PriceRating      int8   `json:"price_rating"`
	CrowdRating      int8   `json:"crowd_rating"`
	HypeRating       int8   `json:"hype_rating"`
	ExclusiveRating  int8   `json:"exclusive_rating"`
	ReviewText       string `json:"review_text"`
}

type ProfileUpdateRequest struct {
	FirstName         *string `json:"first_name"`
	Username          *string `json:"username"`
	Email             *string `json:"email"`
	Age               *int    `json:"age"`
	Location          *string `json:"location"`
	ProfilePictureURL *string `json:"profile_picture_url"`
	PersonalityType   *string `json:"personality_type"`
	Pronouns          *string `json:"pronouns"`
	Biography         *string `json:"biography"`
	InstagramURL      *string `json:"instagram_url"`
	TikTokURL         *string `json:"tik_tok_url"`
	TwitterURL        *string `json:"twitter_url"`
	Phone             *string `json:"phone"`
	Privacy           *bool   `json:"privacy"`
}

type ReviewWithVenue struct {
	Review models.Review `json:"review"`
	Venue  models.Venue  `json:"venue"`
}
