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
	protected.Get("/userCharacter/:userId", service.GetUserCharacter) 
	protected.Get("/:userIdentifier", service.GetProfile)
	protected.Get("/onboarding/:userIdentifier", service.OnboardingGetProfile)




	protected.Post("/preferences", service.CreatePreferences) 
	protected.Post("/addUser", service.AddUser)
	protected.Post("/userCharacter", service.UserCharacter) 


	protected.Patch("/preferences", service.UpdateProfilePreferences) 

	protected.Delete("/friends/:username", service.RemoveFriend) 
	protected.Delete("/:userId", service.DeleteUser) 
}
