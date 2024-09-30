package server

import (
	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/handlers/auth"
	"github.com/GenerateNU/nightlife/internal/handlers/health"
	"github.com/GenerateNU/nightlife/internal/handlers/hello"
	"github.com/GenerateNU/nightlife/internal/handlers/profile"
	"github.com/GenerateNU/nightlife/internal/handlers/test"
	userrating "github.com/GenerateNU/nightlife/internal/handlers/user_ratings"
	venueratings "github.com/GenerateNU/nightlife/internal/handlers/venue_ratings"
	"github.com/GenerateNU/nightlife/internal/middleware"
	"github.com/GenerateNU/nightlife/internal/types"
	go_json "github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func New(params types.Params) *fiber.App {
	app := setupApp()

	useMiddlewares(app)

	health.Routes(app, params)
	hello.Routes(app, params)
	test.Routes(app, params)
	auth.Routes(app, params)
	profile.Routes(app, params)

	//User Ratings route group
	userrating.Routes(app, params)

	// Venue Ratings route group
	venueratings.Routes(app, params)

	return app
}

func useMiddlewares(app *fiber.App) {
	app.Use(middleware.Cors())
}

func setupApp() *fiber.App {
	app := fiber.New(fiber.Config{
		JSONEncoder:  go_json.Marshal,
		JSONDecoder:  go_json.Unmarshal,
		ErrorHandler: errs.ErrorHandler,
	})
	app.Use(recover.New())
	app.Use(requestid.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip}:${port} ${pid} ${locals:requestid} ${status} - ${latency} ${method} ${path}\n",
	}))
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))

	return app
}
