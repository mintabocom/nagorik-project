package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GatewayAuth — গেটওয়ে থেকে আসা X-User-Id ও X-User-Type header trust করে।
func GatewayAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		forwardedBy := c.GetHeader("X-Forwarded-By")
		if forwardedBy != "nagoman-api-gateway" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Direct service access not allowed. Use API Gateway.",
			})
			return
		}

		userID := c.GetHeader("X-User-Id")
		if userID == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Missing user identification",
			})
			return
		}

		userType := c.GetHeader("X-User-Type")
		c.Set("user_id", userID)
		c.Set("user_type", userType)
		c.Next()
	}
}

// GetUserID — context থেকে user_id (uuid string) extract
func GetUserID(c *gin.Context) string {
	v, exists := c.Get("user_id")
	if !exists {
		return ""
	}
	s, _ := v.(string)
	return s
}

// GetUserType — context থেকে user_type extract
func GetUserType(c *gin.Context) string {
	v, exists := c.Get("user_type")
	if !exists {
		return ""
	}
	s, _ := v.(string)
	return s
}
