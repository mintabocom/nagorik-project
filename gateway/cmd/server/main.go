package main

import (
	"log"

	"nagoman/api-gateway/internal/config"
	"nagoman/api-gateway/internal/handlers"
	"nagoman/api-gateway/internal/middleware"
	"nagoman/api-gateway/internal/proxy"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Local dev এ .env load (production-এ env variable Docker/K8s থেকে আসবে)
	_ = godotenv.Load()

	// Service URL ও JWT secret load
	services := config.LoadServices()

	r := gin.New()

	// Global middleware
	r.Use(gin.Recovery())
	r.Use(middleware.RequestLogger())
	r.Use(middleware.CORS())

	// Health & info endpoints
	r.GET("/", handlers.Index)
	r.GET("/health", handlers.Health)

	// API v1 group
	v1 := r.Group("/api/v1")

	registerUserRoutes(v1, services)
	registerMemberRoutes(v1, services)
	registerCandidateRoutes(v1, services)
	registerSuperAdminRoutes(v1, services)
	registerSharedRoutes(v1, services)

	port := ":" + config.GatewayPort
	log.Printf("[GATEWAY] NagoMan API Gateway running on %s", port)

	if err := r.Run(port); err != nil {
		log.Fatalf("[GATEWAY] Failed to start: %v", err)
	}
}

// ─── নাগরিক App (Citizen) ────────────────────────────────────────────────
// Prefix: /api/v1/user
// User type: citizen
func registerUserRoutes(v1 *gin.RouterGroup, s *config.Services) {
	g := v1.Group("/user")

	// Public — JWT লাগবে না
	g.POST("/phone/check", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/phone/check",
	}))
	g.POST("/register", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/register",
		InjectUserType: "citizen",
	}))
	g.POST("/login", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/login",
	}))
	g.POST("/forgot-password", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/forgot-password",
	}))

	// Authenticated — JWT + role: citizen
	auth := g.Group("/")
	auth.Use(middleware.JWTMiddleware())
	auth.Use(middleware.RequireRole("citizen"))
	{
		// Auth / Profile
		auth.POST("/logout", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/logout",
		}))
		auth.GET("/me", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/me",
		}))

		// Verifications
		auth.GET("/verifications", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/verifications",
		}))
		auth.POST("/verifications", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/verifications",
		}))
		auth.GET("/verifications/:id", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/verifications/{path}",
		}))

		// Feed & Social
		auth.GET("/feed", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/feed",
		}))
		auth.GET("/feed/stories", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/feed/stories",
		}))

		// Posts
		auth.GET("/posts/my", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts/my",
		}))
		auth.POST("/posts", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts",
		}))
		auth.POST("/posts/:id/react", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts/{path}/react",
		}))
		auth.POST("/posts/:id/comment", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts/{path}/comment",
		}))
		auth.POST("/posts/:id/save", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts/{path}/save",
		}))

		// Relationships
		auth.POST("/follow/toggle", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/follow/toggle",
		}))
		auth.POST("/users/:id/block", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/users/{path}/block",
		}))

		// Search
		auth.GET("/search", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/search",
		}))

		// Reports (citizen problem post)
		auth.POST("/reports", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports",
		}))
		auth.GET("/reports/my", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports/my",
		}))
		auth.POST("/reports/:id/petition", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports/{path}/petition",
		}))
	}
}

// ─── সেবক App (Member) ────────────────────────────────────────────────────
// Prefix: /api/v1/member
// User type: member
func registerMemberRoutes(v1 *gin.RouterGroup, s *config.Services) {
	g := v1.Group("/member")

	// Public
	g.POST("/phone/check", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/phone/check",
	}))
	g.POST("/register", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/register",
		InjectUserType: "member",
	}))
	g.POST("/login", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/login",
	}))
	g.POST("/forgot-password", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/forgot-password",
	}))

	// Authenticated — JWT + role: member
	auth := g.Group("/")
	auth.Use(middleware.JWTMiddleware())
	auth.Use(middleware.RequireRole("member"))
	{
		// Auth / Profile
		auth.POST("/logout", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/logout",
		}))
		auth.GET("/me", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/me",
		}))

		// Org — committees, meetings
		auth.GET("/committees", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/committees",
		}))
		auth.GET("/committees/:id", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/committees/{path}",
		}))
		auth.GET("/meetings", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/meetings",
		}))
		auth.POST("/meetings/:id/attend", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/meetings/{path}/attend",
		}))

		// Audits — secret audit submission
		auth.GET("/audits/my", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/audits/my",
		}))
		auth.POST("/audits", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/audits",
		}))

		// Subscriptions — monthly fee tracking
		auth.GET("/subscriptions", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Org, TargetPath: "/api/v1/subscriptions",
		}))

		// Reports — assigned reports & solving
		auth.GET("/reports/assigned", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports/assigned",
		}))
		auth.PATCH("/reports/:id/status", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports/{path}/status",
		}))
		auth.POST("/reports/:id/escalate", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/reports/{path}/escalate",
		}))

		// Projects (committee project management)
		auth.GET("/projects", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/projects",
		}))
		auth.POST("/projects/:id/expenses", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Reports, TargetPath: "/api/v1/projects/{path}/expenses",
		}))

		// Social (member can also use social features)
		auth.GET("/feed", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/feed",
		}))
		auth.POST("/posts", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts",
		}))
	}
}

// ─── জনসেবক App (Representative / Candidate) ──────────────────────────────
// Prefix: /api/v1/candidate
// User type: representative
func registerCandidateRoutes(v1 *gin.RouterGroup, s *config.Services) {
	g := v1.Group("/candidate")

	// Public
	g.POST("/phone/check", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/phone/check",
	}))
	g.POST("/register", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/register",
		InjectUserType: "representative",
	}))
	g.POST("/login", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/login",
	}))
	g.POST("/forgot-password", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/forgot-password",
	}))

	// Authenticated — JWT + role: representative
	auth := g.Group("/")
	auth.Use(middleware.JWTMiddleware())
	auth.Use(middleware.RequireRole("representative"))
	{
		// Auth / Profile
		auth.POST("/logout", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/logout",
		}))
		auth.GET("/me", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Auth, TargetPath: "/api/v1/auth/me",
		}))

		// Mandates — election term tracking
		auth.GET("/mandates", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/mandates",
		}))
		auth.POST("/mandates", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/mandates",
		}))

		// Promises — CRUD
		auth.GET("/promises", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/promises",
		}))
		auth.POST("/promises", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/promises",
		}))
		auth.PATCH("/promises/:id", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/promises/{path}",
		}))

		// Election results
		auth.GET("/election-results", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Election, TargetPath: "/api/v1/election-results",
		}))

		// Social
		auth.GET("/feed", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/feed",
		}))
		auth.POST("/posts", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Social, TargetPath: "/api/v1/posts",
		}))
	}
}

// ─── Shared (সব app এ ব্যবহার হয়) ──────────────────────────────────────────
// Prefix: /api/v1/knowledge, /api/v1/chat, /api/v1/notifications
func registerSharedRoutes(v1 *gin.RouterGroup, s *config.Services) {
	// Knowledge — যেকোনো logged-in user access করতে পারে
	knowledge := v1.Group("/knowledge")
	knowledge.Use(middleware.JWTMiddleware())
	{
		knowledge.GET("/articles", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Knowledge, TargetPath: "/api/v1/articles",
		}))
		knowledge.GET("/articles/:id", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Knowledge, TargetPath: "/api/v1/articles/{path}",
		}))
		knowledge.GET("/categories", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Knowledge, TargetPath: "/api/v1/categories",
		}))
		knowledge.GET("/quiz/:id", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Knowledge, TargetPath: "/api/v1/quiz/{path}",
		}))
		knowledge.POST("/quiz/:id/answer", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Knowledge, TargetPath: "/api/v1/quiz/{path}/answer",
		}))
	}

	// Chat — realtime service (Rust + WebSocket)
	chat := v1.Group("/chat")
	chat.Use(middleware.JWTMiddleware())
	{
		// HTTP endpoints (chat history, etc.)
		chat.GET("/messages", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Realtime, TargetPath: "/api/v1/messages",
		}))
		chat.GET("/groups", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Realtime, TargetPath: "/api/v1/groups",
		}))

		// WebSocket upgrade — protocol upgrade handle
		chat.GET("/ws", proxy.WebSocket(s.Realtime, "/api/v1/ws"))
	}

	// Notifications
	notif := v1.Group("/notifications")
	notif.Use(middleware.JWTMiddleware())
	{
		notif.GET("/", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Notification, TargetPath: "/api/v1/notifications",
		}))
		notif.PATCH("/:id/read", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Notification, TargetPath: "/api/v1/notifications/{path}/read",
		}))
		notif.POST("/fcm-token", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Notification, TargetPath: "/api/v1/fcm-token",
		}))
	}

	// Geo — Public
	geo := v1.Group("/geo")
	{
		geo.GET("/divisions", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/divisions",
		}))
		geo.GET("/districts", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/districts",
		}))
		geo.GET("/upazilas", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/upazilas",
		}))
		geo.GET("/unions", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/unions",
		}))
		geo.GET("/wards", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/wards",
		}))
		geo.GET("/city-corporations", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/city-corporations",
		}))
		geo.GET("/municipalities", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/municipalities",
		}))
		geo.GET("/constituencies", proxy.Forward(proxy.ProxyOptions{
			TargetBase: s.Geo, TargetPath: "/api/v1/geo/constituencies",
		}))
	}
}

// ─── সুপার-অ্যাডমিন প্যানেল (Super Admin) ──────────────────────────────────
// Prefix: /api/v1/admin
func registerSuperAdminRoutes(v1 *gin.RouterGroup, s *config.Services) {
	g := v1.Group("/admin")

	// Public — Admin Login
	g.POST("/login", proxy.Forward(proxy.ProxyOptions{
		TargetBase: s.Auth, TargetPath: "/api/v1/auth/admin/login",
	}))

	// Authenticated — JWT + role: super_admin
	auth := g.Group("/")
	auth.Use(middleware.JWTMiddleware())
	auth.Use(middleware.RequireRole("super_admin"))
	{
		// এখানে সুপার-অ্যাডমিন এর বাকি কাজগুলো থাকবে
		auth.GET("/stats", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Welcome Master! System statistics loading..."})
		})
	}
}

