package postgres

import (
	"context"
	"fmt"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (db *DB) GetBookmarkFromID(ctx context.Context, id uuid.UUID) (models.Bookmarks, error) {
	fmt.Println("GOT TO STORAGE", id.String())
	var query = `SELECT * FROM bookmarks WHERE bookmarks.user_id = $1`
	rows, err := db.conn.Query(ctx, query, id.String())
	if err != nil {
		return models.Bookmarks{}, err
	}
	defer rows.Close()
	arr, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Bookmarks])
	return arr[0], err
}

func (db *DB) CreateBookmark(ctx context.Context, p models.Bookmarks) error {
	query := `INSERT INTO bookmarks (venue_id, user_id) 
				VALUES ($1, $2)`

	_, err := db.conn.Query(ctx, query, p.VenueID, p.UserID)
	return err
}
