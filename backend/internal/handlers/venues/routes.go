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
	protected.Get("/", service.GetAllVenues)
	protected.Get("/sort/persona/:persona", service.GetVenuesByPersona)
	protected.Get("/sort/distance/:longitude/:latitude", service.GetVenuesByDistance)
	protected.Get("sort/price", service.GetVenuesByPrice)
	protected.Get("sort/rating", service.GetVenuesByRating)
	protected.Get("/batch", service.GetVenuesByIDs)
	protected.Get("/persona/:venueId", service.GetVenuePersona)

	protected.Get("/search", service.GetVenueFromName)
	protected.Get("/:venueId", service.GetVenueFromID)
	protected.Delete("/:venueId", service.DeleteVenue)

	protected.Delete("/reviews/:reviewId", service.DeleteReviewForVenue)
	protected.Patch("/:venueId/reviews/:reviewId", service.PatchVenueReview)

}
