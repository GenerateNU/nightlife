package venueratings

import (
	//"github.com/GenerateNU/nightlife/internal/auth"
	"github.com/GenerateNU/nightlife/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, params types.Params) {

	//create a service
	service := newService(params.Store)

	//create a grouping
	protected := app.Group("/venueratings")
	//.Use(auth.Protected(&params.Supabase))

	//create a route
	protected.Get("/venue/:venueid/ratings", service.GetAllVenueRatings)

	protected.Delete("/reviews/:reviewId", service.DeleteReviewForVenue)

}
