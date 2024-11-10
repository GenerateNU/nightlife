package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/GenerateNU/nightlife/internal/models"

	"github.com/google/uuid"
)

/*
Gets a user profile by a column, (username, id, or email).
*/
func (db *DB) GetProfileByColumn(ctx context.Context, column string, value string) (models.Profile, error) {
	var profile models.Profile
	var query = fmt.Sprintf(`
		SELECT user_id, first_name, username, email, age, location, profile_picture_url, personality_type, pronouns, biography, instagram_url, tik_tok_url, twitter_url, phone, privacy, created_at
		FROM users
		WHERE %s = $1`, column)

	row := db.conn.QueryRow(ctx, query, value)

	err := row.Scan(
		&profile.UserID,
		&profile.FirstName,
		&profile.Username,
		&profile.Email,
		&profile.Age,
		&profile.Location,
		&profile.ProfilePictureURL,
		&profile.PersonalityType,
		&profile.Pronouns,
		&profile.Biography,
		&profile.InstagramURL,
		&profile.TikTokURL,
		&profile.TwitterURL,
		&profile.Phone,
		&profile.Privacy,
		&profile.CreatedAt,
	)

	if err != nil {
		log.Print(err)
		if errors.Is(err, sql.ErrNoRows) {
			return models.Profile{}, fmt.Errorf("no profile found for %s: %s", column, value)
		}
		return models.Profile{}, err
	}

	return profile, nil
}

func (db *DB) PatchProfile(
	ctx context.Context, 
	userId uuid.UUID, 
	firstName *string, 
	username *string, 
	email *string, 
	age *int, 
	location *string, 
	profilePictureUrl *string, 
	personalityType *string, 
	pronouns *string, 
	biography *string, 
	instagramUrl *string, 
	tikTokUrl *string, 
	twitterUrl *string, 
	phone *string, 
	privacy *bool) error {

	fields := map[string]interface{}{
		"first_name":         firstName,
		"username":           username,
		"email":              email,
		"age":                age,
		"location":           location,
		"profile_picture_url": profilePictureUrl,
		"personality_type":   personalityType,
		"pronouns":           pronouns,
		"biography":          biography,
		"instagram_url":      instagramUrl,
		"tik_tok_url":        tikTokUrl,
		"twitter_url":        twitterUrl,
		"phone":              phone,
		"privacy":            privacy,
	}

	query := `UPDATE "users" SET `
	params := []interface{}{}
	paramIndex := 1

	for field, value := range fields {
		switch v := value.(type) {
		case *string:
			if v != nil {
				query += fmt.Sprintf("%s = $%d, ", field, paramIndex)
				params = append(params, *v)
				paramIndex++
			}
		case *int:
			if v != nil {
				query += fmt.Sprintf("%s = $%d, ", field, paramIndex)
				params = append(params, *v)
				paramIndex++
			}
		case *bool:
			if v != nil {
				query += fmt.Sprintf("%s = $%d, ", field, paramIndex)
				params = append(params, *v)
				paramIndex++
			}
		}
	}

	if len(params) == 0 {
		log.Printf("No fields to update for user %s", userId)
		return errors.ErrUnsupported
	}

	query = query[:len(query)-2] + fmt.Sprintf(" WHERE user_id = $%d", paramIndex)
	params = append(params, userId)

	_, err := db.conn.Exec(ctx, query, params...)
	if err != nil {
		log.Printf("Failed to update %s: %v", userId, err)
		return err
	}
	log.Printf("Updated %s successfully", userId)
	return nil
}



func (db *DB) CreatePreferences(ctx context.Context, p models.Preferences) error {
	// query to save user data to db
	query := `INSERT INTO preferences (userID, location, age, music, ambiance, notifs) 
				VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := db.conn.Query(ctx, query, p.UserID, p.Location, p.Age, p.Music, p.Ambiance, p.Notifs)
	return err
}

func (db *DB) UpdateProfilePreferences(ctx context.Context, userID uuid.UUID, preferencetypeto string, preferencevalueto string, preferenceType string, preferenceValue string) error {

	// SQL query execution
	_, err := db.conn.Exec(ctx, `
        UPDATE user_preference up
        SET
            user_id = $1,
            preference_type = $2,
            preference_value = $3
        WHERE user_id = $1 AND preference_type = $4 AND preference_value = $5;
    `, userID, preferencetypeto, preferencevalueto, preferenceType, preferenceValue)

	if err != nil {
		log.Printf("Failed to update preferences for userId %s: %v", userID, err)
		return err
	}

	log.Printf("Successfully updated preferences for userId: %s", userID)
	return nil

}

/*
Delete an account
*/
func (db *DB) DeleteAccount(ctx context.Context, userID uuid.UUID) error {
	_, err := db.conn.Exec(ctx, `DELETE FROM users WHERE user_id = $1`, userID)

	if err != nil {
		return err
	}

	return nil
}

/*
RemoveFriend removes a friend from the user's friend list based on the friend's username
*/
func (db *DB) RemoveFriend(ctx context.Context, userID uuid.UUID, friendUsername string) error {
	_, err := db.conn.Exec(ctx, `
		DELETE FROM friendship
		WHERE user_id1 = $1 AND user_id2 = (SELECT user_id FROM users WHERE username = $2)
		OR user_id2 = $1 AND user_id1 = (SELECT user_id FROM users WHERE username = $2)
	`, userID, friendUsername)

	if err != nil {
		return err
	}
	return nil
}

/*
Get All Users
*/
func (db *DB) GetAllUsers(ctx context.Context) ([]models.Profile, error) {

	rows, err := db.conn.Query(ctx, `SELECT user_id, first_name, username, email, age, location, profile_picture_url, created_at FROM users`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var profiles []models.Profile

	// Iterate through the result rows
	for rows.Next() {
		var profile models.Profile
		if err := rows.Scan(
			&profile.UserID,
			&profile.FirstName,
			&profile.Username,
			&profile.Email,
			&profile.Age,
			&profile.Location,
			&profile.ProfilePictureURL,
			&profile.CreatedAt,
		); err != nil {
			return nil, err
		}
		profiles = append(profiles, profile)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return profiles, nil
}
