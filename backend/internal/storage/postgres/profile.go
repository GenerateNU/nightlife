package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
)

func (db *DB) CreatePreferences(ctx context.Context, p models.Preferences) error {
	// query to save user data to db
	query := `INSERT INTO preferences (user_id, location, age, music, ambiance, notifs) 
				VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := db.conn.Query(ctx, query, p.UserID, p.Location, p.Age, p.Music, p.Ambiance, p.Notifs)
	return err
}

func (db *DB) CreateRatings(ctx context.Context, r models.UserRating) error {
	query := `INSERT INTO ratings (user_id, username, venue_id, venue_name, overall_rating) 
				VALUES ($1, $2, $3, $4)`

	_, err := db.conn.Query(ctx, query, r.UserID, r.Username, r.VenueID, r.VenueName, r.OverallRating)
	return err
}
