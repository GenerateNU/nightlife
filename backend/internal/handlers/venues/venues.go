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

    reviewId := c.Params("reviewId")
    if reviewId == "" {
        return fiber.NewError(fiber.StatusBadRequest, "Review ID is required")
    }

    parsedId, err := strconv.ParseInt(reviewId, 10, 8)
	reviewIdFormatted := int8(parsedId)
    if err != nil {
        return fiber.NewError(fiber.StatusBadRequest, "Delete failed due to malformed review ID.")
    }

    // Call the store's DeleteReviewForVenue function with reviewId
    err = s.store.DeleteReviewForVenue(c.Context(), reviewIdFormatted)
    if err != nil {
        return fiber.NewError(fiber.StatusInternalServerError, "Delete failed")
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Deleted review for venue"})
}

