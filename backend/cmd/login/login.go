package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"strings"

	"github.com/GenerateNU/nightlife/internal/config"
	"github.com/nedpals/supabase-go"
)

func main() {

	ips, err := net.LookupIP("nydgnuqtgjljprotsccz.supabase.co")
	if err != nil {
		fmt.Printf("Failed to resolve hostname: %v\n", err)
	} else {
		fmt.Printf("Supabase IPs: %v\n", ips)
	}

	cfg, err := config.LoadConfig("../../../.env")

	if err != nil {
		log.Fatalf("Environment variables could not be loaded")
	}

	fmt.Printf("Supabase URL: %s\n", cfg.SupabaseURL)
	fmt.Printf("Supabase Key: %s\n", cfg.SupabaseKey)

	flag.Parse()

	args := flag.Args()
	if len(args) < 2 || args[0] == "" || args[1] == "" {
		fmt.Println(len(args))
		log.Fatalf("include command line arguments correctly: \n %s", strings.Join(args, ""))
	}

	email := args[0]
	password := args[1]

	client := supabase.CreateClient(cfg.SupabaseURL, cfg.SupabaseKey)

	details, err := client.Auth.SignIn(context.Background(), supabase.UserCredentials{
		Email:    email,
		Password: password,
		Data:     nil,
	})

	if err != nil {
		fmt.Println(err)
		log.Fatalf("Sign in failed")
	}

	fmt.Printf("Access Token: %s", details.AccessToken)

}
