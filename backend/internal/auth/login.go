package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/GenerateNU/nightlife/internal/config"
	"io"
	"net/http"
)

// SignInResponse TODO: better design for repose struct
type SignInResponse struct {
	AccessToken  string      `json:"access_token"`
	TokenType    string      `json:"token_type"`
	RefreshToken string      `json:"refresh_token"`
	ExpiresIn    int         `json:"expires_in"`
	User         interface{} `json:"user"`
	Error        interface{} `json:"error"`
}

func GetAuthToken(cfg *config.Supabase, email string, password string) (string, error) {

	// Set your Supabase project details
	supabaseURL := cfg.URL
	apiKey := cfg.Key

	// Construct the request payload
	payload := map[string]string{
		"email":    email,
		"password": password,
	}

	// Convert payload to JSON
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("failed to marshal payload: %v", err)
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", fmt.Sprintf("%s/auth/v1/token?grant_type=password", supabaseURL), bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create HTTP request: %v", err)
	}

	// Set headers
	req.Header.Set("apikey", apiKey)
	req.Header.Set("Content-Type", "application/json")

	// Make the HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to make HTTP request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %v", err)
	}

	// Check if the response was successful
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("error: status code %d, body: %s", resp.StatusCode, body)
	}

	// Parse the response JSON
	var signInResp SignInResponse
	err = json.Unmarshal(body, &signInResp)
	if err != nil {
		return "", fmt.Errorf("failed to unmarshal response: %v", err)
	}

	// Check for errors in the response
	if signInResp.Error != nil {
		return "", fmt.Errorf("error in response: %v", signInResp.Error)
	}

	// Return the access token
	return signInResp.AccessToken, nil
}
