package db

import (
	"context"
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/jackc/pgx/v4"
)

// ConnectSupabaseDB establishes a connection and returns it for querying.
func ConnectSupabaseDB() (*pgx.Conn, error) {
	// Load configuration
	cfg, err := config.LoadConfig("../../../.env")
	if err != nil {
		log.Fatalf("Could not load config: %v", err)
		return nil, err
	}

	// Attempt to connect
	conn, err := pgx.Connect(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
		return nil, err
	}

	fmt.Println("Successfully connected to the database!")
	return conn, nil
}
