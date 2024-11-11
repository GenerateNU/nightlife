package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

func (db *DB) GetEventForVenue(ctx context.Context, venueID uuid.UUID) ([]models.Event, error) {
	var events []models.Event

	var query = `SELECT * FROM event WHERE venue_id = $1`

	rows, err := db.conn.Query(ctx, query, venueID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var event models.Event
		if err := rows.Scan(
			&event.EventID,
			&event.Name,
			&event.Date,
			&event.Time,
			&event.ImagePath,
			&event.VenueID,
			&event.CreatedAt,
		); err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}
