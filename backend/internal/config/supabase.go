package config

type Supabase struct {
	URL       string `env:"URL"`
	Key       string `env:"ANON_KEY"`
	JWTSecret string `env:"JWT_SECRET"`
}
