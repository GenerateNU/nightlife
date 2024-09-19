package cors


import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func UseCors(app *fiber.App){

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",                                      // Allows all origins
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Allows specific HTTP methods
		AllowHeaders: "Origin, Content-Type, Authorization",    // Allows specific headers
	}))
}