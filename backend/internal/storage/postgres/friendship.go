package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
)

func (db *DB) CreateFriendship(ctx context.Context, friendship models.Friendship) error {
	var query = `
	INSERT INTO friendship (user_id1, user_id2, friendship_status, created_at) 
	VALUES ($1, $2, $3, $4);
	`
	_, err := db.conn.Exec(ctx, query, friendship.UserID1, friendship.UserID2, friendship.FriendshipStatus, friendship.CreatedAt)
	return err
}
