package postgres

func (db *DB) Close() {
	db.conn.Close()
}
