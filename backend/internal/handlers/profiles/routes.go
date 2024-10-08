package profiles

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/profiles")

	// Register Middleware
	protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/:username", service.GetProfile)
	protected.Patch("/preferences", service.UpdateProfilePreferences)
	protected.Delete("/:userId", service.DeleteUser)
	protected.Delete("/friends/:username", service.RemoveFriend)
}
