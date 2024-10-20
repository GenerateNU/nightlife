package postgres

import (
	"context"
	"fmt"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (db *DB) DeleteVenue(ctx context.Context, id uuid.UUID) error {
	_, err := db.conn.Exec(ctx, `DELETE FROM "Venue" v WHERE venue_id = $1`, id)
	if err != nil {
		return err
	}
	return nil
}

/*
Deletes a review for a venue.
*/
func (db *DB) DeleteReviewForVenue(ctx context.Context, reviewID int8) error {
	result, err := db.conn.Exec(ctx, `DELETE FROM "Review" WHERE review_id = $1`, reviewID)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("delete failed: review does not exist")
	}

	return nil
}

func (db *DB) GetVenueFromID(ctx context.Context, id uuid.UUID) (models.Venue, error) {
	var query = `SELECT venue_id, name, address, city, state, zip_code, created_at FROM "Venue" WHERE venue_id = $1`
	rows, err := db.conn.Query(ctx, query, id.String())
	if err != nil {
		return models.Venue{}, err
	}
	defer rows.Close()
	arr, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
	return arr[0], err
}

func (db *DB) GetVenueFromName(ctx context.Context, name string) (models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at FROM "Venue" WHERE name ilike $1`
	rows, err := db.conn.Query(ctx, query, name)
	if err != nil {
		fmt.Println("HALLO " + err.Error())
		return models.Venue{}, err
	}
	defer rows.Close()
	arr, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
	return arr[0], err
}

func (db *DB) GetAllVenues(ctx context.Context) ([]models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at FROM Venue`
	rows, err := db.conn.Query(ctx, query)
	if err != nil {
		fmt.Println("HALLO " + err.Error())
		return []models.Venue{}, err
	}
	defer rows.Close()
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
}


