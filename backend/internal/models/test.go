package models

import "time"

type Test struct {
	ID        int32     `json:"id"`
	CreatedAt time.Time `json:"created_at"`
}
