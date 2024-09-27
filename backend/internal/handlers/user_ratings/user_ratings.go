package userratings

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetAllUserRatings(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")

	user_id := c.Params("user_id")
	if user_id == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	user_id_formatted, err := uuid.Parse(user_id)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}

	user_ratings, err := s.store.GetAllUserRatings(c.Context(), user_id_formatted)

	if err != nil {
		fmt.Println("Error is on service line 26" + err.Error())
		c.Status(http.StatusInternalServerError)
		return err
	}

	return c.Status(http.StatusOK).JSON(user_ratings)

}
