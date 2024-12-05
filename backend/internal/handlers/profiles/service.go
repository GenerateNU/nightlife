package profiles

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/storage"
)

type Service struct {
	store storage.Storage
	signUp auth.SignUpService
}

func newService(store storage.Storage, signUp auth.SignUpService) *Service {
	return &Service{store: store, signUp: signUp}
}
