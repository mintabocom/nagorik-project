package main

import (
	"log"
	"net/http"
	"os"

	"nagoman/social-service/internal/api/v1"
	"nagoman/social-service/cmd/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	defer db.Pool.Close()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"app":     "NagoMan Social Service",
			"version": "2.0.0",
		})
	})
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	apiV1 := r.Group("/api/v1")
	v1.RegisterRoutes(apiV1)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	log.Printf("[SOCIAL] Social Service running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("[SOCIAL] Failed to start: %v", err)
	}
}
