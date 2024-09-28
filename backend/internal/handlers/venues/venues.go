package venues

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) DeleteVenue(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")

	venueId := c.Params("venueId")
	if venueId == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	venueIdFormatted, err := uuid.Parse(venueId)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Delete failed due to malformed venue ID")
	}

	venueDelete := s.store.DeleteVenue(c.Context(), venueIdFormatted)

	if err != nil {
		fmt.Println("Error is on service line 26" + err.Error())
		c.Status(http.StatusInternalServerError)
		return err
	}
	if venueDelete != nil {
		c.Status(http.StatusInternalServerError)
		return fiber.NewError(500, "Delete failed")
	}

	return c.Status(http.StatusOK).JSON("deleted venue")

}
