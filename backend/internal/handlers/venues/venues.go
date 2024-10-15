package venues

import (
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) DeleteVenue(c *fiber.Ctx) error {
	venueIDFormatted, err := uuid.Parse(c.Params("venueId"))

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Delete failed due to malformed venue ID")
	}

	err = s.store.DeleteVenue(c.Context(), venueIDFormatted)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return err
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

