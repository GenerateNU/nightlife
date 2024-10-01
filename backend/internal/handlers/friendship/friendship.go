package friendship

import (
	"fmt"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"log"
)

// POST endpoint to create friendship between two users in DB
func (s *Service) CreateFriendship(c *fiber.Ctx) error {
	fmt.Println("Creating a friendship")

	var req models.Friendship

	if err := c.BodyParser(&req); err != nil {
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	if err := s.store.CreateFriendship(c.Context(), req); err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(req)
}
