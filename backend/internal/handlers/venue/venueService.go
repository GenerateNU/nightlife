package venue

import "github.com/GenerateNU/nightlife/internal/storage"

type Service struct {
	store storage.Storage
}

func newService(store storage.Storage) *Service {
	return &Service{store: store}
}
