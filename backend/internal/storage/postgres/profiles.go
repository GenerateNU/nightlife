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
		SELECT user_id, first_name, username, email, age, location, profile_picture_url, created_at
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
		&profile.CreatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return models.Profile{}, fmt.Errorf("no profile found for %s: %s", column, value)
		}
		return models.Profile{}, err
	}

	return profile, nil
}

func (db *DB) CreatePreferences(ctx context.Context, p models.Preferences) error {
	// query to save user data to db
	query := `INSERT INTO user_preference (user_id, location, nightlife, interests, crowd_preference, time_preference, frequency, insideoroutside) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	_, err := db.conn.Query(ctx, query, p.UserID, p.Location, p.Nightlife, p.Interests, p.CrowdPreference, p.TimePreference, p.Frequency, p.InsideOrOutside)
	return err
}

func determinePersonality(prefs models.Preferences) string {
    scores := map[string]int{
        "Plumehart": 0,
        "Serafina": 0,
        "Lumi": 0,
        "Roux": 0,
        "Buckley": 0,
        "Sprig": 0,
        "Blitz": 0,
    }

    // Increment scores based on preferences
    for _, interest := range prefs.Interests {
        switch interest {
        case "Ambience and Vibe":
            scores["Plumehart"]++
            scores["Serafina"]++
            scores["Lumi"]++
        case "Drink Selection and Service":
            scores["Roux"]++
            scores["Buckley"]++
            scores["Serafina"]++
        case "Crowd and Social Atmosphere":
            scores["Lumi"]++
            scores["Buckley"]++
            scores["Plumehart"]++
        // Add other cases as necessary
        }
    }

    for _, crowd := range prefs.CrowdPreference {
        switch crowd {
        case "Casual & Laid-Back":
            scores["Buckley"]++
            scores["Sprig"]++
        case "More Exclusive":
            scores["Plumehart"]++
        // Add other cases
        }
    }

    // Time preference
    switch prefs.TimePreference {
    case "Before 9 PM":
        scores["Buckley"]++
        scores["Plumehart"]++
        scores["Serafina"]++
    case "9-11 PM":
        scores["Lumi"]++
        scores["Roux"]++
        scores["Sprig"]++
    case "After 11 PM":
        scores["Blitz"]++
    }

    // Find the highest score
    maxScore := 0
    personality := "Undetermined"
    for venue, score := range scores {
        if score > maxScore {
            maxScore = score
            personality = venue
        }
    }
	log.Printf("Personality: %s", personality)

    return personality
}

func (db *DB) UserCharacter(ctx context.Context, p models.Preferences) error {
	// query to save user data to db
	log.Printf("UserCharacter: %+v", p)
	personality_type := determinePersonality(p)
	query := `UPDATE "users"
			  SET personality_type = $2
			  WHERE user_id = $1;`

	_, err := db.conn.Query(ctx, query, p.UserID, personality_type)
	return err
}

func (db *DB) GetUserCharacter(ctx context.Context, userID uuid.UUID) (string, error) {
	var personality string
	row := db.conn.QueryRow(ctx, `SELECT personality_type FROM users WHERE user_id = $1`, userID)
	err := row.Scan(&personality)
	if err != nil {
		return "", err
	}
	log.Printf("Personality: %s", personality)
	return personality, nil
}

func (db *DB) UpdateProfilePreferences(ctx context.Context, userID uuid.UUID, preferencetypeto string, preferencevalueto string, preferenceType string, preferenceValue string) error {

	// SQL query execution
	_, err := db.conn.Exec(ctx, `
        UPDATE "user_preference" up
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

func (db *DB) AddUser(ctx context.Context, user models.Profile) error {
	// query to save user data to db
	query := `INSERT INTO users (user_id, first_name, username, email, age, location, profile_picture_url, created_at) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	_, err := db.conn.Query(ctx, query, user.UserID, user.FirstName, user.Username, user.Email, user.Age, user.Location, user.ProfilePictureURL, user.CreatedAt)
	return err
}

func (db *DB) UserIDExists(ctx context.Context, userID uuid.UUID) (bool, error) {
    var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)`

	_, err := db.conn.Query(ctx, query, userID)
	return exists, err
}

