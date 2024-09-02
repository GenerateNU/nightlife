package config

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Config struct {
	SupabaseURL string
	SupabaseKey string
	DatabaseURL string
}

func LoadConfig() (*Config, error) {
	// get the relative path to the nightlife root dir from repo root
	rootDir, err := filepath.Abs("../../")
	if err != nil {
		log.Fatalf("Failed to get the root directory: %v", err)
		return nil, err
	}

	// load .env from the root directory
	envPath := filepath.Join(rootDir, ".env")
	err = godotenv.Load(envPath)
	if err != nil {
		log.Fatalf("Error loading .env file from %s", envPath)
		return nil, err
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	if supabaseURL == "" {
		log.Fatalf("SUPABASE_URL is not set in .env")
		return nil, err
	}

	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")
	if supabaseKey == "" {
		log.Fatalf("SUPABASE_ANON_KEY is not set in .env")
		return nil, err
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatalf("DATABASE_URL is not set in .env")
		return nil, err
	}

	config := &Config{
		SupabaseURL: supabaseURL,
		SupabaseKey: supabaseKey,
		DatabaseURL: databaseURL,
	}

	return config, nil
}
