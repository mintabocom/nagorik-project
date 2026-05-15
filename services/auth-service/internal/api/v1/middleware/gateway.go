// Package middleware — gateway-trust middleware।
// Reference: D:\NagoMan\libs\go\auth\middleware.go
package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GatewayAuth — গেটওয়ে থেকে আসা X-User-Id ও X-User-Type header trust করে।
// Direct service access (gateway bypass) blocked।
func GatewayAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		forwardedBy := c.GetHeader("X-Forwarded-By")
		if forwardedBy != "nagoman-api-gateway" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Direct service access not allowed. Use API Gateway.",
				"data":    nil,
			})
			return
		}

		userID := c.GetHeader("X-User-Id")
		if userID == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Missing user identification",
				"data":    nil,
			})
			return
		}

		userType := c.GetHeader("X-User-Type")
		if userType == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Missing user type",
				"data":    nil,
			})
			return
		}

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

// GetInjectedUserType — register endpoint এ gateway forced user_type
// (e.g. /api/v1/user/register → user_type=citizen even if body says otherwise)
func GetInjectedUserType(c *gin.Context) string {
	return c.GetHeader("X-Gateway-Inject-User-Type")
}
