// nolint
package profiles

import (
	"log"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/GenerateNU/nightlife/internal/utils"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// POST Endpoint -> allows users to add their preferences to the db
func (s *Service) CreatePreferences(c *fiber.Ctx) error {
	var p models.Preferences
	if err := c.BodyParser(&p); err != nil {
		return errs.BadRequest(err)
	}

	if verrs := p.Validate(); verrs != nil {
		return errs.InvalidRequestData(verrs)
	}

	if err := s.store.CreatePreferences(c.Context(), p); err != nil {
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(p)

}

func (s *Service) UpdateProfilePreferences(c *fiber.Ctx) error {

	// Parse the request body
	var req models.UpdateProfilePrefencesRequest
	if err := c.BodyParser(&req); err != nil { // Declare a new instance of `err` in the scope of this if statement
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	err := s.store.UpdateProfilePreferences(c.Context(), req.UserID, req.PreferenceTypeTo, req.PreferenceValueTo, req.PreferenceType, req.PreferenceValue)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update review",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Review updated successfully",
	})

}

/*
Deletes a user account.
*/
func (s *Service) DeleteUser(c *fiber.Ctx) error {
	// Extract user ID from the URL parameter
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	// Convert user ID to UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	// Call DeleteAccount function to delete the user from the database
	err = s.store.DeleteAccount(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete user")
	}

	// Return success response
	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "User deleted successfully"})
}

// RemoveFriend removes a friend from the authenticated user's friend list
func (s *Service) RemoveFriend(c *fiber.Ctx) error {

	// username of the friend to be removed
	friendUsername := c.Params("username")
	if friendUsername == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Friend's username is required")
	}

	// Get the user's ID from the context (assuming it's set during authentication)
	userID, ok := c.Locals("userId").(uuid.UUID)
	if !ok {
		return fiber.NewError(fiber.StatusUnauthorized, "User not authenticated")
	}

	// call function to remove the friend by username
	err := s.store.RemoveFriend(c.Context(), userID, friendUsername)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to remove friend")
	}

	// Return success message
	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Friend removed successfully"})
}

/*
GetProfile retrieves a user's profile information by the user's username, email, or ID.
*/
func (s *Service) GetProfile(c *fiber.Ctx) error {

	userIdentifier := c.Params("userIdentifier")

	var profile models.Profile
	var err error

	if utils.IsEmail(userIdentifier) {
		// Query by email
		profile, err = s.store.GetProfileByColumn(c.Context(), "email", userIdentifier)
	} else if utils.IsUUID(userIdentifier) {
		// Query by ID
		profile, err = s.store.GetProfileByColumn(c.Context(), "user_id", userIdentifier)
	} else {
		// Query by username
		profile, err = s.store.GetProfileByColumn(c.Context(), "username", userIdentifier)
	}

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "profile not found"})
	}

	return c.Status(fiber.StatusOK).JSON(profile)
}

func (s *Service) UpdateProfile(c *fiber.Ctx) error {

	userIDString := c.Params("userId")

	userID, err := uuid.Parse(userIDString)

	if err != nil {
		if handlerErr := errs.ErrorHandler(c, err); handlerErr != nil {
			return handlerErr
		}
	}

	var req types.ProfileUpdateRequest
	if err := c.BodyParser(&req); err != nil {
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	err = s.store.PatchProfile(c.Context(), userID, req.FirstName,
		req.Username, req.Email, req.Age, req.Location, req.ProfilePictureURL, req.PersonalityType, req.Pronouns, req.Biography, req.InstagramURL, req.TikTokURL, req.TwitterURL, req.Phone, req.Privacy)

	if err != nil {
		if handlerErr := errs.ErrorHandler(c, err); handlerErr != nil {
			return handlerErr
		}
		return c.Status(403).JSON(fiber.Map{
			"message": "Invalid request body, or other error occurred",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "User profile updated successfully",
	})
}

/*
Get All Users
*/
func (s *Service) GetAllUsers(c *fiber.Ctx) error {
	// Fetch all users from the store
	users, err := s.store.GetAllUsers(c.Context())
	if err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to retrieve users",
			"details": err.Error(),
		})
	}

	// If no users are found, we can return a 404
	if len(users) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No users found",
		})
	}

	// Return the list of users with a 200 OK status
	return c.Status(fiber.StatusOK).JSON(users)
}

/*
Get all reviews authored by a given user
*/
func (s *Service) GetUserAuthoredReviews(c *fiber.Ctx) error {
	// Extract the user ID from the URL parameter
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	// Convert the user ID to a UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	// Call the store to get the reviews authored by the user
	reviews, err := s.store.GetUserAuthoredReviews(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to get user reviews")
	}

	// Return the list of reviews
	return c.Status(fiber.StatusOK).JSON(reviews)
}

func (s *Service) GetUserReviewsWithVenueData(c *fiber.Ctx) error {
	// Extract the user ID from the URL parameter
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	// Convert the user ID to a UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	// Fetch reviews with venue data from the store
	data, err := s.store.GetUserReviewsWithVenueData(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch reviewed venues")
	}

	// Return the combined data as JSON
	return c.Status(fiber.StatusOK).JSON(data)
}

// Get saved venues for a user
func (s *Service) GetUserSavedVenues(c *fiber.Ctx) error {
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	venues, err := s.store.GetUserSavedVenues(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch saved venues")
	}

	return c.Status(fiber.StatusOK).JSON(venues)
}

// Get visited venues for a user
func (s *Service) GetUserVisitedVenues(c *fiber.Ctx) error {
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	venues, err := s.store.GetUserVisitedVenues(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch visited venues")
	}

	return c.Status(fiber.StatusOK).JSON(venues)
}

func (s *Service) GetUserLocation(c *fiber.Ctx) error {
    userID := c.Params("userId")
    if userID == "" {
        return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
    }

    userUUID, err := uuid.Parse(userID)
    if err != nil {
        return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
    }

    // Fetch latitude and longitude from the store
    location, err := s.store.GetUserLocation(c.Context(), userUUID)
    if err != nil {
        return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch user location")
    }

    // Return the latitude and longitude
    return c.Status(fiber.StatusOK).JSON(location)
}


