package main

import (
	"night-mod/db"
	"night-mod/schema/hello"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// test the database connection
	db.ConnectSupabaseDB()

	r := gin.Default()

	// add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods"},
		AllowCredentials: true,
	}))

	v1 := r.Group("/")
	{
		hello.HelloGroup(v1)
	}

	r.Run(":8080")
}
