package bookmarks

import (
	"fmt"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (s *Service) GetBookmarkFromID(c *fiber.Ctx) error {
	fmt.Println("Pinging correct service")

	userID := c.Params("userId")
	fmt.Println("----", userID)
	if userID == "" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400)
	}
	UserIDFormatted, err := uuid.Parse(userID)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "Malformed User ID")
	}

	Bookmarks, err := s.store.GetBookmarkFromID(c.Context(), UserIDFormatted)

	if err != nil {
		fmt.Println("Error is on service line 26" + err.Error())
		c.Status(http.StatusInternalServerError)
		return err
	}

	return c.Status(http.StatusOK).JSON(Bookmarks)

}

func (s *Service) CreateBookmark(c *fiber.Ctx) error {
	var p models.Bookmarks
	fmt.Println("****")
	if err := c.BodyParser(&p); err != nil {
		fmt.Println("HERE")
		return errs.BadRequest(err)
	}

	if err := s.store.CreateBookmark(c.Context(), p); err != nil {
		fmt.Println("error: ", err.Error())
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(p)

}
