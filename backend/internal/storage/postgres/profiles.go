package postgres

import (
	"context"

	"log"

	"github.com/google/uuid"
)

func (db *DB) UpdateProfilePrefences(ctx context.Context, user_id uuid.UUID, preference_type_to string, preference_value_to string,preferenceType string, preferenceValue string) error {

    // SQL query execution
    _, err := db.conn.Exec(ctx, `
        UPDATE "UserPreference" up
        SET
            user_id = $1,
            preference_type = $2,
            preference_value = $3
        WHERE user_id = $1 AND preference_type = $4 AND preference_value = $5;
    `, user_id, preference_type_to, preference_value_to, preferenceType, preferenceValue)

    if err != nil {
        log.Printf("Failed to update preferences for userId %s: %v", user_id, err)
        return err
    }

    log.Printf("Successfully updated preferences for userId: %s", user_id)
    return nil

}