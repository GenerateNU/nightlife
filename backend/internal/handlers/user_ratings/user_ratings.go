package userratings

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetAllUserRatings(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")

	userID := c.Params("user_id")
	if userID == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	UserIDFormatted, err := uuid.Parse(userID)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Malformed User ID")
	}

	UserRatings, err := s.store.GetAllUserRatings(c.Context(), UserIDFormatted)

	if err != nil {
		fmt.Println("Error is on service line 26" + err.Error())
		c.Status(http.StatusInternalServerError)
		return err
	}

	return c.Status(http.StatusOK).JSON(UserRatings)

}
