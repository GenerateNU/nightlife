package friendship

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/GenerateNU/nightlife/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Mock Service structure
type MockStore struct {
	// Add fields for your mocked functions
	CreateFriendshipFn         func(ctx context.Context, friendship models.Friendship) error
	CreatePreferencesFn        func(ctx context.Context, preferences models.Preferences) error
	UpdateProfilePreferencesFn func(ctx context.Context, userID uuid.UUID, pref1, pref2, pref3, pref4 string) error
	DeleteAccountFn            func(ctx context.Context, userID uuid.UUID) error
	RemoveFriendFn             func(ctx context.Context, userID uuid.UUID, friendID string) error
	GetProfileByColumnFn       func(ctx context.Context, column, value string) (models.Profile, error)
	GetAllUsersFn              func(ctx context.Context) ([]models.Profile, error)
	GetAllUserRatingsFn        func(ctx context.Context, userID uuid.UUID) ([]models.UserRating, error)
	DeleteVenueFn              func(ctx context.Context, venueID uuid.UUID) error
	DeleteReviewForVenueFn     func(ctx context.Context, reviewID int8) error
	GetAllVenueRatingsFn       func(ctx context.Context, venueID uuid.UUID) ([]models.VenueRatings, error)
	GetAllTestsFn              func(ctx context.Context) ([]models.Test, error)
}

// Implement all the Store interface methods for the mock

// Implement the CreateFriendship method for the MockStore
func (m *MockStore) CreateFriendship(ctx context.Context, friendship models.Friendship) error {
	if m.CreateFriendshipFn != nil {
		return m.CreateFriendshipFn(ctx, friendship)
	}
	return nil
}

// Implement the CreatePreferences method for the MockStore
func (m *MockStore) CreatePreferences(ctx context.Context, preferences models.Preferences) error {
	if m.CreatePreferencesFn != nil {
		return m.CreatePreferencesFn(ctx, preferences)
	}
	return nil
}

// Implement the UpdateProfilePreferences method for the MockStore
func (m *MockStore) UpdateProfilePreferences(ctx context.Context, userID uuid.UUID, pref1, pref2, pref3, pref4 string) error {
	if m.UpdateProfilePreferencesFn != nil {
		return m.UpdateProfilePreferencesFn(ctx, userID, pref1, pref2, pref3, pref4)
	}
	return nil
}

// Implement the DeleteAccount method for the MockStore
func (m *MockStore) DeleteAccount(ctx context.Context, userID uuid.UUID) error {
	if m.DeleteAccountFn != nil {
		return m.DeleteAccountFn(ctx, userID)
	}
	return nil
}

// Implement the RemoveFriend method for the MockStore
func (m *MockStore) RemoveFriend(ctx context.Context, userID uuid.UUID, friendID string) error {
	if m.RemoveFriendFn != nil {
		return m.RemoveFriendFn(ctx, userID, friendID)
	}
	return nil
}

// Implement the GetProfileByColumn method for the MockStore
func (m *MockStore) GetProfileByColumn(ctx context.Context, column, value string) (models.Profile, error) {
	if m.GetProfileByColumnFn != nil {
		return m.GetProfileByColumnFn(ctx, column, value)
	}
	return models.Profile{}, nil
}

// Implement the GetAllUsers method for the MockStore
func (m *MockStore) GetAllUsers(ctx context.Context) ([]models.Profile, error) {
	if m.GetAllUsersFn != nil {
		return m.GetAllUsersFn(ctx)
	}
	return nil, nil
}

// Implement the GetAllUserRatings method for the MockStore
func (m *MockStore) GetAllUserRatings(ctx context.Context, userID uuid.UUID) ([]models.UserRating, error) {
	if m.GetAllUserRatingsFn != nil {
		return m.GetAllUserRatingsFn(ctx, userID)
	}
	return nil, nil
}

// Implement the DeleteVenue method for the MockStore
func (m *MockStore) DeleteVenue(ctx context.Context, venueID uuid.UUID) error {
	if m.DeleteVenueFn != nil {
		return m.DeleteVenueFn(ctx, venueID)
	}
	return nil
}

// Implement the DeleteReviewForVenue method for the MockStore
func (m *MockStore) DeleteReviewForVenue(ctx context.Context, reviewID int8) error {
	if m.DeleteReviewForVenueFn != nil {
		return m.DeleteReviewForVenueFn(ctx, reviewID)
	}
	return nil
}

// Implement the GetAllVenueRatings method for the MockStore
func (m *MockStore) GetAllVenueRatings(ctx context.Context, venueID uuid.UUID) ([]models.VenueRatings, error) {
	if m.GetAllVenueRatingsFn != nil {
		return m.GetAllVenueRatingsFn(ctx, venueID)
	}
	return nil, nil
}

// Implement the GetAllTests method for the MockStore
func (m *MockStore) GetAllTests(ctx context.Context) ([]models.Test, error) {
	if m.GetAllTestsFn != nil {
		return m.GetAllTestsFn(ctx)
	}
	return nil, nil
}

// Implement the Close method for the MockStore to satisfy the storage.Storage interface
func (m *MockStore) Close() {

}

// Test for the POST endpoint CreateFriendship
func TestCreateFriendship(t *testing.T) {
	// Create a new Fiber app
	app := fiber.New()

	// Set up the mock store
	mockStore := &MockStore{}

	// Set up the service with the mock store
	service := &Service{
		store: mockStore,
	}

	// Add the route to Fiber
	app.Post("/add-friend", service.CreateFriendship)

	// Define the test cases
	tests := []struct {
		name           string
		inputJSON      string
		mockResponse   error
		expectedStatus int
		expectedBody   string
	}{
		{
			name:           "successful creation",
			inputJSON:      `{"user_id1": "00000000-0000-0000-0000-000000000001", "user_id2": "00000000-0000-0000-0000-000000000002"}`,
			mockResponse:   nil,
			expectedStatus: fiber.StatusCreated,
			expectedBody:   `{"user_id1":"00000000-0000-0000-0000-000000000001","user_id2":"00000000-0000-0000-0000-000000000002"}`,
		},
		{
			name:           "invalid JSON body",
			inputJSON:      `{"invalid_json"}`,
			mockResponse:   nil,
			expectedStatus: fiber.StatusBadRequest,
			expectedBody:   `{"error":"Cannot parse JSON"}`,
		},
		{
			name:           "store error",
			inputJSON:      `{"user_id1": "00000000-0000-0000-0000-000000000001", "user_id2": "00000000-0000-0000-0000-000000000002"}`,
			mockResponse:   errors.New("db error"),
			expectedStatus: fiber.StatusInternalServerError,
			expectedBody:   `{"error":"Failed to create friendship"}`,
		},
	}

	// Iterate over the test cases
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Mock the CreateFriendship function behavior based on the test case
			mockStore.CreateFriendshipFn = func(_ context.Context, _ models.Friendship) error {
				return tt.mockResponse
			}

			// Create the HTTP request
			req := httptest.NewRequest(http.MethodPost, "/add-friend", bytes.NewBuffer([]byte(tt.inputJSON)))
			req.Header.Set("Content-Type", "application/json")

			// Test the request using Fiber's app.Test() method
			resp, err := app.Test(req, -1)
			if err != nil {
				t.Fatalf("Error making the request: %v", err)
			}

			// Check the status code
			if resp.StatusCode != tt.expectedStatus {
				t.Errorf("expected status %d, got %d", tt.expectedStatus, resp.StatusCode)
			}

			// Check the response body
			if tt.expectedBody != "" {
				var response map[string]interface{}
				if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
					t.Fatalf("Error unmarshalling response: %v", err)
				}

				// Convert the expected response from string to a map for comparison
				expectedResponse := make(map[string]interface{})
				if err := json.Unmarshal([]byte(tt.expectedBody), &expectedResponse); err != nil {
					t.Fatalf("Error unmarshalling expected body: %v", err)
				}

				// Compare the actual response to the expected one
				for key, value := range expectedResponse {
					if response[key] != value {
						t.Errorf("expected %v for key %v, got %v", value, key, response[key])
					}
				}
			}
		})
	}
}
