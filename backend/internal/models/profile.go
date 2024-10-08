package models

import "time"

type Profile struct {
	UserID            string    `json:"user_id"`
	FirstName         string    `json:"first_name"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	Age               int       `json:"age"`
	Location          string    `json:"location"`
	ProfilePictureURL string    `json:"profile_picture_url"`
	CreatedAt         time.Time `json:"created_at"`
}
