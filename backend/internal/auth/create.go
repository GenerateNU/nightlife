package auth

import (
	"context"

	"github.com/nedpals/supabase-go"
)

type SignUpService struct {
    SupabaseURL string
    SupabaseAPIKey string
}


func (service *SignUpService) CreateUser(email, password string) error {
    client := supabase.CreateClient(service.SupabaseURL, service.SupabaseAPIKey)
    var credentials supabase.UserCredentials
    credentials.Email = email
    credentials.Password = password
    // Create a new user
    _, err := client.Auth.SignUp(context.Background(), credentials)
    return err
}