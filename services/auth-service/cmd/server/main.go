package main

import (
	"log"
	"net/http"
	"os"

	"nagoman/auth-service/internal/api/v1"
	"nagoman/auth-service/cmd/db"


	"github.com/gin-gonic/gin"
)

func main() {
	// ১. Database connect
	db.Connect()
	defer db.Pool.Close()

	// ২. Gin init
	r := gin.Default()

	// Health check
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"app":     "NagoMan Auth Service",
			"version": "2.0.0",
		})
	})
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// API v1
	apiV1 := r.Group("/api/v1")
	v1.RegisterRoutes(apiV1)

	// DEBUG: Print all registered routes
	for _, route := range r.Routes() {
		log.Printf("[DEBUG] Route: %s %s", route.Method, route.Path)
	}


	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("[AUTH] Auth Service running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("[AUTH] Failed to start: %v", err)
	}
}
