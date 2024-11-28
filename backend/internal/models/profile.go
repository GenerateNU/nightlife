package models

import (
	"time"

	"github.com/google/uuid"
)

type Profile struct {
	UserID            uuid.UUID    `json:"user_id"`
	FirstName         	  string    `json:"name"`
	Username          string    `json:"username"`
	Password		  string    `json:"password"`
	Email             string    `json:"email"`
	Age               int       `json:"age"`
	Location          string    `json:"location"`
	ProfilePictureURL string    `json:"profile_picture_url"`
	CreatedAt         time.Time `json:"created_at"`
}
