package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// RequireRole — JWT এর user_type check করে।
// Valid values: "citizen", "member", "representative"
//
// উদাহরণ:
//   userApp.Use(RequireRole("citizen"))   → শুধু citizen access করতে পারবে
//   memberApp.Use(RequireRole("member"))  → শুধু member access করতে পারবে
//
// JWTMiddleware আগে run হতে হবে — এটা context এ "user_type" expect করে।
func RequireRole(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userType, exists := c.Get("user_type")
		if !exists {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "User type not found in token",
				"data":    nil,
			})
			return
		}

		userTypeStr, ok := userType.(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "Invalid user type",
				"data":    nil,
			})
			return
		}

		// Allowed list এর সাথে match করা
		for _, role := range allowedRoles {
			if userTypeStr == role {
				c.Next()
				return
			}
		}

		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "এই endpoint access করার অনুমতি নেই",
			"data":    nil,
		})
	}
}
