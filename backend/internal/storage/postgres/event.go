package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

func (db *DB) GetEventForVenue(ctx context.Context, venue_id uuid.UUID) ([]models.Event, error) {
	var events []models.Event

	var query = `SELECT * FROM "Event" WHERE venueid = $1`

	rows, err := db.conn.Query(ctx, query, venue_id)

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
		); err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}
