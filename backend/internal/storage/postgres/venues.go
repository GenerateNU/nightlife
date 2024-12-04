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
			&review.EnergyRating,
			&review.MainstreamRating,
			&review.PriceRating,
			&review.CrowdRating,
			&review.HypeRating,
			&review.ExclusiveRating,
			&review.ReviewText,
			&review.CreatedAt,
			&review.UpdatedAt,
			&review.UserID,
		); err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	return reviews, nil
}

func (db *DB) GetVenueFromID(ctx context.Context, id uuid.UUID) (models.Venue, error) {
	var query = `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating,
	avg_energy, avg_mainstream, avg_exclusive, avg_price, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours,
	saturday_hours, sunday_hours, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) AS longitude FROM Venue WHERE venue_id = $1`
	fmt.Println(id.String())
	rows, err := db.conn.Query(ctx, query, id.String())
	if err != nil {
		return models.Venue{}, err
	}
	defer rows.Close()
	arr, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
	return arr[0], err
}

func (db *DB) GetVenueFromName(ctx context.Context, name string) (models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating,
	avg_energy, avg_mainstream, avg_exclusive, avg_price, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours,
	saturday_hours, sunday_hours, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) AS longitude FROM Venue WHERE name ilike $1`
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
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating,
	avg_energy, avg_mainstream, avg_exclusive, avg_price, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours,
	saturday_hours, sunday_hours, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) AS longitude FROM venue`
	rows, err := db.conn.Query(ctx, query)
	if err != nil {
		fmt.Print("hello")
		return []models.Venue{}, err
	}
	defer rows.Close()
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
}

func (db *DB) PatchVenueReview(ctx context.Context, overallRating int8, energyRating int8, mainstreamRating int8, priceRating int8, crowdRating int8, hypeRating int8, exclusiveRating int8, reviewText string, venueID uuid.UUID, reviewID int8) error {
	// Log the incoming parameters for debugging and monitoring
	log.Printf("Attempting to update review with ReviewID: %d, VenueID: %s, Ratings: [Overall: %d, EnergyRating: %d, MainstreamRating: %d, PriceRating: %d, CrowdRating: %d, HypeRating: %d, ExclusiveRating: %d], Review Text: %s",
		reviewID, venueID, overallRating, energyRating, mainstreamRating, priceRating, crowdRating, hypeRating, exclusiveRating, reviewText)

	// SQL query execution
	_, err := db.conn.Exec(ctx, `
        UPDATE "Review" r
        SET
            overall_rating = $1,
            energy_rating = $2,
            mainstream_rating = $3,
            price_rating = $4,
            crowd_rating = $5,
			hype_rating = $6,
			exclusive_rating = $7,
            review_text = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE review_id = $9 AND venue_id = $10;
    `, overallRating, energyRating, mainstreamRating, priceRating, crowdRating, hypeRating, exclusiveRating, reviewText, reviewID, venueID)

	if err != nil {
		// Log the error with detailed context
		log.Printf("Failed to update review with ReviewID: %d, VenueID: %s, Error: %v", reviewID, venueID, err)
		return err
	}

	// Log a successful update
	log.Printf("Successfully updated review with ReviewID: %d, VenueID: %s", reviewID, venueID)
	return nil
}

func (db *DB) GetVenuesByIDs(ctx context.Context, venueIDs []uuid.UUID) ([]models.Venue, error) {
	query := `
		SELECT 
			venue_id, 
			name, 
			ST_Y(location::geometry) AS latitude, 
			ST_X(location::geometry) AS longitude, 
			created_at
		FROM venue
		WHERE venue_id = ANY($1);
	`
	rows, err := db.conn.Query(ctx, query, venueIDs)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	venues := []models.Venue{}
	for rows.Next() {
		var venue models.Venue
		if err := rows.Scan(
			&venue.VenueID,
			&venue.Name,
			&venue.Latitude,
			&venue.Longitude,
			&venue.CreatedAt,
		); err != nil {
			return nil, err
		}
		venues = append(venues, venue)
	}

	return venues, rows.Err()
}

func (db *DB) GetVenuesByLocation(ctx context.Context, latitude float64, longitude float64, radiusInMeters int) ([]models.VenueWithHours, error) {
	query := `
		SELECT 
			venue_id, 
			name, 
			address, 
			city, 
			state, 
			zip_code, 
			ST_Y(location::geometry) AS latitude, 
			ST_X(location::geometry) AS longitude, 
			venue_type, 
			total_rating, 
			price, 
			avg_mainstream, 
			avg_price, 
			avg_exclusive, 
			avg_energy, 
			monday_hours, 
			tuesday_hours, 
			wednesday_hours, 
			thursday_hours, 
			friday_hours, 
			saturday_hours, 
			sunday_hours, 
			created_at, 
			COALESCE(updated_at, '9999-12-31 23:59:59') AS updated_at 
		FROM venue
		WHERE ST_DWithin(
			location::geography, 
			ST_MakePoint($1, $2)::geography, 
			$3
		);
	`

	rows, err := db.conn.Query(ctx, query, longitude, latitude, radiusInMeters)
	if err != nil {
		log.Printf("Database query failed: %v | Query: %s | Params: longitude=%f, latitude=%f, radius=%d", err, query, longitude, latitude, radiusInMeters)
		return nil, fmt.Errorf("database query error: %w", err)
	}
	defer rows.Close() // No need to handle rows.Close()'s return, just defer the call

	venues := []models.VenueWithHours{}
	for rows.Next() {
		var venue models.VenueWithHours
		if err := rows.Scan(
			&venue.VenueID,
			&venue.Name,
			&venue.Address,
			&venue.City,
			&venue.State,
			&venue.ZipCode,
			&venue.Latitude,
			&venue.Longitude,
			&venue.VenueType,
			&venue.TotalRating,
			&venue.Price,
			&venue.AvgMainstream,
			&venue.AvgPrice,
			&venue.AvgExclusive,
			&venue.AvgEnergy,
			&venue.MondayHours,
			&venue.TuesdayHours,
			&venue.WednesdayHours,
			&venue.ThursdayHours,
			&venue.FridayHours,
			&venue.SaturdayHours,
			&venue.SundayHours,
			&venue.CreatedAt,
			&venue.UpdatedAt,
		); err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil, fmt.Errorf("row scan error: %w", err)
		}
		venues = append(venues, venue)
	}

	// Check for errors in row iteration
	if err := rows.Err(); err != nil {
		log.Printf("Row iteration error: %v", err)
		return nil, fmt.Errorf("row iteration error: %w", err)
	}

	return venues, nil
}

func (db *DB) GetAllVenuesWithFilter(ctx context.Context, where string, sort string) ([]models.Venue, error) {
	query := `SELECT venue_id, name, address, city, state, zip_code, created_at, venue_type, updated_at, price, total_rating,
	avg_energy, avg_mainstream, avg_exclusive, avg_price, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours,
	saturday_hours, sunday_hours, ST_Y(location::geometry) AS latitude, ST_X(location::geometry) AS longitude FROM venue ` + where + ` ` + sort + ` LIMIT 20`
	fmt.Println(query)

	rows, err := db.conn.Query(ctx, query)
	if err != nil {
		fmt.Println("WHAT DA WHAA " + err.Error())
		return []models.Venue{}, err
	}
	defer rows.Close()
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Venue])
}
