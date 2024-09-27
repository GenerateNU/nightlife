package health

import (
	"log"
	"net/http"
	"testing"
)

func TestService_GetHealth(t *testing.T) {

	t.Run("GetHealth", func(t *testing.T) {

		resp, err := http.Get("http://localhost:8080/health")
		if err != nil {
			log.Fatalln(err)
		}

		if err != nil {
			t.Errorf("expected no error, got %v", err)
		}

		if resp.StatusCode != http.StatusOK {
			t.Errorf("expected status 200, got %d", resp.StatusCode)
		}

	})
}
