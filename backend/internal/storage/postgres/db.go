package postgres

import (
	"context"
	"fmt"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DB struct {
	conn *pgxpool.Pool
}

// Make singleton -> TODO.

// Changed to use pool
func New(ctx context.Context, config config.Database) (*DB, error) {
	// Create a configuration for the connection pool
	poolConfig, err := pgxpool.ParseConfig(config.URL)
	if err != nil {
		fmt.Println("Unable to parse database URL:", err)
		return nil, err
	}

	// Establish a connection pool
	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		fmt.Println("Unable to create connection pool:", err)
		return nil, err
	}

	// Test the connection
	err = pool.Ping(ctx)
	if err != nil {
		fmt.Println("Unable to ping the database:", err)
		return nil, err
	}

	fmt.Println("Successfully connected to the database!")
	return &DB{conn: pool}, nil
}
