package router

import (
	"github.com/GenerateNU/nightlife/internal/config"
	hello "github.com/GenerateNU/nightlife/internal/schema/hello/routes"
	"github.com/gofiber/fiber/v2"
)

func InitializeRoutes(app *fiber.App, cfg *config.Config) {

	// Add each route group here
	hello.RouteHelloGroup(app, cfg)

}
