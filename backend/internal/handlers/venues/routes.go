package venues

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/venues")

	// Register Middleware
	//protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/", service.GetAllVenuesWithFilter)
	protected.Get("/batch", service.GetVenuesByIDs)
	protected.Get("/persona/:venueId", service.GetVenuePersona)

	protected.Get("/search", service.GetVenueFromName)
	protected.Get("/:venueId", service.GetVenueFromID)
	protected.Delete("/:venueId", service.DeleteVenue)

	protected.Delete("/reviews/:reviewId", service.DeleteReviewForVenue)
	protected.Patch("/:venueId/reviews/:reviewId", service.PatchVenueReview)

}
