package handlers

import (
    "github.com/gofiber/fiber/v2"
    "your_project/internal/types"
)

// registerVenueRoutes sets up the routing for venue operations
func registerVenueRoutes(app *fiber.App, service *VenueService) {
    // Create a new venue
    app.Post("/venues", func(c *fiber.Ctx) error {
        var venue types.Venue
        if err := c.BodyParser(&venue); err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "error parsing request"})
        }

        createdVenue, err := service.CreateVenue(venue)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }

        return c.Status(fiber.StatusCreated).JSON(createdVenue)
    })

    // Get all venues
    app.Get("/venues", func(c *fiber.Ctx) error {
        venues, err := service.GetVenues()
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }

        return c.JSON(venues)
    })

    // Get one venue by ID
    app.Get("/venues/:id", func(c *fiber.Ctx) error {
        id, err := c.ParamsInt("id")
        if err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid ID"})
        }

        venue, err := service.GetVenue(id)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }
        if venue == nil {
            return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Venue not found"})
        }

        return c.JSON(venue)
    })

    // Update a venue
    app.Put("/venues/:id", func(c *fiber.Ctx) error {
        id, err := c.ParamsInt("id")
        if err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid ID"})
        }

        var venue types.Venue
        if err := c.BodyParser(&venue); err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "error parsing request"})
        }
        venue.VenueID = id // Ensure the ID is set correctly from the URL
        updatedVenue, err := service.UpdateVenue(venue)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }

        return c.JSON(updatedVenue)
    })

    // Delete a venue
    app.Delete("/venues/:id", func(c *fiber.Ctx) error {
        id, err := c.ParamsInt("id")
        if err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid ID"})
        }

        err = service.DeleteVenue(id)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }

        return c.SendStatus(fiber.StatusNoContent)
    })
}
