package models

import "github.com/google/uuid"

type UpdateProfilePrefencesRequest struct {
	UserID            uuid.UUID `json:"user_id"`
	PreferenceTypeTo  string    `json:"preference_type_to"`
	PreferenceValueTo string    `json:"preference_value_to"`
	PreferenceType    string    `json:"preference_type"`
	PreferenceValue   string    `json:"preference_value"`
}
