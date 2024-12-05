package friendship

import (
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
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

func (s *Service) GetFriendshipsByUserID(c *fiber.Ctx) error {
	fmt.Println("Getting friendships by user ID")

	var userID uuid.UUID

	fmt.Print(c.Params("userID"))

	if err := userID.UnmarshalText([]byte(c.Params("userID"))); err != nil {
		log.Printf("Error parsing UUID: %v, Request: %+v", err, userID)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse UUID",
		})
	}

	friendships, err := s.store.GetFriendshipsByUserID(c.Context(), userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get friendships",
		})
	}

	return c.Status(fiber.StatusOK).JSON(friendships)
}