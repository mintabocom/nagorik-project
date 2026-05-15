package handlers

import (
	"context"
	"log"
	"net/http"

	"nagoman/auth-service/internal/api/v1/models"
	"nagoman/auth-service/cmd/db"
	"nagoman/auth-service/internal/api/v1/utils"

	"github.com/gin-gonic/gin"
)

// AdminLoginHandler — শুধুমাত্র admins টেবিল থেকে লগইন করাবে (Super-Admin Panel এর জন্য)
func AdminLoginHandler(c *gin.Context) {
	log.Println("[AUTH] Admin login attempt received")
	var req models.AdminLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("[AUTH] Admin login bind error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "সঠিক ইমেইল এবং পাসওয়ার্ড দিন"})
		return
	}

	var admin models.Admin
	query := `SELECT id, name, password, role, is_active FROM admins WHERE email = $1`
	
	log.Printf("[AUTH] Searching for admin with email: %s", req.Email)
	err := db.Pool.QueryRow(context.Background(), query, req.Email).Scan(
		&admin.ID, &admin.Name, &admin.Password, &admin.Role, &admin.IsActive)

	if err != nil {
		log.Printf("[AUTH] DB Search Error: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "ইমেইল বা পাসওয়ার্ড ভুল"})
		return
	}
	log.Printf("[AUTH] Admin found: %s, Role: %s, Active: %v", admin.Name, admin.Role, admin.IsActive)

	if !admin.IsActive {
		c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "আপনার অ্যাডমিন অ্যাকাউন্টটি নিষ্ক্রিয়"})
		return
	}

	if !utils.CheckPasswordHash(req.Password, admin.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "ইমেইল বা পাসওয়ার্ড ভুল"})
		return
	}

	// অ্যাডমিনের জন্য স্পেশাল টোকেন জেনারেট (role সহ)
	token, err := utils.GenerateToken(admin.ID.String(), admin.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "টোকেন তৈরি করতে সমস্যা হয়েছে"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "অ্যাডমিন লগইন সফল",
		"token":   token,
		"user": gin.H{
			"id":    admin.ID,
			"name":  admin.Name,
			"role":  admin.Role,
		},
	})
}
