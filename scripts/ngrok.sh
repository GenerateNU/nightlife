#!/bin/bash
source .env
echo "EXPO_PUBLIC_API_DOMAIN is: $EXPO_PUBLIC_API_DOMAIN"

# Run ngrok with the loaded environment variable
cd backend || exit
ngrok http --domain="$EXPO_PUBLIC_API_DOMAIN" 8080
