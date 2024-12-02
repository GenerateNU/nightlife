package venues

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/types"

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

// PatchVenueReview handles the PATCH request to update a review
func (s *Service) PatchVenueReview(c *fiber.Ctx) error {
	// Retrieve and validate the venueID and reviewID from the URL parameters
	venueString := c.Params("venueId")

	venueID, err := uuid.Parse(venueString)
	if err != nil {
		if handlerErr := errs.ErrorHandler(c, err); handlerErr != nil {
			return handlerErr
		}
	}

	reviewID, err := c.ParamsInt("reviewId")
	if err != nil {
		if handlerErr := errs.ErrorHandler(c, err); handlerErr != nil {
			return handlerErr
		}
	}

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
		if handlerErr := errs.ErrorHandler(c, err); handlerErr != nil {
			return handlerErr
		}
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Review updated successfully",
	})
}

func (s *Service) GetVenueFromID(c *fiber.Ctx) error {
	venueID := c.Params("venueId")
	if venueID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Venue ID is required")
	}
	formattedID, err := uuid.Parse(venueID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Couldn't parse venue id to uuid")
	}
	venue, err := s.store.GetVenueFromID(c.Context(), formattedID)
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

func (s *Service) GetAllVenues(c *fiber.Ctx) error {
	venues, err := s.store.GetAllVenues(c.Context())
	if err != nil {
		fmt.Println(err.Error())
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}
	return c.Status(fiber.StatusOK).JSON(venues)
}

func (s *Service) GetVenuesByIDs(c *fiber.Ctx) error {
	// Get the "ids" query parameter
	ids := c.Query("ids")
	if ids == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Missing venue IDs",
		})
	}

	// Split the IDs into a slice
	idStrings := strings.Split(ids, ",")
	var venueIDs []uuid.UUID
	for _, idStr := range idStrings {
		parsedID, err := uuid.Parse(strings.TrimSpace(idStr))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": fmt.Sprintf("Invalid venue ID format: %s", idStr),
			})
		}
		venueIDs = append(venueIDs, parsedID)
	}

	// Fetch venues from the store
	venues, err := s.store.GetVenuesByIDs(c.Context(), venueIDs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch venue details",
		})
	}

	// Return the list of venues
	return c.Status(fiber.StatusOK).JSON(venues)
}

func (s *Service) GetVenuesByLocation(c *fiber.Ctx) error {
	// Parse latitude
	latitude := c.QueryFloat("latitude")
	if latitude == 0 {
		log.Printf("Invalid or missing latitude parameter: %v", latitude)
		return fiber.NewError(fiber.StatusBadRequest, "Invalid or missing latitude parameter")
	}

	// Parse longitude
	longitude := c.QueryFloat("longitude")
	if longitude == 0 {
		log.Printf("Invalid or missing longitude parameter: %v", longitude)
		return fiber.NewError(fiber.StatusBadRequest, "Invalid or missing longitude parameter")
	}

	// Parse radius with default value of 1000
	radius := c.QueryInt("radius", 1000)
	if radius <= 0 {
		log.Printf("Invalid radius parameter: %d", radius)
		return fiber.NewError(fiber.StatusBadRequest, "Invalid radius parameter")
	}

	// Fetch venues by location
	venues, err := s.store.GetVenuesByLocation(c.Context(), latitude, longitude, radius)
	if err != nil {
		log.Printf("Error fetching venues by location: %v | Latitude: %f | Longitude: %f | Radius: %d", err, latitude, longitude, radius)
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch venues by location")
	}

	// Return the list of venues as JSON
	return c.Status(fiber.StatusOK).JSON(venues)
}
