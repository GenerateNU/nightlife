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

	config := &Config{
		SupabaseURL: os.Getenv("SUPABASE_URL"),
		SupabaseKey: os.Getenv("SUPABASE_ANON_KEY"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}

	return config, nil
}
