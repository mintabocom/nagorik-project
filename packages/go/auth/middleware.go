// Package auth — gateway-trust ও JWT validation middleware।
package auth

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// ─── Constants & Types ──────────────────────────────────────────────────

const (
	HeaderUserID      = "X-User-Id"
	HeaderUserType    = "X-User-Type"
	HeaderForwardedBy = "X-Forwarded-By"
	GatewayIdentifier = "nagoman-api-gateway"
)

type Claims struct {
	UserID   string `json:"sub"`
	UserType string `json:"type"`
	jwt.RegisteredClaims
}

// ─── Middleware ─────────────────────────────────────────────────────────

// GatewayTrustMiddleware — গেটওয়ে থেকে আসা header trust করে।
// Backend services (Auth, Social, Org, etc.) এই middleware ব্যবহার করবে।
func GatewayTrustMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.GetHeader(HeaderForwardedBy) != GatewayIdentifier {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Direct service access not allowed. Use API Gateway.",
			})
			return
		}

		userID := c.GetHeader(HeaderUserID)
		userType := c.GetHeader(HeaderUserType)

		if userID == "" || userType == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Missing user identity from gateway",
			})
			return
		}

		c.Set("user_id", userID)
		c.Set("user_type", userType)
		c.Next()
	}
}

// JWTMiddleware — সরাসরি JWT validate করে (Gateway-তে ব্যবহৃত)।
func JWTMiddleware(secret []byte) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Authorization header missing"})
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid auth format"})
			return
		}

		claims, err := ValidateToken(secret, parts[1])
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "message": err.Error()})
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("user_type", claims.UserType)
		c.Next()
	}
}

// RequireUserType — Role-based access control (RBAC)।
func RequireUserType(allowed ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userType := GetUserType(c)
		for _, role := range allowed {
			if userType == role {
				c.Next()
				return
			}
		}
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "এই কাজ করার অনুমতি আপনার নেই",
		})
	}
}

// ─── Utilities ──────────────────────────────────────────────────────────

func GenerateToken(secret []byte, userID, userType string, expiry time.Duration) (string, error) {
	claims := Claims{
		UserID:   userID,
		UserType: userType,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   userID,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "nagoman-auth",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secret)
}

func ValidateToken(secret []byte, tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return secret, nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("invalid or expired token")
	}
	claims, ok := token.Claims.(*Claims)
	if !ok {
		return nil, errors.New("invalid token claims")
	}
	return claims, nil
}

func GetUserID(c *gin.Context) string {
	v, _ := c.Get("user_id")
	s, _ := v.(string)
	return s
}

func GetUserType(c *gin.Context) string {
	v, _ := c.Get("user_type")
	s, _ := v.(string)
	return s
}

