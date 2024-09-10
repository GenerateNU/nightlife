package main

import (
	"log"

	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/db"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/middleware"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/router"
	"github.com/gofiber/fiber/v2"
)

func main() {
	// test the database connection
	db.ConnectSupabaseDB()

	//Create App
	app := fiber.New()

	//Initialize Middleware
	middleware.UseMiddleware(app)

	// Hello Group
	router.InitializeRoutes(app)

	//Run app
	log.Fatal(app.Listen(":8080"))
}
