package profile


import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create Profile fiber route group (no unprotected routes)
func Routes(app *fiber.App, params types.Params, db *pgx.Conn) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/profile_protected")

	// Register Middleware
	protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/preferences", profile.RetPreferences)
}
