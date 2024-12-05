package models

// Represents User Preferences

import (
	"github.com/google/uuid"
)

// Represents User Preferences
type Preferences struct {
	UserID   uuid.UUID    `json:"user_id"`  // assuming 1:1/1:* relationship
	Location string `json:"location"` //city/state combo? not sure how this is getting defined
	Nightlife      string    `json:"nightlife"`
	Interests    []string `json:"interests"`
	CrowdPreference []string `json:"crowd_preference"`
	TimePreference string `json:"time_preference"`
	Frequency string `json:"frequency"`
	InsideOrOutside string `json:"insideoroutside"`

}	

func (p *Preferences) Validate() map[string]string {
	return nil
}
