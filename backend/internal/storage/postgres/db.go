package postgres

import (
	"context"
	"fmt"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/jackc/pgx/v5"
)

type DB struct {
	conn *pgx.Conn
}

// Make singleton -> TODO.

// ConnectSupabaseDB establishes a connection and returns it for querying.
func New(ctx context.Context, config config.Database) (*DB, error) {
	conn, err := pgx.Connect(ctx, config.URL)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println("Successfully connected to the database!")
	return &DB{conn: conn}, nil
}
