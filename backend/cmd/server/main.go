package main

import (
	"context"
	"log"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/GenerateNU/nightlife/internal/server"
	"github.com/GenerateNU/nightlife/internal/storage/postgres"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/joho/godotenv"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load("../../../.env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Unable to load environment variables necessary for application")
	}

	db, err := postgres.New(ctx, cfg.Database)
	if err != nil {
		log.Fatalf("Unable to load environment variables necessary for application")
	}

	app := server.New(types.Params{
		Supabase: cfg.Supabase,
		Store:    db,
	})

	go func() {
		if err := app.Listen(":8080"); err != nil {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit

	slog.Info("Shutting down server")
	if err := app.Shutdown(); err != nil {
		slog.Error("failed to shutdown server", "error", err)
	}

	slog.Info("Server shutdown")
}
