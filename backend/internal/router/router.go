package router

import (
	hello "github.com/GenerateNU/nightlife/internal/schema/hello/routes"
	"github.com/gofiber/fiber/v2"
)


func InitializeRoutes(app *fiber.App){

	// Add each route group here
	hello.RouteHelloGroup(app)
}