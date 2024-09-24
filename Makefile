include .env

# Installing frontend dependencies
.PHONY: frontend-dep
frontend-dep:
	cd frontend && npm install

# running the frontend
.PHONY: frontend-run
frontend-run:
	cd frontend && npm start

# Lint the frontend source code
.PHONY: frontend-lint
frontend-lint:
	cd frontend && npx eslint

# Installing backend dependencies
.PHONY: backend-dep
backend-dep:
	cd backend/cmd/server && go get .

# Lint backend source code
.PHONY: backend-lint
backend-lint:
	cd backend && golangci-lint run

# Format backend source code
.PHONY: backend-format
backend-format:
	cd backend && go fmt ./...

# Run backend tests
.PHONY: backend-test
backend-test:
	cd backend && go test ./...

# Build the db
.PHONY: db-run
db-run:
	cd backend && npx supabase start

# Stop the db
.PHONY: db-stop
db-stop:
	cd backend && npx supabase stop

# Dump the db
.PHONY: db-dump
db-dump:
	cd backend && npx supabase db dump --data-only
	
# Rebuild the database
.PHONY: db-rebuild
db-rebuild:
	cd backend && npx supabase start && npx supabase db reset 
	
# Run backend
.PHONY: backend-run
backend-run:
	cd backend/cmd/server && go run main.go

# Build backend
.PHONY: backend-build
backend-run:
	cd backend && go -o bin/nightlife cmd/server/main.go

# convert the backend link to an ngrok link
.PHONY: backend-ngrok
backend-ngrok:
	@echo ${EXPO_PUBLIC_API_DOMAIN}
	cd backend && ngrok http --domain=${EXPO_PUBLIC_API_DOMAIN} 8080
