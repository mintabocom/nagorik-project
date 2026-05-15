package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

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
		// Knowledge service might allow public access to some routes, 
		// but let's keep the middleware standard.
		c.Set("user_id", userID)
		c.Set("user_type", c.GetHeader("X-User-Type"))
		c.Next()
	}
}

func GetUserID(c *gin.Context) string {
	v, exists := c.Get("user_id")
	if !exists {
		return ""
	}
	s, _ := v.(string)
	return s
}
