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

func (db *DB) GetAllVenues(ctx context.Context) ([]models.Test, error) {
	rows, err := db.conn.Query(ctx, "SELECT * FROM Venues")
	if err != nil {
		return []models.Test{}, err
	}
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Test])
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