package health

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
	"net/http"
	"runtime"
)

func (s *Service) GetHealth(c *fiber.Ctx) error {

	sysInfo := &types.SysInfo{
		OS:           runtime.GOOS,
		Architecture: runtime.GOARCH,
		CPUCores:     runtime.NumCPU(),
		GoVersion:    runtime.Version(),
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": "ok",
		"system": sysInfo,
	})
}
