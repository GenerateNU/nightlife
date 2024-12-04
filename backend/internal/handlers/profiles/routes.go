package profiles

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/profiles")

	// Register Middleware
	// protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/", service.GetAllUsers)
	protected.Get("/:userIdentifier", service.GetProfile)
	protected.Post("/preferences", service.CreatePreferences)
	protected.Patch("/preferences", service.UpdateProfilePreferences)
	protected.Patch("/update/:userId", service.UpdateProfile)
	protected.Delete("/:userId", service.DeleteUser)
	protected.Delete("/friends/:username", service.RemoveFriend)
	protected.Get("/reviews/:userId", service.GetUserAuthoredReviews)
	protected.Get("/reviewed-venues/:userId", service.GetUserReviewsWithVenueData)
	protected.Get("/saved-venues/:userId", service.GetUserSavedVenues)
	protected.Get("/visited-venues/:userId", service.GetUserVisitedVenues)

}
