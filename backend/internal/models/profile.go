package models

import "time"

type Profile struct {
	UserID            string    `json:"user_id"`
	FirstName         string    `json:"first_name"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	Age               *int       `json:"age"`
	Location          *string    `json:"location"`
	ProfilePictureURL *string    `json:"profile_picture_url"`
	PersonalityType   *string    `json:"personality_type"`
	Pronouns		  *string 	`json:"pronouns"`
	Biography		  *string 	`json:"biography"`
	InstagramURL	  *string	`json:"instagram_url"`
	TikTokURL		  *string	`json:"tik_tok_url"`
	TwitterURL		  *string	`json:"twitter_url"`
	Phone			  *string	`json:"phone"`
	Privacy			  *bool		`json:"privacy"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}