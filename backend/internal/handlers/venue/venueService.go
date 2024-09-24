// internal/handlers/venueService.go
package handlers

import (
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

type VenueService struct {
	Store VenueStore
}

type VenueStore interface {
	CreateVenue(venue types.Venue) (types.Venue, error)
	GetVenues() ([]types.Venue, error)
	GetVenueByID(id int) (types.Venue, error)
	UpdateVenue(venue types.Venue) (types.Venue, error)
	DeleteVenue(id int) error
}

func NewVenueService(store VenueStore) *VenueService {
	return &VenueService{Store: store}
}

func (vs *VenueService) CreateVenue(c *fiber.Ctx) error {
	var venue types.Venue
	if err := c.BodyParser(&venue); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}
	createdVenue, err := vs.Store.CreateVenue(venue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to create venue"})
	}
	return c.Status(fiber.StatusCreated).JSON(createdVenue)
}

func (vs *VenueService) GetVenues(c *fiber.Ctx) error {
	venues, err := vs.Store.GetVenues()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to retrieve venues"})
	}
	return c.JSON(venues)
}

func (vs *VenueService) GetVenue(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid venue ID"})
	}
	venue, err := vs.Store.GetVenueByID(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to retrieve venue"})
	}
	if venue == (types.Venue{}) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "venue not found"})
	}
	return c.JSON(venue)
}

func (vs *VenueService) UpdateVenue(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid venue ID"})
	}
	var venue types.Venue
	if err := c.BodyParser(&venue); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}
	venue.VenueID = id
	updatedVenue, err := vs.Store.UpdateVenue(venue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to update venue"})
	}
	return c.JSON(updatedVenue)
}

func (vs *VenueService) DeleteVenue(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid venue ID"})
	}
	err = vs.Store.DeleteVenue(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to delete venue"})
	}
	return c.SendStatus(fiber.StatusNoContent)
}
