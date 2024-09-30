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
	venueIdFormatted, err := uuid.Parse(venueID)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Delete failed due to malformed venue ID")
	}

	venueDelete := s.store.DeleteVenue(c.Context(), venueIdFormatted)

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

