package main

import (
	"log"
	"nagoman/org-service/cmd/db"
	"nagoman/org-service/internal/api/v1"

	"github.com/gin-gonic/gin"
)

func main() {
	// ১. ডাটাবেস কানেকশন (org_db)
	db.Connect()

	// ২. Gin ফ্রেমওয়ার্ক
	r := gin.Default()

	// API v1
	v1.RegisterRoutes(r.Group("/api/v1"))

	log.Println("Organization Service running on :8083")
	r.Run(":8083")
}

}
