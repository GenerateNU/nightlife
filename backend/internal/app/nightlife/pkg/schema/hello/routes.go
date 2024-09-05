package hello

import (
	"github.com/gofiber/fiber/v2"
)

// Create HelloGroup fiber route group
func RouteHelloGroup(app *fiber.App) {

	//Create Grouping
	router := app.Group("/hello")

	//Endpoints
	router.Get("/world", getHelloWorld)

}

func getHelloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello World")
}
