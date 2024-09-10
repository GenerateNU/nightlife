package db

import (
	"testing"
)
func TestDBConnection(t *testing.T) {
	t.Run("TestConnectSupabaseDB", func(t *testing.T) {
		err := ConnectSupabaseDB()
		if err != nil {
			t.Fatalf("Failed to connect to Supabase DB: %v", err)
		}
	})
}