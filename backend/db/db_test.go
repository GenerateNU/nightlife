package db

import (
	"testing"
)

func TestDBConnection(t *testing.T) {
	t.Run("TestConnectSupabaseDB", func(t *testing.T) {
		// This will internally attempt to connect to the database and print success or log fatal errors.
		ConnectSupabaseDB()

		// If ConnectSupabaseDB runs without triggering log.Fatalf, the test will pass.
		// Since log.Fatalf exits the program, any failure will automatically fail the test.
	})
}
