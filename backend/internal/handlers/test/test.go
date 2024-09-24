package test

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func (s *Service) GetAllTests(c *fiber.Ctx) error {
	tests, err := s.store.GetAllTests(c.Context())
	if err != nil {
		return err
	}
	return c.Status(http.StatusOK).JSON(tests)
}
