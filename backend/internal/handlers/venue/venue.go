package venue

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func (s *Service) GetAllVenues(c *fiber.Ctx) error {
	tests, err := s.store.GetAllVenues(c.Context())
	if err != nil {
		return err
	}
	return c.Status(http.StatusOK).JSON(tests)
}
