package utils

import (
	"crypto/rand"
	"encoding/hex"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// JwtSecret — Environment variable থেকে load হয়।
// Production-এ JWT_SECRET অবশ্যই set করতে হবে। API Gateway এর সাথে exact same secret।
var JwtSecret []byte

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		// Default — dev এর জন্য, production এ env থেকে আসবে
		secret = "your_super_secret_key_for_nagoman"
	}
	JwtSecret = []byte(secret)
}

// HashPassword ফাংশনটি পাসওয়ার্ডকে এনক্রিপ্ট করে (bcrypt ব্যবহার করে)
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash ফাংশনটি ইউজারের পাসওয়ার্ড সঠিক কি না তা যাচাই করে
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// GenerateToken — JWT token issue (auth-service login successful হলে)
func GenerateToken(userID string, userType string) (string, error) {
	claims := jwt.MapClaims{
		"sub":  userID,
		"type": userType,
		"exp":  time.Now().Add(time.Hour * 24 * 7).Unix(), // ৭ দিন
		"iat":  time.Now().Unix(),
		"iss":  "nagoman-auth",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JwtSecret)
}

// GenerateResetToken — forgot-password reset token (random hex string)
// 6 hour expiry
func GenerateResetToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
