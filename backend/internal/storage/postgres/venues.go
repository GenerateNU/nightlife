package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/jackc/pgx/v5"
)

func (db *DB) GetAllVenues(ctx context.Context) ([]models.Test, error) {
	rows, err := db.conn.Query(ctx, "SELECT * FROM Venues")
	if err != nil {
		return []models.Test{}, err
	}
	return pgx.CollectRows(rows, pgx.RowToStructByName[models.Test])
}
