package hello

//NOTE: This is an example usage for auth demonstration purposes. In real configurations (beyond login) all route groups should be protected

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/config"
	hello "github.com/GenerateNU/nightlife/internal/schema/hello/transactions"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

// Create HelloGroup fiber route group
func RouteHelloGroup(app *fiber.App, config *config.Config, db *pgx.Conn) {

	// Create Protected Grouping
	protected := app.Group("/hello_protected")

	// Register Middleware
	protected.Use(auth.Protected(config))

	//Unprotected Routes
	unprotected := app.Group("/hello")

	//Endpoints
	protected.Get("/world", func(c *fiber.Ctx) error {
		return hello.RetHelloWorld(c, db)
	})
	unprotected.Get("/world", func(c *fiber.Ctx) error {
		return hello.RetHelloWorld(c, db)
	})

}
