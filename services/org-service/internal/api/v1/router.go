package v1

import (
	"nagoman/org-service/internal/api/v1/handlers"
	"nagoman/org-service/internal/api/v1/middleware"

	"github.com/gin-gonic/gin"
)

// RegisterRoutes — API v1 এর সব রাউট এখানে রেজিস্টার হবে
func RegisterRoutes(r *gin.RouterGroup) {
	
	// ─── Organization / Committee Endpoints ──────────────────
	// Note: Authentication middleware (middleware.GatewayAuth) can be added here if needed
	org := r.Group("/org")
	org.Use(middleware.GatewayAuth())
	{
		org.GET("/hierarchy/:id", handlers.GetHierarchyHandler)
		org.GET("/coverage",      handlers.GetCoverageHandler)
		org.POST("/committees",   handlers.CreateCommitteeHandler)
	}

	// ─── Meeting Endpoints ──────────────────────────────────
	meetings := r.Group("/meetings")
	meetings.Use(middleware.GatewayAuth())
	{
		meetings.GET("/",      handlers.ListMeetingsHandler)
		meetings.POST("/",     handlers.ScheduleMeetingHandler)
	}
}
