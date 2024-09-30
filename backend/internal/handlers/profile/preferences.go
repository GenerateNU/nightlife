package profile

import (
	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
)

// POST Endpoint -> allows users to add their preferences to the db
func (s *Service) CreatePreferences(c *fiber.Ctx) error {
	var p models.Preferences
	if err := c.BodyParser(&p); err != nil {
		return errs.BadRequest(err)
	}

	if verrs := p.Validate(); verrs != nil {
		return errs.InvalidRequestData(verrs)
	}

	if err := s.store.CreatePreferences(c.Context(), p); err != nil {
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(p)

}
