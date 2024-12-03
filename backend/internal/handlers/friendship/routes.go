package friendship

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, params types.Params) {

	service := newService(params.Store)

	protected := app.Group("/friendships")

	protected.Post("/", service.CreateFriendship)
	protected.Get("/:userID", service.GetFriendshipsByUserID)

}
