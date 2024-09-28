package postgres

import (
	"context"

	"github.com/google/uuid"
)


func (db* DB) DeleteVenue(ctx context.Context, id uuid.UUID) error {
	_, err := db.conn.Exec(ctx, `DELETE FROM "Venue" v WHERE venue_id = $1`, id)
	if err != nil {
		return err
	}
	return nil
}