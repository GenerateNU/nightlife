package auth

import (
	"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/gofiber/fiber/v2"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RetLogin(ctx *fiber.Ctx) error {
	// Create an instance of the LoginRequest struct
	var loginData LoginRequest

	// Parse the request body into the loginData struct
	if err := ctx.BodyParser(&loginData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}

	// Use the parsed email and password fields
	email := loginData.Email
	password := loginData.Password

	config, err := config.LoadConfig("../../../.env")

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to load config",
		})
	}

	authToken, err := auth.GetAuthToken(config, email, password)

	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Failed to authenticate user",
		})
	}

	// Log or process email and password here
	return ctx.JSON(fiber.Map{
		"message":  "Logged In",
		"email":    email,
		"password": password,
		"token":    authToken,
	})
}
