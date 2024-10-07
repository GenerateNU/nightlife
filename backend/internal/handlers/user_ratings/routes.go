package userratings

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, params types.Params) {

	//create a service
	service := newService(params.Store)

	//create a grouping
	protected := app.Group("/userratings").Use(auth.Protected(&params.Supabase))

	//create a route
	protected.Get("/user/:user_id", service.GetAllUserRatings)

}
