package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Config struct {
	SupabaseURL string
	SupabaseKey string
	DatabaseURL string
	JWTToken string
}

// loads configuration from the specified .env file path
func LoadConfig(envPath string) (*Config, error) {
	// if no custom env path, use the default relative path to root directory
	if envPath == "" {
		var err error
		envPath, err = filepath.Abs("../.env")
		if err != nil {
			return nil, fmt.Errorf("failed to get the root directory: %v", err)
		}
	}

	// load .env from the specified directory
	err := godotenv.Load(envPath)
	if err != nil {
		log.Fatalf("Error loading .env file from %s", envPath)
		return nil, err
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	if supabaseURL == "" {
		log.Fatalf("SUPABASE_URL is not set in .env")
		return nil, fmt.Errorf("SUPABASE_URL is not set in .env")
	}

	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")
	if supabaseKey == "" {
		log.Fatalf("SUPABASE_ANON_KEY is not set in .env")
		return nil, fmt.Errorf("SUPABASE_ANON_KEY is not set in .env")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatalf("DATABASE_URL is not set in .env")
		return nil, fmt.Errorf("DATABASE_URL is not set in .env")
	}

	jwtToken := os.Getenv("SUPABASE_JWT_TOKEN")
	if databaseURL == "" {
		log.Fatalf("JWT Token is not set in .env")
		return nil, fmt.Errorf("JWT Token is not set in .env")
	}

	config := &Config{
		SupabaseURL: supabaseURL,
		SupabaseKey: supabaseKey,
		DatabaseURL: databaseURL,
		JWTToken: jwtToken,
	}

	return config, nil
}
