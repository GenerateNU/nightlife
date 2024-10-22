package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

func (db *DB) GetEventForVenue(ctx context.Context, venue_id uuid.UUID) (models.Event, error) {
	var event models.Event

	var query = `
	SELECT event_id,
		   event_name,
		   event_date,
		   image_path,
		   venue_id
	FROM "Event"
	WHERE venue_id = $1
	`

	row := db.conn.QueryRow(ctx, query, venue_id)

	err := row.Scan(
		&event.EventID,
		&event.Name,
		&event.Date,
		&event.Time,
		&event.ImagePath,
		&event.VenueID,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return models.Event{}, fmt.Errorf("no profile found for username: %s", venue_id)
		}
		return models.Event{}, err
	}

	return event, nil
}
