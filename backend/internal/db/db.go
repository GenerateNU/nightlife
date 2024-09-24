package db

import (
	"context"
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/config"

	"github.com/jackc/pgx/v4"
)


type Venue struct {
    VenueID   int
    Name      string
    Address   string
    City      string
    State     string
    ZipCode   string
    Location  string // Will handle as text and convert as needed
    VenueType string
    CreatedAt string
    UpdatedAt string
}

// TODO: Refactor to take config ptr
func ConnectSupabaseDB() error {
	// check config
	cfg, err := config.LoadConfig("../../../.env")
	if err != nil {
		log.Fatalf("Could not load config: %v", err)
	}

	// attempt connection
	conn, err := pgx.Connect(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	// close for now since we're not using it
	defer conn.Close(context.Background())

	fmt.Println("Successfully connected to the database!")
	return err
}

// CreateVenue inserts a new venue into the database
func CreateVenue(ctx context.Context, db *sql.DB, v Venue) (int, error) {
    var venueID int
    query := `INSERT INTO venues (name, address, city, state, zip_code, location, venue_type, created_at, updated_at)
              VALUES ($1, $2, $3, $4, $5, ST_PointFromText($6, 4326), $7, CURRENT_TIMESTAMP, NULL) RETURNING venue_id`
    err := db.QueryRowContext(ctx, query, v.Name, v.Address, v.City, v.State, v.ZipCode, v.Location, v.VenueType).Scan(&venueID)
	if err != nil {
		return 0, err
	}
	return venueID, nil
}

func GetVenues(ctx context.Context, db *sql.DB) ([]Venue, error) {
    var venues []Venue
    rows, err := db.QueryContext(ctx, `SELECT venue_id, name, address, city, state, zip_code, ST_AsText(location), venue_type, created_at, updated_at FROM venues`)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    for rows.Next() {
        var v Venue
        if err := rows.Scan(&v.VenueID, &v.Name, &v.Address, &v.City, &v.State, &v.ZipCode, &v.Location, &v.VenueType, &v.CreatedAt, &v.UpdatedAt); err != nil {
            return nil, err
        }
        venues = append(venues, v)
    }
    return venues, nil
}

func UpdateVenue(ctx context.Context, db *sql.DB, v Venue) (string, error) {
	query := `
		UPDATE venues
		SET name = $1, address = $2, city = $3, state = $4, zip_code = $5, location = ST_PointFromText($6, 4326), venue_type = $7, updated_at = CURRENT_TIMESTAMP
		WHERE venue_id = $8
		RETURNING updated_at
	`
	var updatedAt string

	err := db.QueryRowContext(ctx, query, v.Name, v.Address, v.City, v.State, v.ZipCode, v.Location, v.VenueType, v.VenueID).Scan(&updatedAt)
	if err != nil {
		return "", fmt.Errorf("failed to update venue: %w", err)
	}

	// Return the updated timestamp
	return updatedAt, nil
}