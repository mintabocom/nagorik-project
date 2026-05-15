package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Health — gateway নিজে alive কিনা check
func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "nagoman-api-gateway",
		"version": "1.0.0",
	})
}

// Index — root endpoint, gateway info
func Index(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"app":     "NagoMan API Gateway",
		"version": "1.0.0",
		"docs":    "https://docs.nagoman.com",
		"apps": gin.H{
			"user":      "/api/v1/user/*       (নাগরিক / Citizen)",
			"member":    "/api/v1/member/*     (সেবক / Member)",
			"candidate": "/api/v1/candidate/*  (জনসেবক / Representative)",
			"shared": gin.H{
				"knowledge": "/api/v1/knowledge/*",
				"chat":      "/api/v1/chat/*",
			},
		},
	})
}
