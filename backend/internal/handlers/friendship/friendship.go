package friendship

import (
	"fmt"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"time"
)

// POST endpoint to create friendship between two users in DB
func (s *Service) CreateFriendship(c *fiber.Ctx) error {
	fmt.Println("Creating a friendship")

	uid1 := c.Params("uid1")
	uid2 := c.Params("uid2")

	userID1, err := uuid.Parse(uid1)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID 1"})
	}

	userID2, err := uuid.Parse(uid2)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID 2"})
	}

	friendship := models.Friendship{
		UserID1:          userID1,
		UserID2:          userID2,
		FriendshipStatus: models.Accepted,
		CreatedAt:        time.Now(),
	}

	if err := s.store.CreateFriendship(c.Context(), friendship); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create friendship"})
	}

	return c.Status(fiber.StatusCreated).JSON(friendship)
}
