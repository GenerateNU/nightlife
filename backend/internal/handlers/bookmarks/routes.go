package bookmarks

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func Routes(app *fiber.App, params types.Params) {
	service := newService(params.Store)

	// Create Protected Grouping
	protected := app.Group("/bookmarks")

	// Register Middleware
	// protected.Use(auth.Protected(&params.Supabase))

	//Endpoints
	protected.Get("/:userId", service.GetBookmarkFromID)
	protected.Post("/:venueId/:userId", service.CreateBookmark)

}
