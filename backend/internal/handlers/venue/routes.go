package venue

//NOTE: This is an example usage for auth demonstration purposes. In real configurations (beyond login) all route groups should be protected

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

	//Unprotected Routes
	//unprotected := app.Group("/venue")

	//Endpoints
	protected.Patch("/:venueId/reviews/:reviewId", service.PatchVenueReview)
}
