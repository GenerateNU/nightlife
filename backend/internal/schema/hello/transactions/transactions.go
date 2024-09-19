package hello

import (
	"github.com/gofiber/fiber/v2"
)

func RetHelloWorld(ctx *fiber.Ctx) error {
	return ctx.SendString("Hello, World!")
}
