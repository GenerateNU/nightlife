package models

// Represents User Preferences
type Preferences struct {
	UserID   int    `json:"user_id"`  // assuming 1:1/1:* relationship
	Location string `json:"location"` //city/state combo? not sure how this is getting defined
	Age      int    `json:"age"`
	Music    string `json:"music"`
	Ambiance string `json:"ambiance"`
	Notifs   bool   `json:"notifs"` // is this part of the preferences?
	NightlifeType string `json:"nightlife_type"`
	CrowdType string `json:"crowd_type"`
	GoingOutFrequency string `json:"going_out_frequency"`
	TimePreference string `json:"time_preference"`
	IndoorOutdoorPreference string `json:"indoor_outdoor_preference"`
	
}

func (p *Preferences) Validate() map[string]string {
	return nil
}
