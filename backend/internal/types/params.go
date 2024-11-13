package types

import (
	"github.com/GenerateNU/nightlife/internal/config"
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
