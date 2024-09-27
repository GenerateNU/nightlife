package auth

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/gofiber/fiber/v2"
	"net/http"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *Service) Login(c *fiber.Ctx) error {

	var loginData LoginRequest

	if err := c.BodyParser(&loginData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}

	email := loginData.Email
	password := loginData.Password

	conf, err := config.LoadConfig()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to load config",
		})
	}

	authToken, err := auth.GetAuthToken(&conf.Supabase, email, password)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Failed to authenticate user",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message":  "Logged In",
		"email":    email,
		"password": password,
		"token":    authToken,
	})
}
