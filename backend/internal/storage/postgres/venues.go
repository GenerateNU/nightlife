package postgres

import (
	"context"
	"fmt"

	"github.com/google/uuid"
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
func (db *DB) DeleteReviewForVenue(ctx context.Context, reviewId int8) error {
    result, err := db.conn.Exec(ctx, `DELETE FROM "Review" WHERE review_id = $1`, reviewId)
    if err != nil {
        return err
    }

    if result.RowsAffected() == 0 {
        return fmt.Errorf("delete failed: review does not exist")
    }

    return nil
}

