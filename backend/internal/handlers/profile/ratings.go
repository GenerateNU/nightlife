package profile

import (
	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
)

// POST Endpoint -> allows users to add their preferences to the db
func (s *Service) CreateRatings(c *fiber.Ctx) error {
	var r models.UserRating
	if err := c.BodyParser(&r); err != nil {
		return errs.BadRequest(err)
	}

	if verrs := r.Validate(); verrs != nil {
		return errs.InvalidRequestData(verrs)
	}

	if err := s.store.CreateRatings(c.Context(), r); err != nil {
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(r)

}
