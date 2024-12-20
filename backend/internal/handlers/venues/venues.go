package venues

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"sort"
	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/models"
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

	log.Printf("Updating review with OverallRating: %d, EnergyRating: %d, MainstreamRating: %d, PriceRating: %d, CrowdRating: %d, HypeRating: %d, ExclusiveRating: %d, ReviewText: %s, VenueID: %v, ReviewID: %d",
		int8(req.OverallRating), int8(req.EnergyRating), int8(req.MainstreamRating), int8(req.PriceRating), int8(req.CrowdRating), int8(req.HypeRating), int8(req.ExclusiveRating), req.ReviewText, venueID, int8(reviewID))
	// Call the store method to update the review
	err = s.store.PatchVenueReview(c.Context(), int8(req.OverallRating), int8(req.EnergyRating), int8(req.MainstreamRating), int8(req.PriceRating), int8(req.CrowdRating), int8(req.HypeRating), int8(req.ExclusiveRating), req.ReviewText, venueID, int8(reviewID))
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
	fmt.Println("GETTING VENUE FROM ID")
	fmt.Println(venueID)
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

func (s *Service) GetVenuesFromName(c *fiber.Ctx) error {
	name := c.Query("q")
	if name == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Venue name is required")
	}
	venue, err := s.store.GetVenuesFromName(c.Context(), name)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}
	return c.Status(fiber.StatusOK).JSON(venue)
}

func (s *Service) GetAllVenues(c *fiber.Ctx) error {
	fmt.Println("GETTING ALL VENUES")
	venues, err := s.store.GetAllVenues(c.Context())
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}
	return c.Status(fiber.StatusOK).JSON(venues)
}

// SORT FORMAT: /venues/getAll?sort= {sort}
// where sort can equal one of the following strings:
// ByPrice (no extra parameter needed)
// ByRating (no extra parameter needed)
// ByDistance {longitude} {latitude}
// ByRecommendation {persona_name} // must be one of the seven listed personas
func (s *Service) GetAllVenuesWithFilter(c *fiber.Ctx) error {
	fmt.Println("GETTING ALL VENUES")
	// parse all filters from the context
	sort := c.Query("sort")
	f := c.Query("filters")
	filters := []string{} // default to empty array if no filters applied
	if f != `` {
		filters = strings.Split(f, ",")
	}
	// pass filters into SortAndFilter instance and retrieve query string
	sortAndFilter := models.SortAndFilter{}
	sortAndFilter = sortAndFilter.Make()
	whereQuery := sortAndFilter.ConstructFilterQuery(filters)
	sortQuery := sortAndFilter.SortVenues(sort)
	// retrieve venues with given filters from db
	venues, err := s.store.GetAllVenuesWithFilter(c.Context(), whereQuery, sortQuery)
	if err != nil {
		fmt.Println(err.Error())
		return s.GetAllVenues(c) // attempt to get all venues without the filter (default choice if a sort isn't possible)
	}
	// Use SortAndFilter instance to sort the filtered list of venues and return final list
	return c.Status(fiber.StatusOK).JSON(venues)
}

func (s *Service) GetVenuePersona(c *fiber.Ctx) error {
	venueID := c.Params("venueId")
	if venueID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Venue ID is required")
	}
	formattedID, err := uuid.Parse(venueID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Couldn't parse venue id to uuid")
	}

	v, err := s.store.GetVenueFromID(c.Context(), formattedID)
	if err != nil {
		fmt.Println("error: " + err.Error())
		return fiber.NewError(fiber.StatusInternalServerError, "Could not get venue")
	}

	// Calculate weights
	total := v.AvgEnergy + v.AvgExclusive + v.AvgMainstream + v.AvgPrice
	priceWeight := v.AvgPrice / total
	mainstreamWeight := v.AvgMainstream / total
	energyWeight := v.AvgEnergy / total
	exclusiveWeight := v.AvgExclusive / total

	temp := models.ByRecommendation{}
	allDists := []struct {
		Persona  string
		Distance float64
	}{}

	// Calculate distances and populate allDists
	for key, value := range temp.CharacterMap() {
		distance := math.Abs(float64(energyWeight)-float64(value[0])) +
			math.Abs(float64(exclusiveWeight)-float64(value[1])) +
			math.Abs(float64(mainstreamWeight)-float64(value[2])) +
			math.Abs(float64(priceWeight)-float64(value[3]))

		allDists = append(allDists, struct {
			Persona  string
			Distance float64
		}{
			Persona:  key,
			Distance: distance,
		})
	}

	// If no personas are available
	if len(allDists) == 0 {
		return c.Status(fiber.StatusOK).JSON("Not enough reviews to determine venue persona")
	}

	// Sort allDists by ascending distance
	sort.Slice(allDists, func(i, j int) bool {
		return allDists[i].Distance < allDists[j].Distance
	})

	// Collect the top 3 personas (or fewer if less than 3 exist)
	top3Personas := []string{}
	for i := 0; i < len(allDists) && i < 3; i++ {
		top3Personas = append(top3Personas, allDists[i].Persona)
	}

	// Return the top 3 personas
	return c.Status(fiber.StatusOK).JSON(top3Personas)
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
	fmt.Print(latitude)
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
