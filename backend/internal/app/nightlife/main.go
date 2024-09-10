package main

import (
	"log"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/auth"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/config"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/db"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/middleware"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/router"
	"github.com/gofiber/fiber/v2"
)

func main() {

	//retrieve environment variables
	cfg, err := config.LoadConfig("../../../../.env")
	if err != nil {
		log.Fatalf("Unable to load environment variables necessary for application")
	}



	// test the database connection
	db.ConnectSupabaseDB()

	//Create App
	app := fiber.New()

	//Configure authentication service
	auth.ConfigureAuth(cfg)


	//Initialize Middleware
	middleware.UseMiddleware(app)

	// Hello Group
	router.InitializeRoutes(app)

	//Run app
	log.Fatal(app.Listen(":8080"))
}
