package models

import "time"
import "github.com/google/uuid"

type OnboardingProfile struct {
	UserID            uuid.UUID    `json:"user_id,omitempty"`
	FirstName         	  string    `json:"name"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	Age               int       `json:"age"`
	Location          string    `json:"location"`
	ProfilePictureURL string    `json:"profile_picture_url"`
	CreatedAt         time.Time `json:"created_at"`
}