package userratings

import (
	"fmt"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/models"
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

func (s *Service) CreateReview(c *fiber.Ctx) error {
	var p models.Review
	if err := c.BodyParser(&p); err != nil {
		return errs.BadRequest(err)
	}

	if err := s.store.CreateReview(c.Context(), p); err != nil {
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(p)

}
