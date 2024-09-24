package router

import (
	"github.com/GenerateNU/nightlife/internal/config"
	auth "github.com/GenerateNU/nightlife/internal/schema/auth/routes"
	hello "github.com/GenerateNU/nightlife/internal/schema/hello/routes"
	"github.com/gofiber/fiber/v2"
)

func InitializeRoutes(app *fiber.App, cfg *config.Config) {

	// Add each route group here
	hello.RouteHelloGroup(app, cfg)
	auth.RouteAuthGroup(app, cfg)

}
