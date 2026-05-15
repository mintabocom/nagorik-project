package middleware

import (
	"net/http"
	"strings"

	"nagoman/api-gateway/internal/config"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// JWTMiddleware HTTP request এ Authorization header থেকে JWT token validate করে।
// Valid হলে user_id ও user_type Gin context এ set করে — পরবর্তী handler/proxy
// এই value backend service এ X-User-Id, X-User-Type header হিসেবে forward করতে পারবে।
//
// Token format: "Authorization: Bearer <jwt_token>"
// Token claims (auth-service compatible):
//   - sub:  user UUID
//   - type: citizen | member | representative
//   - exp:  expiry unix timestamp
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			unauthorized(c, "Authorization header missing")
			return
		}

		// "Bearer <token>" format থেকে token extract
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			unauthorized(c, "Invalid Authorization header format. Expected: Bearer <token>")
			return
		}
		tokenString := parts[1]

		// JWT parse + signature verify (HS256 + shared secret)
		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(config.JWTSecret), nil
		})

		if err != nil || !token.Valid {
			unauthorized(c, "Invalid or expired token")
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			unauthorized(c, "Invalid token claims")
			return
		}

		// sub claim → user_id
		userID, _ := claims["sub"].(string)
		if userID == "" {
			unauthorized(c, "Token missing user id (sub)")
			return
		}

		// type claim → user_type
		userType, _ := claims["type"].(string)
		if userType == "" {
			unauthorized(c, "Token missing user type")
			return
		}

		// Context এ set — proxy layer header হিসেবে forward করবে
		c.Set("user_id", userID)
		c.Set("user_type", userType)

		c.Next()
	}
}

// unauthorized helper — 401 JSON response
func unauthorized(c *gin.Context, message string) {
	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
		"success": false,
		"message": message,
		"data":    nil,
	})
}
