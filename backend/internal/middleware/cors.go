package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Cors() fiber.Handler {
	return cors.New(cors.Config{
		AllowOrigins: "*",                                      // Allows all origins
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Allows specific HTTP methods
		AllowHeaders: "Origin, Content-Type, Authorization",    // Allows specific headers
	})
}
