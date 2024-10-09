package models

import (
	"encoding/json"
	"github.com/google/uuid"
	"time"
)

type FriendshipStatus string

const (
	Pending  FriendshipStatus = "PENDING"
	Declined FriendshipStatus = "DECLINED"
	Blocked  FriendshipStatus = "BLOCKED"
	Accepted FriendshipStatus = "ACCEPTED"
)

// convert FriendshipStatus to a string when serializing to JSON
func (fs FriendshipStatus) MarshalJSON() ([]byte, error) {
	return json.Marshal(string(fs))
}

type Friendship struct {
	UserID1          uuid.UUID        `json:"user_id1"`
	UserID2          uuid.UUID        `json:"user_id2"`
	FriendshipStatus FriendshipStatus `json:"friendship_status"`
	CreatedAt        time.Time        `json:"created_at"`
}
