package models

// Represents User Preferences
type Preferences struct {
	UserID   int    `json:"user_id"`  // assuming 1:1/1:* relationship
	Location string `json:"location"` //city/state combo? not sure how this is getting defined
	Age      int    `json:"age"`
	Music    string `json:"music"`
	Ambiance string `json:"ambiance"`
	Notifs   bool   `json:"notifs"` // is this part of the preferences?
}

func (p *Preferences) Validate() map[string]string {
	return nil
}
