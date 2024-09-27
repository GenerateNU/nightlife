// package postgres

// import (
// 	"context"
// 	"fmt"

// 	"github.com/GenerateNU/nightlife/internal/models"
// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5"
// )

// var query = `
// SELECT
// 	u.user_id AS user_id,
// 	u.username,
// 	v.venue_id AS venue_id,
// 	v.name AS venue_name,
// 	r.overall_rating
// FROM
// 	"Review" r
// JOIN
// 	"User" u ON r.user_id = u.user_id
// JOIN
// 	"Venue" v ON r.venue_id = v.venue_id
// WHERE
// 	u.user_id = $1;
// `

// // Stub- Database interactions will follow, will return an empty array of user ratings
// func (db *DB) GetAllUserRatings(ctx context.Context, user_id uuid.UUID) ([]models.UserRating, error) {
// 	rows, err := db.conn.Query(ctx, query, user_id)
// 	fmt.Println("Printing Rows")
// 	fmt.Println(rows)
// 	if err != nil {
// 		fmt.Println(err)
// 		return []models.UserRating{}, err
// 	}

//		return pgx.CollectRows(rows, pgx.RowToStructByName[models.UserRating])
//	}
package postgres

import (
	"context"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/google/uuid"
)

//Gets UserRating query result from DB
func (db *DB) GetAllUserRatings(ctx context.Context, user_id uuid.UUID) ([]models.UserRating, error) {
	return []models.UserRating{}, nil
}