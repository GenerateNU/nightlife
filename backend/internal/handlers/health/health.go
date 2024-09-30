package health

import (
	"net/http"
	"runtime"

	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"

	go_json "github.com/goccy/go-json"
)

var healthBody []byte

func init() {
	body := fiber.Map{
		"status": "ok",
		"system": &types.SysInfo{
			OS:           runtime.GOOS,
			Architecture: runtime.GOARCH,
			CPUCores:     runtime.NumCPU(),
			GoVersion:    runtime.Version(),
		},
	}

	bodyBytes, err := go_json.Marshal(body)
	if err != nil {
		panic(err)
	}

	healthBody = bodyBytes
}

func (s *Service) GetHealth(c *fiber.Ctx) error {
	c.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSON)
	return c.Status(http.StatusOK).Send(healthBody)
}
