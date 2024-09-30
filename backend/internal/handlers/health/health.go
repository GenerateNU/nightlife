package health

import (
	"net/http"
	"runtime"

	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

var health = &types.SysInfo{
	OS:           runtime.GOOS,
	Architecture: runtime.GOARCH,
	CPUCores:     runtime.NumCPU(),
	GoVersion:    runtime.Version(),
}

func (s *Service) GetHealth(c *fiber.Ctx) error {
	return c.
		Status(http.StatusOK).
		JSON(
			fiber.Map{
				"status": "ok",
				"system": health,
			},
		)
}
