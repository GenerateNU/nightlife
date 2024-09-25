package profile

//NOTE: This is an example usage for auth demonstration purposes. In real configurations (beyond login) all route groups should be protected

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/config"
	profile "github.com/GenerateNU/nightlife/internal/schema/profile/transactions"
	"github.com/gofiber/fiber/v2"
)

// Create ProfileGroup fiber route group
// No unprotected routes -> all go through user auth
func RouteProfileGroup(app *fiber.App, config *config.Config) {

	// Create Protected Grouping -> allow user to *only* access
	// their personal info
	protected := app.Group("/profile_protected")

	// Register Middleware
	protected.Use(auth.Protected(config))

	//Endpoints
	protected.Get("/profile", hello.RetPreferences)

}
