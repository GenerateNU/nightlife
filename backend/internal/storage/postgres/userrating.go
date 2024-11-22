package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

// Gets UserRating query result from DB
func (db *DB) GetAllUserRatings(ctx context.Context, userID uuid.UUID) ([]models.UserRating, error) {
	var query = `
SELECT
	u.user_id AS user_id,
	u.username,
	v.venue_id AS venue_id,
	v.name AS venue_name,
	r.overall_rating
FROM
	review r
JOIN
	users u ON r.user_id = u.user_id
JOIN
	venue v ON r.venue_id = v.venue_id
WHERE
	u.user_id = $1;
`

	rows, err := db.conn.Query(ctx, query, userID.String())

	if err != nil {
		return []models.UserRating{}, err
	}

	return pgx.CollectRows(rows, pgx.RowToStructByName[models.UserRating])
}

func (db *DB) CreateReview(ctx context.Context, p models.Review) error {
	query := `INSERT INTO review (overall_rating, energy_rating, mainstream_rating, price_rating, crowd_rating, hype_rating, 
					exclusive_rating, review_text, venue_id, user_id) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

	_, err := db.conn.Query(ctx, query, p.OverallRating, p.EnergyRating,
		p.MainstreamRating, p.PriceRating, p.CrowdRating,
		p.HypeRating, p.ExclusiveRating, p.ReviewText, p.VenueID, p.UserID)
	return err
}
