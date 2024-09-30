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
	OverallRating  int    `json:"overall_rating"`
	AmbianceRating int    `json:"ambiance_rating"`
	MusicRating    int    `json:"music_rating"`
	CrowdRating    int    `json:"crowd_rating"`
	ServiceRating  int    `json:"service_rating"`
	ReviewText     string `json:"review_text"`
}

