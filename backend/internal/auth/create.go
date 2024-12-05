package auth

import (
	"context"
	"fmt"

	"github.com/nedpals/supabase-go"
)


type SignUpService struct {
	supabaseURL string
	supabaseAPIKey string
}


func (service *SignUpService) CreateUser(email, password string) error {
	client := supabase.CreateClient(service.supabaseURL, service.supabaseURL)

	var credentials supabase.UserCredentials

	credentials.Email = email
	credentials.Password = password

	// Create a new user
	_, err := client.Auth.SignUp(context.Background(), credentials)
	return err
}

