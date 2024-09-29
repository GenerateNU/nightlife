package postgres

import (
	"context"

	"log"

	"github.com/google/uuid"
)

func (db *DB) UpdateProfilePrefences(ctx context.Context, userid uuid.UUID, preferencetypeto string, preferencevalueto string, preferenceType string, preferenceValue string) error {

	// SQL query execution
	_, err := db.conn.Exec(ctx, `
        UPDATE "UserPreference" up
        SET
            user_id = $1,
            preference_type = $2,
            preference_value = $3
        WHERE user_id = $1 AND preference_type = $4 AND preference_value = $5;
    `, userid, preferencetypeto, preferencevalueto, preferenceType, preferenceValue)

	if err != nil {
		log.Printf("Failed to update preferences for userId %s: %v", userid, err)
		return err
	}

	log.Printf("Successfully updated preferences for userId: %s", userid)
	return nil

}
