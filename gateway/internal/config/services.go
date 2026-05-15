package config

import (
	"log"
	"os"
)

// Services স্ট্রাকচারে সব backend microservice এর URL থাকবে।
// Environment variable থেকে load হবে — production-এ Docker/K8s থেকে set করা যাবে।
type Services struct {
	Auth         string // auth-service: register, login, profile, verifications
	Social       string // social-service: posts, comments, reactions, follows
	Org          string // org-service: committees, meetings, audits, subscriptions
	Reports      string // reports-service: civic reports, projects, escalations
	Election     string // election-service: mandates, parties, election results
	Knowledge    string // knowledge-service: articles, FAQs, tips
	Notification string // notification-service: push, email, SMS
	Realtime     string // realtime-service (Rust): WebSocket chat, calls
	Geo          string // geo-service: divisions, districts, upazilas, unions
}

// JWT secret — auth-service এর সাথে exact same হতে হবে।
// Default value auth-service utils/auth.go এর সাথে match করছে।
var JWTSecret string

// GatewayPort — gateway নিজে কোন port এ run করবে
var GatewayPort string

// LoadServices ফাংশনটি environment variable থেকে service URL load করে।
// Default value docker-compose.yml এর service name অনুযায়ী।
func LoadServices() *Services {
	s := &Services{
		Auth:         getEnv("AUTH_SERVICE_URL", "http://auth-service:8081"),
		Social:       getEnv("SOCIAL_SERVICE_URL", "http://social-service:8082"),
		Org:          getEnv("ORG_SERVICE_URL", "http://org-service:8083"),
		Reports:      getEnv("REPORTS_SERVICE_URL", "http://reports-service:8084"),
		Election:     getEnv("ELECTION_SERVICE_URL", "http://election-service:8085"),
		Knowledge:    getEnv("KNOWLEDGE_SERVICE_URL", "http://knowledge-service:8086"),
		Notification: getEnv("NOTIFICATION_SERVICE_URL", "http://notification-service:8087"),
		Realtime:     getEnv("REALTIME_SERVICE_URL", "http://realtime-service:8088"),
		Geo:          getEnv("GEO_SERVICE_URL", "http://geo-service:8089"),
	}

	JWTSecret = getEnv("JWT_SECRET", "your_super_secret_key_for_nagoman")
	GatewayPort = getEnv("GATEWAY_PORT", "8080")

	log.Printf("[Config] Services loaded: auth=%s social=%s org=%s", s.Auth, s.Social, s.Org)
	return s
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
