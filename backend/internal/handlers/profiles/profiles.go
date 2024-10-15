package profiles

import (
	"log"
	"net/http"
	

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

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
