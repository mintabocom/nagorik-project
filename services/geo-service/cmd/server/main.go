package main

import (
	"log"
	"net/http"
	"os"

	"nagoman/geo-service/internal/api/v1"
	"nagoman/geo-service/cmd/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	defer db.Pool.Close()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"app":     "NagoMan Geo Service",
			"version": "1.0.0",
		})
	})
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	apiV1 := r.Group("/api/v1")
	v1.RegisterRoutes(apiV1)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8088" // Unique port for Geo Service
	}

	log.Printf("[GEO] Geo Service running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("[GEO] Failed to start: %v", err)
	}
}
