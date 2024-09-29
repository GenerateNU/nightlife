package profiles

import (
	"log"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

func (s *Service) UpdateProfilePrefences(c *fiber.Ctx) error {

	// Parse the request body
	var req types.UpdateProfilePrefencesRequest
	if err := c.BodyParser(&req); err != nil { // Declare a new instance of `err` in the scope of this if statement
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	err := s.store.UpdateProfilePrefences(c.Context(), req.UserID, req.PreferenceTypeTo, req.PreferenceValueTo, req.PreferenceType, req.PreferenceValue)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update review",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Review updated successfully",
	})

}
