package postgres

import (
	"context"
	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/jackc/pgx/v5"
)

// Represents User Preferences
type Preferences struct {
	userID   int    `json: "userID"`   // assuming 1:1/1:* relationship
	location string `json: "location"` //city/state combo? not sure how this is getting defined
	age      int    `json: "age"`
	music    string `json: "music"`
	ambiance string `json: "ambiance"`
	notifs   bool   `json: "notifs"` // is this part of the preferences?
}

func (db *DB) StorePreferences(ctx context.Context) ([]models.Test, error) {
	var p Preferences

	// save user response to Preferences instance
	if err := c.BodyParser(&p); err != nil {
		return c.Status(400).SendString("Invalid body format")
	}

	// split preference attributes to insert to db
	userID := p.userID
	loc := p.location
	age := p.age
	music := p.music
	amb := p.ambiance
	notifs := p.notifs

	// query to save user data to db
	query := `INSERT INTO preferences (userID, location, age, music, ambiance, notifs) 
				VALUES ($1, $2, $3, $4, $5, $6)`

	rows, err := db.conn.Query(ctx, query, userID, loc, age, music, amb, notifs)

	if err != nil {
		return []models.Test{}, err, ctx.Status(500).SendString("Database Error")
	}

	return c.Status(fiber.StatusOK).SendString("Preferences saved successfully")
}
