package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// RequestLogger প্রতিটি incoming request log করে।
// Format: [GATEWAY] METHOD PATH STATUS DURATION CLIENT_IP USER_ID
func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		method := c.Request.Method
		clientIP := c.ClientIP()

		c.Next()

		duration := time.Since(start)
		status := c.Writer.Status()

		userID, _ := c.Get("user_id")
		userIDStr := "anonymous"
		if userID != nil {
			if v, ok := userID.(string); ok && v != "" {
				userIDStr = v
			}
		}

		log.Printf("[GATEWAY] %s %s -> %d (%v) ip=%s user=%s",
			method, path, status, duration, clientIP, userIDStr)
	}
}
