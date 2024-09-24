package hello

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
	protected := app.Group("/hello_protected")

	// Register Middleware
	protected.Use(auth.Protected(&params.Supabase))

	//Unprotected Routes
	unprotected := app.Group("/hello")

	//Endpoints
	protected.Get("/world", service.HelloWorld)
	unprotected.Get("/world", service.HelloWorld)
}
