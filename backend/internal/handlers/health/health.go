package health

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
)

func (s *Service) GetHealth(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(fiber.Map{"status": "ok"})
}
