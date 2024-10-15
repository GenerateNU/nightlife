package venues

import (
	"net/http"
	"strconv"

	"github.com/GenerateNU/nightlife/internal/errs"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) DeleteVenue(c *fiber.Ctx) error {
	venueIDFormatted, err := uuid.Parse(c.Params("venueId"))

	errs.ErrorHandler(c, err)

	err = s.store.DeleteVenue(c.Context(), venueIDFormatted)

	errs.ErrorHandler(c, err)
	

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
    
	errs.ErrorHandler(c, err)

    // Call the store's DeleteReviewForVenue function with reviewId
    err = s.store.DeleteReviewForVenue(c.Context(), reviewIDFormatted)
    
	errs.ErrorHandler(c, err)

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Deleted review for venue"})
}

