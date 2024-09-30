package auth

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, params types.Params) {

	service := newService(params.Store)

	unprotected := app.Group("/auth")

	unprotected.Post("/login", service.Login)
}
