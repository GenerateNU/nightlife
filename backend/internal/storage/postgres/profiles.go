//nolint
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
	userID uuid.UUID,
	firstName *string,
	username *string,
	email *string,
	age *int,
	location *string,
	profilePictureURL *string,
	personalityType *string,
	pronouns *string,
	biography *string,
	instagramURL *string,
	tikTokURL *string,
	twitterURL *string,
	phone *string,
	privacy *bool) error {

	fields := map[string]interface{}{
		"first_name":          firstName,
		"username":            username,
		"email":               email,
		"age":                 age,
		"location":            location,
		"profile_picture_url": profilePictureURL,
		"personality_type":    personalityType,
		"pronouns":            pronouns,
		"biography":           biography,
		"instagram_url":       instagramURL,
		"tik_tok_url":         tikTokURL,
		"twitter_url":         twitterURL,
		"phone":               phone,
		"privacy":             privacy,
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
		log.Printf("No fields to update for user %s", userID)
		return errors.ErrUnsupported
	}

	query = query[:len(query)-2] + fmt.Sprintf(" WHERE user_id = $%d", paramIndex)
	params = append(params, userID)

	_, err := db.conn.Exec(ctx, query, params...)
	if err != nil {
		log.Printf("Failed to update %s: %v", userID, err)
		return err
	}
	log.Printf("Updated %s successfully", userID)
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

	rows, err := db.conn.Query(ctx, `SELECT user_id, first_name, username, email, age, location, 
    COALESCE(profile_picture_url, '') AS profile_picture_url, created_at FROM users`)
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

/*
* Get the reviews that this user authored.
 */
func (db *DB) GetUserAuthoredReviews(ctx context.Context, userID uuid.UUID) ([]models.Review, error) {
	log.Printf("Fetching reviews for userID: %s", userID)

	rows, err := db.conn.Query(ctx, `SELECT review_id, COALESCE(venue_id, ''), overall_rating, ambiance_rating, music_rating, crowd_rating, service_rating, review_text, created_at FROM review WHERE user_id = $1`, userID)
	if err != nil {
		log.Printf("Error querying reviews: %v", err)
		return nil, err
	}
	defer rows.Close()

	var reviews []models.Review
	for rows.Next() {
		var review models.Review
		if err := rows.Scan(
			&review.ReviewID,
			&review.VenueID,
			&review.OverallRating,
			&review.AmbianceRating,
			&review.MusicRating,
			&review.CrowdRating,
			&review.ServiceRating,
			&review.ReviewText,
			&review.CreatedAt,
		); err != nil {
			log.Printf("Error scanning review row: %v", err)
			return nil, err
		}
		reviews = append(reviews, review)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error iterating through rows: %v", err)
		return nil, err
	}

	log.Printf("Successfully fetched %d reviews for userID: %s", len(reviews), userID)
	return reviews, nil
}

func (db *DB) GetUserReviewsWithVenueData(ctx context.Context, userID uuid.UUID) ([]models.ReviewWithVenue, error) {
	query := `
		SELECT 
			r.review_id, 
			r.venue_id, 
			r.overall_rating, 
			r.ambiance_rating, 
			r.music_rating, 
			r.crowd_rating, 
			r.service_rating, 
			r.review_text, 
			r.created_at, 
			COALESCE(r.updated_at, '0001-01-01 00:00:00') AS updated_at,
			v.name, 
			v.address, 
			v.city, 
			v.state, 
			v.zip_code, 
			ST_Y(v.location::geometry) AS latitude, 
			ST_X(v.location::geometry) AS longitude
		FROM review r
		JOIN venue v ON r.venue_id = v.venue_id
		WHERE r.user_id = $1;
	`

	// Log the query and userID for debugging
	log.Printf("Executing query: %s with userID: %s", query, userID)

	rows, err := db.conn.Query(ctx, query, userID)
	if err != nil {
		log.Printf("Query execution error: %v", err)
		return nil, fmt.Errorf("query execution error: %w", err)
	}
	defer rows.Close()

	var results []models.ReviewWithVenue
	for rows.Next() {
		var rwv models.ReviewWithVenue
		err := rows.Scan(
			&rwv.Review.ReviewID,
			&rwv.Review.VenueID,
			&rwv.Review.OverallRating,
			&rwv.Review.AmbianceRating,
			&rwv.Review.MusicRating,
			&rwv.Review.CrowdRating,
			&rwv.Review.ServiceRating,
			&rwv.Review.ReviewText,
			&rwv.Review.CreatedAt,
			&rwv.Review.UpdatedAt,
			&rwv.Venue.Name,
			&rwv.Venue.Address,
			&rwv.Venue.City,
			&rwv.Venue.State,
			&rwv.Venue.ZipCode,
			&rwv.Venue.Latitude,
			&rwv.Venue.Longitude,
		)
		if err != nil {
			log.Printf("Row scanning error: %v", err)
			return nil, fmt.Errorf("row scanning error: %w", err)
		}
		results = append(results, rwv)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Rows iteration error: %v", err)
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	log.Printf("Successfully retrieved %d reviews with venues for userID: %s", len(results), userID)

	return results, nil
}

// Fetch saved venues for a user
func (db *DB) GetUserSavedVenues(ctx context.Context, userID uuid.UUID) ([]models.Venue, error) {
	query := `
		SELECT 
			v.venue_id, 
			v.name, 
			v.address, 
			v.city, 
			v.state, 
			v.zip_code, 
			ST_Y(v.location::geometry) AS latitude, 
			ST_X(v.location::geometry) AS longitude, 
			v.created_at
		FROM user_saved_venues usv
		JOIN venue v ON usv.venue_id = v.venue_id
		WHERE usv.user_id = $1;
	`

	rows, err := db.conn.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var venues []models.Venue
	for rows.Next() {
		var venue models.Venue
		if err := rows.Scan(
			&venue.VenueID,
			&venue.Name,
			&venue.Address,
			&venue.City,
			&venue.State,
			&venue.ZipCode,
			&venue.Latitude,
			&venue.Longitude,
			&venue.CreatedAt,
		); err != nil {
			return nil, err
		}
		venues = append(venues, venue)
	}

	return venues, rows.Err()
}

// Fetch visited venues for a user
func (db *DB) GetUserVisitedVenues(ctx context.Context, userID uuid.UUID) ([]models.Venue, error) {
	query := `
		SELECT 
			v.venue_id, 
			v.name, 
			v.address, 
			v.city, 
			v.state, 
			v.zip_code, 
			ST_Y(v.location::geometry) AS latitude, 
			ST_X(v.location::geometry) AS longitude, 
			v.created_at
		FROM user_visited_venues uvv
		JOIN venue v ON uvv.venue_id = v.venue_id
		WHERE uvv.user_id = $1;
	`

	rows, err := db.conn.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var venues []models.Venue
	for rows.Next() {
		var venue models.Venue
		if err := rows.Scan(
			&venue.VenueID,
			&venue.Name,
			&venue.Address,
			&venue.City,
			&venue.State,
			&venue.ZipCode,
			&venue.Latitude,
			&venue.Longitude,
			&venue.CreatedAt,
		); err != nil {
			return nil, err
		}
		venues = append(venues, venue)
	}

	return venues, rows.Err()
}

func (db *DB) GetUserLocation(ctx context.Context, userID uuid.UUID) (models.Location, error) {
    query := `
        SELECT 
            ST_Y(location::geometry) AS latitude,
            ST_X(location::geometry) AS longitude
        FROM users
        WHERE user_id = $1
    `

    var location models.Location
    row := db.conn.QueryRow(ctx, query, userID)
    if err := row.Scan(&location.Latitude, &location.Longitude); err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return models.Location{}, fmt.Errorf("no location found for user_id: %s", userID)
        }
        return models.Location{}, err
    }

    return location, nil
}
