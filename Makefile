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
	
# Rebuild the database
.PHONY: db-rebuild
db-rebuild:
	cd backend && npx supabase start && npx supabase db reset 
	
# Run backend
.PHONY: backend-run
backend-run:
	cd backend/cmd/server && go run main.go

.PHONY: ngrok-run
ngrok-run:
	if [ -f .env ]; then \
		. .env && \
		@echo $$EXPO_PUBLIC_API_DOMAIN && \
		ngrok http --domain=$$EXPO_PUBLIC_API_DOMAIN 8080; \
	else \
		echo "No good, file not found"; \
	fi


