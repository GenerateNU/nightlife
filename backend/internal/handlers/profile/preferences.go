package profile

import (
	"github.com/gofiber/fiber/v2"
)

type Preferences struct {
	userID int `json: "userID"` // assuming 1:1/1:* relationship
	location string `json: "location"`//city/state combo? not sure how this is getting defined
	age int `json: "age"`
	music string `json: "music"`
	ambiance string `json: "ambiance"`
	notifs bool `json: "notifs"`// is this part of the preferences? 
}

// POST Endpoint -> allows users to add their preferences to the db
func (p *Preferences) RetPreferences(c *fiber.Ctx, db *pgx.Conn) error {
	
	// json body with respective attributes
	// fill the struct -> 400 status if not in correct format
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

	// insert pref attributes to prefs table 
	query :=  `INSERT INTO preferences (userID, location, age, music, ambiance, notifs) 
				VALUES ($1, $2, $3, $4, $5, $6)`

	// execute query to save preferences to db
	_, err := db.Exec(context.Background(), query, userID, loc, age, music, amb, notifs)

	// handle case where db connection bad
	if err != nil {
        return c.Status(500).SendString("Database Error")
    }

	// close out with success status
    return c.Status(fiber.StatusOK).SendString("Preferences saved successfully")


}
