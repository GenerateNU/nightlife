package main

import (
	//"context"
	"fmt"
	"log"
	"os"

	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/joho/godotenv"
)

func main() {
	if isLocal() {
		if err := godotenv.Load("../../../.env"); err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

	cfg, _ := config.LoadConfig()

	err := auth.CreateUser(cfg.Supabase.URL, cfg.Supabase.Key, "ckplume10@yahoo.com", "securepassword")

	if err != nil {
		fmt.Printf("Fuck")
	} else {
		fmt.Printf("Hell yea")
	}



}


func isLocal() bool {
	return os.Getenv("APP_ENVIRONMENT") != "production"
}
