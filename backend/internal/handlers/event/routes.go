package event

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create Event fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/event")

	// Register Middleware
	//protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/:venue_id", service.GetEventForVenue)
}
