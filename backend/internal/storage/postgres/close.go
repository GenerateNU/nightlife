package postgres

import "context"

func (db *DB) Close(ctx context.Context) error {
	return db.conn.Close(ctx)
}
