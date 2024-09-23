package hello

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

func RetHelloWorld(ctx *fiber.Ctx, db *pgx.Conn) error {
	return ctx.SendString("Hello, World!")
}
