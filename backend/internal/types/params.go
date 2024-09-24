package types

import (
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/GenerateNU/nightlife/internal/storage"
)

type Params struct {
	Supabase config.Supabase
	Store    storage.Storage
}
