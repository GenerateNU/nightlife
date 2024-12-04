package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

// Gets VenueRatings query result from DB
func (db *DB) GetAllVenueRatings(ctx context.Context, venueID uuid.UUID) ([]models.VenueRatings, error) {

	var query = `
SELECT 
	r.user_id,
    v.venue_id AS venue_id, 
    v.name AS venue_name, 
    r.overall_rating, 
    r.energy_rating,
    r.crowd_rating, 
    r.mainstream_rating,
	r.price_rating,
	r.hype_rating,
	r.exclusive_rating,
	r.review_text,
	r.image_path,
	r.created_at
FROM 
    review r
JOIN 
    venue v ON r.venue_id = v.venue_id
WHERE 
    v.venue_id = $1;
`

	rows, err := db.conn.Query(ctx, query, venueID.String())

	if err != nil {
		return []models.VenueRatings{}, err
	}

	return pgx.CollectRows(rows, pgx.RowToStructByName[models.VenueRatings])

}
