package event

import (
	"net/http"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetEventForVenue(c *fiber.Ctx) error {

	venueID := c.Params("venue_id")

	if venueID == "" {
		c.Status(http.StatusBadRequest)
		return errs.APIError{StatusCode: fiber.StatusBadRequest, Message: "username is required"}
	}

	VenueIDFormatted, err := uuid.Parse(venueID)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return errs.APIError{StatusCode: fiber.StatusNotFound, Message: "profile not found"}
	}

	VenueEvents, err := s.store.GetEventForVenue(c.Context(), VenueIDFormatted)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return err
	}

	return c.Status(http.StatusOK).JSON(VenueEvents)
}
