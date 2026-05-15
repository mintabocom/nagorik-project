package main

import (
	"log"
	"net/http"
	"os"

	"nagoman/knowledge-service/cmd/db"
	"nagoman/knowledge-service/internal/api/v1"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB
	db.Connect()
	defer db.Pool.Close()

	r := gin.Default()

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Register API v1 routes
	apiV1 := r.Group("/api/v1")
	v1.RegisterRoutes(apiV1)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8086"
	}

	log.Printf("[KNOWLEDGE] Knowledge Service running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
