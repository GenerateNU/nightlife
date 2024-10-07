package postgres

import "context"

func (db *DB) Close(ctx context.Context) {
	db.conn.Close()
}
