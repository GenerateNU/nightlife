package venue

import (
	"log"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetVenueReviews(c *fiber.Ctx) error {
	// Retrieve and validate the venueID from the URL parameters
	venueString := c.Params("venueId")

	venueID, err := uuid.Parse(venueString)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid venue ID in code",
		})
	}

	reviewID, err := c.ParamsInt("reviewId")
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid review ID in code",
		})
	}

	// Call the store method to get the reviews
	reviews, err := s.store.GetVenueReviews(c.Context(), int8(reviewID),venueID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get reviews",
		})
	}

	return c.Status(http.StatusOK).JSON(reviews)
}

// PatchVenueReview handles the PATCH request to update a review
func (s *Service) PatchVenueReview(c *fiber.Ctx) error {
	// Retrieve and validate the venueID and reviewID from the URL parameters
	venueString := c.Params("venueId")


	venueID, err := uuid.Parse(venueString)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid venue ID",
		})
	}

	reviewID, err := c.ParamsInt("reviewId")
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid review ID",
		})
	}

	// Parse the request body
	var req types.ReviewUpdateRequest
    if err := c.BodyParser(&req); err != nil {
        // Log the error along with the partially parsed request, if available
        log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
        
        // Return an error response to the client
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Cannot parse JSON",
        })
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