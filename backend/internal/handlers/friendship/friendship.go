package friendship

import (
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// POST endpoint to create friendship between two users in DB
func (s *Service) CreateFriendship(c *fiber.Ctx) error {
    var req models.Friendship

    // Parse the request body and check for errors
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Cannot parse JSON",
        })
    }

    // Ensure both user ids are present
    if req.UserID1 == uuid.Nil || req.UserID2 == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Both user_id1 and user_id2 are required",
        })
    }

    // Set default friendship status if not provided (just an edge case)
    if req.FriendshipStatus == "" {
        req.FriendshipStatus = models.Pending
    }

    // Call CreateFriendship method to interact with db
    if err := s.store.CreateFriendship(c.Context(), req); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to create friendship",
        })
    }

    // On success, return 201 and req body
    return c.Status(fiber.StatusCreated).JSON(req)
}


