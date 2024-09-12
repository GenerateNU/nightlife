package db

import (
	"context"
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/config"

	"github.com/jackc/pgx/v4"
)


//TODO: Refactor to take config ptr
func ConnectSupabaseDB() error {
	// check config
	cfg, err := config.LoadConfig("../../../.env")
	if err != nil {
		log.Fatalf("Could not load config: %v", err)
	}

	// attempt connection
	conn, err := pgx.Connect(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	// close for now since we're not using it
	defer conn.Close(context.Background())

	fmt.Println("Successfully connected to the database!")
	return err
}
