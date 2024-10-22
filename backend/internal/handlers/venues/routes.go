package venues

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/venues")

	// Register Middleware
	protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/getAll", service.GetAllVenues)
	protected.Delete("/:venueId", service.DeleteVenue)

	protected.Delete("/reviews/:reviewId", service.DeleteReviewForVenue)

	protected.Get("/:venueId", service.GetVenueFromID)
	protected.Get("/search", service.GetVenueFromName)
}
