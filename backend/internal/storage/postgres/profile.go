package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
)

func (db *DB) CreatePreferences(ctx context.Context, p models.Preferences) error {
	// query to save user data to db
	query := `INSERT INTO preferences (userID, location, age, music, ambiance, notifs) 
				VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := db.conn.Query(ctx, query, p.UserID, p.Location, p.Age, p.Music, p.Ambiance, p.Notifs)
	return err
}
