package main

import (
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/GenerateNU/nightlife/internal/db"
	"github.com/GenerateNU/nightlife/internal/middleware"
	"github.com/GenerateNU/nightlife/internal/router"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {

	//retrieve environment variables
	cfg, err := config.LoadConfig("../../../.env")
	if err != nil {
		log.Fatalf("Unable to load environment variables necessary for application")
	}

	// test the database connection
	_, err = db.ConnectSupabaseDB()
	if err != nil {
		log.Fatalf("Unable to load environment variables necessary for application")
	}

	//Create App
	app := fiber.New()

	//Initialize Middleware
	middleware.UseMiddleware(app)

	// Hello Group
	router.InitializeRoutes(app, cfg)

	//Run app
	log.Fatal(app.Listen(":8080"))
}
