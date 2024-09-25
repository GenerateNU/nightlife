package profile

import (
	"github.com/gofiber/fiber/v2"
)

// POST Endpoint -> allows users to add their preferences to the db
func (s *Service) RetPreferences(c *fiber.Ctx) error {

	tests, err := s.store.StorePreferences(c.Context())
	if err != nil {
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusOK).SendString("Preferences saved successfully")

}
