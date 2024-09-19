package auth

import (
	"fmt"
	"strings"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

func parseJWTToken(token string, hmacSecret []byte) (email string, err error) {
	// Parse the token and validate the signatur
	t, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return hmacSecret, nil
	})

	// Check if the token is valid
	if err != nil {
		return "", fmt.Errorf("error validating token: %v", err)
	} else if claims, ok := t.Claims.(*Claims); ok {
		return claims.Email, nil
	}

	return "", fmt.Errorf("error parsing token: %v", err)
}

// Middleware to protect routes -> TODO: testing
func Protected(cfg *config.Config) fiber.Handler {

	return func(ctx *fiber.Ctx) error {

		token := ctx.Get("Authorization", "")
		token = strings.TrimPrefix(token, "Bearer ")

		if token == "" {
			return ctx.Status(400).JSON(fiber.Map{"code": "unauthorized, token not found"})
		}
		_, err := parseJWTToken(token, []byte(cfg.JWTToken))

		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{"code": "unauthorized, error parsing token"})
		}
		return ctx.Next()
	}
}
