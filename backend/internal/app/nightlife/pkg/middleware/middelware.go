package middleware

import (
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/middleware/cors"
	"github.com/gofiber/fiber/v2"
)

func UseMiddleware(app *fiber.App) {

	// Add each middleware layer here
	cors.UseCors(app)

}