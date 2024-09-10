package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/GenerateNU/nightlife/internal/app/nightlife/pkg/schema/hello/routes"
)


func InitializeRoutes(app *fiber.App){

	// Add each route group here
	hello.RouteHelloGroup(app)
}