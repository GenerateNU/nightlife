package router

import (
	"github.com/GenerateNU/nightlife/internal/config"
	hello "github.com/GenerateNU/nightlife/internal/schema/hello/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

func InitializeRoutes(app *fiber.App, cfg *config.Config, conn *pgx.Conn) {
	// Add each route group here
	hello.RouteHelloGroup(app, cfg, conn)
}
