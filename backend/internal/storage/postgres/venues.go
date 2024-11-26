package postgres

import (
	"context"
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (db *DB) DeleteVenue(ctx context.Context, id uuid.UUID) error {
	_, err := db.conn.Exec(ctx, `DELETE FROM venue v WHERE venue_id = $1`, id)
	if err != nil {
		return err
	}
	return nil
}

/*
Deletes a review for a venue.
*/
func (db *DB) DeleteReviewForVenue(ctx context.Context, reviewID int8) error {
	result, err := db.conn.Exec(ctx, `DELETE FROM review WHERE review_id = $1`, reviewID)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("delete failed: review does not exist")
	}

	return nil
}

func (db *DB) GetVenueReviews(ctx context.Context, reviewID int8, venueID uuid.UUID) ([]models.Review, error) {
	// Use proper SQL syntax without single quotes around the table name
	query := `SELECT * FROM "Review" r WHERE review_id = $1 AND venue_id = $2`
	rows, err := db.conn.Query(ctx, query, reviewID, venueID)
	if err != nil {
		return nil, err // Return nil slice on error for idiomatic Go
	}
	defer rows.Close() // Ensure you close the rows to free resources

	var reviews []models.Review
	for rows.Next() {
		var review models.Review
		if err := rows.Scan(
			&review.VenueID, // Make sure the order and fields match your table's structure
			&review.OverallRating,
			&review.AmbianceRating,
			&review.MusicRating,
			&review.CrowdRating,
			&review.ServiceRating,
			&review.ReviewText,
			&review.CreatedAt,
			&review.UpdatedAt,
		); err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	return reviews, nil
}

func (db *DB) PatchVenueReview(ctx context.Context, overallRating int8, ambianceRating int8, musicRating int8, crowdRating int8, serviceRating int8, reviewText string, venueID uuid.UUID, reviewID int8) error {
	// Log the incoming parameters for debugging and monitoring
	log.Printf("Attempting to update review with ReviewID: %d, VenueID: %s, Ratings: [Overall: %d, Ambiance: %d, Music: %d, Crowd: %d, Service: %d], Review Text: %s",
		reviewID, venueID, overallRating, ambianceRating, musicRating, crowdRating, serviceRating, reviewText)

	// SQL query execution
	_, err := db.conn.Exec(ctx, `
        UPDATE "Review" r
        SET
            overall_rating = $1,
            ambiance_rating = $2,
            music_rating = $3,
            crowd_rating = $4,
            service_rating = $5,
            review_text = $6,
            udpated_at = CURRENT_TIMESTAMP
        WHERE review_id = $7 AND venue_id = $8;
    `, overallRating, ambianceRating, musicRating, crowdRating, serviceRating, reviewText, reviewID, venueID)

	if err != nil {
		// Log the error with detailed context
		log.Printf("Failed to update review with ReviewID: %d, VenueID: %s, Error: %v", reviewID, venueID, err)
		return err
	}

	// Log a successful update
	log.Printf("Successfully updated review with ReviewID: %d, VenueID: %s", reviewID, venueID)
	return nil
}
func (db *DB) GetVenueFromID(ctx context.Context, id uuid.UUID) (models.Venue, error) {
	var query = `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating, avg_energy, avg_mainstream, avg_exclusive, avg_price, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) 
	AS longitude FROM Venue WHERE venue_id = $1`
	rows, err := db.conn.Query(ctx, query, id.String())
	if err != nil {
		return models.Venue{}, err
	}
	defer rows.Close()
	arr, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
	return arr[0], err
}

func (db *DB) GetVenueFromName(ctx context.Context, name string) (models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating, avg_energy, avg_mainstream, avg_exclusive, avg_price, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) 
	AS longitude FROM Venue WHERE name ilike $1`
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
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating, avg_energy, avg_mainstream, avg_exclusive, avg_price, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) 
	AS longitude FROM venue LIMIT 20`
	rows, err := db.conn.Query(ctx, query)
	if err != nil {
		return []models.Venue{}, err
	}
	defer rows.Close()
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
}

func (db *DB) GetAllVenuesWithFilter(ctx context.Context, where string, sort string) ([]models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating, avg_energy, avg_mainstream, avg_exclusive, avg_price, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) 
	AS longitude FROM venue ` + where  + ` ` + sort + ` LIMIT 20`
	fmt.Println(query)

	rows, err := db.conn.Query(ctx, query)
	if err != nil {
		fmt.Println("WHAT DA WHAA " + err.Error())
		return []models.Venue{}, err
	}
	defer rows.Close()
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
}




