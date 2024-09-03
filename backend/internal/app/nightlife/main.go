package main

import (
	"app/nightlife/pkg/db"
	"app/nightlife/pkg/schema/hello"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

func main() {
	// test the database connection
	db.ConnectSupabaseDB()

	app := fiber.New()

	// add CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",                                      // Allows all origins
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Allows specific HTTP methods
		AllowHeaders: "Origin, Content-Type, Authorization",    // Allows specific headers
	}))

	// Hello Group
	hello.HelloGroupRouter(app)

	log.Fatal(app.Listen(":8080"))
}
