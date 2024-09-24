package auth

import (
	"github.com/GenerateNU/nightlife/internal/config"
	auth "github.com/GenerateNU/nightlife/internal/schema/auth/transactions"
	"github.com/gofiber/fiber/v2"
)

func RouteAuthGroup(app *fiber.App, config *config.Config) {

	// Login route must be unprotected, logically speaking
	unprotected := app.Group("/auth")

	unprotected.Post("/login", auth.RetLogin)
}
