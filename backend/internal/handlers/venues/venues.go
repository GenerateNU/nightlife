package venues

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) DeleteVenue(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")

	venueID := c.Params("venueId")
	if venueID == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	venueIDFormatted, err := uuid.Parse(venueID)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Delete failed due to malformed venue ID")
	}

	venueDelete := s.store.DeleteVenue(c.Context(), venueIDFormatted)

	if venueDelete != nil {
		c.Status(http.StatusInternalServerError)
		return fiber.NewError(500, "Delete failed")
	}

	return c.Status(http.StatusOK).JSON("deleted venue")

}

/*
Deletes a review for a venue.
*/
func (s *Service) DeleteReviewForVenue(c *fiber.Ctx) error {

	reviewID := c.Params("reviewId")
	if reviewID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Review ID is required")
	}

	parsedID, err := strconv.ParseInt(reviewID, 10, 8)
	reviewIDFormatted := int8(parsedID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Delete failed due to malformed review ID.")
	}

	// Call the store's DeleteReviewForVenue function with reviewId
	err = s.store.DeleteReviewForVenue(c.Context(), reviewIDFormatted)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Delete failed")
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Deleted review for venue"})
}

func (s *Service) GetVenueFromId(c *fiber.Ctx) error {
	venueID := c.Params("venueId")
	if venueID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Venue ID is required")
	}
	formatted_id, err := uuid.Parse(venueID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Couldn't parse venue id to uuid")
	}
	venue, err := s.store.GetVenueFromId(c.Context(), formatted_id)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}
	return c.Status(fiber.StatusOK).JSON(venue)
}

func (s *Service) GetVenueFromName(c *fiber.Ctx) error {
	name := c.Query("q")
	if name == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Venue name is required")
	}
	venue, err := s.store.GetVenueFromName(c.Context(), name)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}
	return c.Status(fiber.StatusOK).JSON(venue)
}
