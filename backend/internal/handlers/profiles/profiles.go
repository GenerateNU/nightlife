package profiles

import (
	"context"
	"fmt"

	"log"
	"net/http"

	"github.com/GenerateNU/nightlife/internal/errs"
	"github.com/GenerateNU/nightlife/internal/utils"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// POST Endpoint -> allows users to add their preferences to the db
func (s *Service) CreatePreferences(c *fiber.Ctx) error {
	var p models.Preferences
	log.Printf("Request: %+v", p)
	if err := c.BodyParser(&p); err != nil {
		log.Printf("Error parsing JSON: %v, Request: %+v", err, p)
		return errs.BadRequest(err)
	}
	if verrs := p.Validate(); verrs != nil {
		log.Printf("Validation errors: %v", verrs)
		return errs.InvalidRequestData(verrs)
	}

	if err := s.store.CreatePreferences(c.Context(), p); err != nil {
		log.Printf("Error creating preferences: %v", err)
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(p)

}

func (s *Service) GetUserCharacter(c *fiber.Ctx) error {
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	// Convert user ID to UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}
	
	// Call GetUserCharacter function to get the user character from the database
	userCharacter, err := s.store.GetUserCharacter(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to get user character")
	}

	// Return success response
	return c.Status(http.StatusOK).JSON(userCharacter)
}

func (s *Service) UserCharacter(c *fiber.Ctx) error {

	var req models.Preferences
	log.Printf("Request inside usercharacter: %+v", req)
	if err := c.BodyParser(&req); err != nil {
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return errs.BadRequest(err)
	}
	log.Printf("Request: %+v", req.UserID)
	
	if err := s.store.UserCharacter(c.Context(), req); err != nil {
		log.Printf("Error creating user character: %v", err)
		return err
	}

	// close out with success status
	return c.Status(fiber.StatusCreated).JSON(req)
}

func (s *Service) UpdateProfilePreferences(c *fiber.Ctx) error {

	// Parse the request body
	var req models.UpdateProfilePrefencesRequest
	if err := c.BodyParser(&req); err != nil { // Declare a new instance of `err` in the scope of this if statement
		log.Printf("Error parsing JSON: %v, Request: %+v", err, req)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	err := s.store.UpdateProfilePreferences(c.Context(), req.UserID, req.PreferenceTypeTo, req.PreferenceValueTo, req.PreferenceType, req.PreferenceValue)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update review",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Review updated successfully",
	})

}

/*
Deletes a user account.
*/
func (s *Service) DeleteUser(c *fiber.Ctx) error {
	// Extract user ID from the URL parameter
	userID := c.Params("userId")
	if userID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	// Convert user ID to UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid User ID format")
	}

	// Call DeleteAccount function to delete the user from the database
	err = s.store.DeleteAccount(c.Context(), userUUID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete user")
	}

	// Return success response
	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "User deleted successfully"})
}

// RemoveFriend removes a friend from the authenticated user's friend list
func (s *Service) RemoveFriend(c *fiber.Ctx) error {

	// username of the friend to be removed
	friendUsername := c.Params("username")
	if friendUsername == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Friend's username is required")
	}

	// Get the user's ID from the context (assuming it's set during authentication)
	userID, ok := c.Locals("userId").(uuid.UUID)
	if !ok {
		return fiber.NewError(fiber.StatusUnauthorized, "User not authenticated")
	}

	// call function to remove the friend by username
	err := s.store.RemoveFriend(c.Context(), userID, friendUsername)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to remove friend")
	}

	// Return success message
	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Friend removed successfully"})
}

func (s *Service) generateUniqueUserID(ctx context.Context) (uuid.UUID, error) {
    for {
        userID := uuid.New() // Generate a random ID
        exists, err := s.store.UserIDExists(ctx, userID)
        if err != nil {
            return uuid.UUID{}, err
        }
        if !exists {
            return userID, nil
        }
    }
}


func (s *Service) AddUser(c *fiber.Ctx) error {
	// Parse the request body
	var profile models.Profile
	if err := c.BodyParser(&profile); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	} else if profile.Username == "" || profile.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username and email are required"})
	} else if !utils.IsEmail(profile.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid email address"})
	} else if profile.FirstName == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "First name is required"})
	}
	// Generate a unique user ID
    userID, err := s.generateUniqueUserID(c.Context())
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate user ID"})
    }

    // Assign userID to the profile
    profile.UserID = userID
	log.Printf("Request inside add user: %+v", userID)

	log.Printf("Request inside add user the profile: %+v", profile)


    // Save the user
    if err := s.store.AddUser(c.Context(), profile); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add user"})
    }
    return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User added successfully"})

}

/*
GetProfile retrieves a user's profile information by the user's username, email, or ID.
*/
func (s *Service) GetProfile(c *fiber.Ctx) error {
	fmt.Printf("Reached GetProfile function")

    userIdentifier := c.Params("userIdentifier")

	fmt.Printf("userIdentifier: %s", userIdentifier)

    var profile models.Profile
    var err error

    if utils.IsEmail(userIdentifier) {
        // Query by email
        profile, err = s.store.GetProfileByColumn(c.Context(), "email", userIdentifier)
    } else if utils.IsUUID(userIdentifier) {
        // Query by ID
        profile, err = s.store.GetProfileByColumn(c.Context(), "user_id", userIdentifier)
    } else {
        // Query by username
        profile, err = s.store.GetProfileByColumn(c.Context(), "username", userIdentifier)
    }

	fmt.Printf("profile: %s", profile)

    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "profile not found"})
    }

    return c.Status(fiber.StatusOK).JSON(profile)
}


/*
Get All Users
*/
func (s *Service) GetAllUsers(c *fiber.Ctx) error {
	// Fetch all users from the store
	users, err := s.store.GetAllUsers(c.Context())
	if err != nil {
		
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve users",
			"details": err.Error(),
		})
	}

	// If no users are found, we can return a 404
	if len(users) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No users found",
		})
	}

	// Return the list of users with a 200 OK status
	return c.Status(fiber.StatusOK).JSON(users)
}
