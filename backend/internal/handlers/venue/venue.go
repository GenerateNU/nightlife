package venue

import (
	"log"
	"net/http"
	"github.com/GenerateNU/nightlife/internal/errs"

	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// PatchVenueReview handles the PATCH request to update a review
func (s *Service) PatchVenueReview(c *fiber.Ctx) error {
	// Retrieve and validate the venueID and reviewID from the URL parameters
	venueString := c.Params("venueId")

	venueID, err := uuid.Parse(venueString)
	errs.ErrorHandler(c,err)

	reviewID, err := c.ParamsInt("reviewId")
	errs.ErrorHandler(c,err)

	// Parse the request body
	var req types.ReviewUpdateRequest
	if err := c.BodyParser(&req); err != nil {
		// Log the error along with the partially parsed request, if available
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)

		// Return an error response to the client
		errs.ErrorHandler(c,err)
	}

	log.Printf("Updating review with OverallRating: %d, AmbianceRating: %d, MusicRating: %d, CrowdRating: %d, ServiceRating: %d, ReviewText: %s, VenueID: %v, ReviewID: %d",
		int8(req.OverallRating), int8(req.AmbianceRating), int8(req.MusicRating), int8(req.CrowdRating), int8(req.ServiceRating), req.ReviewText, venueID, int8(reviewID))
	// Call the store method to update the review
	err = s.store.PatchVenueReview(c.Context(), int8(req.OverallRating), int8(req.AmbianceRating), int8(req.MusicRating), int8(req.CrowdRating), int8(req.ServiceRating), req.ReviewText, venueID, int8(reviewID))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update review",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Review updated successfully",
	})
}
