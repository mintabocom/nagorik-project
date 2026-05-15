package v1

import (
	"nagoman/auth-service/internal/api/v1/handlers"
	"nagoman/auth-service/internal/api/v1/middleware"


	"github.com/gin-gonic/gin"
)

// RegisterRoutes — API v1 এর সব রাউট এখানে রেজিস্টার হবে
func RegisterRoutes(r *gin.RouterGroup) {
	// ─── Public auth endpoints ──────────────────────────────
	auth := r.Group("/auth")
	{
		auth.POST("/phone/check",     handlers.PhoneCheckHandler)
		auth.POST("/register",        handlers.RegisterHandler)
		auth.POST("/login",           handlers.LoginHandler)
		auth.POST("/forgot-password", handlers.ForgotPasswordHandler)
		auth.POST("/reset-password",  handlers.ResetPasswordHandler)
		auth.POST("/admin/login",    handlers.AdminLoginHandler)

		// Authenticated (gateway middleware required)
		authed := auth.Group("/")
		authed.Use(middleware.GatewayAuth())
		{
			authed.POST("/logout", handlers.LogoutHandler)
			authed.GET("/me",      handlers.MeHandler)
			authed.PATCH("/me",    handlers.UpdateProfileHandler)
		}
	}

	// ─── Verifications endpoints (all authenticated) ────────
	verifications := r.Group("/verifications")
	verifications.Use(middleware.GatewayAuth())
	{
		verifications.GET("/",      handlers.ListVerificationsHandler)
		verifications.POST("/",     handlers.CreateVerificationHandler)
		verifications.GET("/:id",   handlers.GetVerificationHandler)
	}
}
