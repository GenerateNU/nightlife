package venueratings

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetAllVenueRatings(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")
	venueID := c.Params("venueid")
	if venueID == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	VenueIDFormatted, err := uuid.Parse(venueID)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Malformed Venue ID")
	}

	VenueRatings, err := s.store.GetAllVenueRatings(c.Context(), VenueIDFormatted)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return err
	}

	return c.Status(http.StatusOK).JSON(VenueRatings)

}
