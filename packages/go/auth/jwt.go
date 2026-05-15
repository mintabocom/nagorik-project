// JWT utility — auth-service ই শুধু এটা use করবে।
// অন্য services সরাসরি JWT validate করে না, gateway header trust করে।
package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Claims — JWT token এর payload structure
type Claims struct {
	UserID   string `json:"sub"`
	UserType string `json:"type"`
	jwt.RegisteredClaims
}

// GenerateToken — auth-service login successful হলে token issue
func GenerateToken(secret []byte, userID, userType string, expiry time.Duration) (string, error) {
	now := time.Now()
	claims := &Claims{
		UserID:   userID,
		UserType: userType,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   userID,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(expiry)),
			Issuer:    "nagoman-auth",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  claims.UserID,
		"type": claims.UserType,
		"iat":  claims.IssuedAt.Unix(),
		"exp":  claims.ExpiresAt.Unix(),
		"iss":  claims.Issuer,
	})

	return token.SignedString(secret)
}

// ValidateToken — JWT verify (signature + expiry)। Direct API access এ use।
// Gateway flow এ এটা লাগবে না (gateway নিজে validate করে header set করে)।
func ValidateToken(secret []byte, tokenString string) (*Claims, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return secret, nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("invalid or expired token")
	}

	mapClaims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("invalid claims")
	}

	userID, _ := mapClaims["sub"].(string)
	userType, _ := mapClaims["type"].(string)

	if userID == "" || userType == "" {
		return nil, errors.New("missing required claims")
	}

	return &Claims{UserID: userID, UserType: userType}, nil
}
