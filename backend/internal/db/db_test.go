//go:build !skiptest
// +build !skiptest

package db

import (
	"context"
	"fmt"
	"testing"
)

func TestDBConnection(t *testing.T) {
	t.Run("TestConnectSupabaseDB", func(t *testing.T) {
		fmt.Println("Running TestConnectSupabaseDB")
		// establish connection
		conn, err := ConnectSupabaseDB()
		if err != nil {
			t.Fatalf("Failed to connect to the database: %v", err)
		}
		defer conn.Close(context.Background())

		// query to get all rows from the test table
		rows, err := conn.Query(context.Background(), "SELECT * FROM test")
		if err != nil {
			t.Fatalf("Failed to execute query: %v", err)
		}
		defer rows.Close()

		// simple check to see if any rows were returned
		if !rows.Next() {
			t.Fatalf("Query returned no rows.")
		}

		t.Log("Database connection and query test passed. Rows exist in the test table.")
	})
}
