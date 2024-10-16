package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/GenerateNU/nightlife/internal/models"
	"log"

	"github.com/google/uuid"
)

func (db *DB) GetProfileByUsername(ctx context.Context, username string) (models.Profile, error) {
	var profile models.Profile

	var query = `
	SELECT user_id,
		   first_name,
		   username,
		   email,
		   age,
		   location,
		   profile_picture_url,
		   created_at
	FROM users
	WHERE username = $1
	`

	row := db.conn.QueryRow(ctx, query, username)

	err := row.Scan(
		&profile.UserID,
		&profile.FirstName,
		&profile.Username,
		&profile.Email,
		&profile.Age,
		&profile.Location,
		&profile.ProfilePictureURL,
		&profile.CreatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return models.Profile{}, fmt.Errorf("no profile found for username: %s", username)
		}
		return models.Profile{}, err
	}

	return profile, nil
}

func (db *DB) GetProfileByEmail(ctx context.Context, email string) (models.Profile, error) {
    var profile models.Profile
    var query = `
    SELECT user_id, first_name, username, email, age, location, profile_picture_url, created_at
    FROM "User"
    WHERE email = $1
    `
    row := db.conn.QueryRow(ctx, query, email)
    err := row.Scan(
		&profile.UserID,
		&profile.FirstName,
		&profile.Username,
		&profile.Email,
		&profile.Age,
		&profile.Location,
		&profile.ProfilePictureURL,
		&profile.CreatedAt,
	)

    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return models.Profile{}, fmt.Errorf("no profile found for email: %s", email)
        }
        return models.Profile{}, err
    }

    return profile, nil
}

func (db *DB) GetProfileByID(ctx context.Context, id string) (models.Profile, error) {
    var profile models.Profile
    var query = `
    SELECT user_id, first_name, username, email, age, location, profile_picture_url, created_at
    FROM "User"
    WHERE user_id = $1
    `
    row := db.conn.QueryRow(ctx, query, id)
	err := row.Scan(
		&profile.UserID,
		&profile.FirstName,
		&profile.Username,
		&profile.Email,
		&profile.Age,
		&profile.Location,
		&profile.ProfilePictureURL,
		&profile.CreatedAt,
	)
	
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return models.Profile{}, fmt.Errorf("no profile found for ID: %s", id)
        }
        return models.Profile{}, err
    }

    return profile, nil
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

    rows, err := db.conn.Query(ctx, `SELECT user_id, first_name, username, email, age, location, profile_picture_url, created_at FROM "User"`)
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

