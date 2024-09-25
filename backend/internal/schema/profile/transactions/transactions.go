package profile

import (
	"github.com/gofiber/fiber/v2"
)

type Preferences struct {
	Location string `json:"location"`
	Age int `json:"age"`
	Music string `json:"music"`
	Ambiance string `json:"ambiance"`
	Notifs bool `json:"notif_prefs`
}


func RetPreferences(ctx *fiber.Ctx) error {
	
}
