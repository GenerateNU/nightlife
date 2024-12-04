package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

func (db *DB) CreateFriendship(ctx context.Context, friendship models.Friendship) error {
	var query = `
	INSERT INTO friendship (user_id1, user_id2, friendship_status, created_at) 
	VALUES ($1, $2, $3, $4);
	`
	_, err := db.conn.Exec(ctx, query, friendship.UserID1, friendship.UserID2, friendship.FriendshipStatus, friendship.CreatedAt)
	return err
}

func (db *DB) GetFriendshipsByUserID(ctx context.Context, userID uuid.UUID) ([]models.Friendship, error) {
	var query = `
	SELECT * FROM friendship WHERE user_id1 = $1 OR user_id2 = $1;
	`
	rows, err := db.conn.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var friendships []models.Friendship
	for rows.Next() {
		var friendship models.Friendship
		err = rows.Scan(&friendship.UserID1, &friendship.UserID2, &friendship.FriendshipStatus, &friendship.CreatedAt)
		if err != nil {
			return nil, err
		}
		friendships = append(friendships, friendship)
	}
	return friendships, nil
}