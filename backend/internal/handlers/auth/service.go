package auth

import "github.com/GenerateNU/nightlife/internal/storage"

type AuthService struct {
	store storage.Storage
}

func newService(store storage.Storage) *AuthService {
	return &AuthService{store: store}
}
