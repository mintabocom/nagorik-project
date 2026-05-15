package v1

import (
	"nagoman/social-service/internal/api/v1/handlers"
	"nagoman/social-service/internal/api/v1/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(rg *gin.RouterGroup) {
	rg.Use(middleware.GatewayAuth())
	{
		// Feed
		rg.GET("/feed", handlers.GetFeedHandler)
		rg.GET("/feed/stories", handlers.GetStoriesHandler)

		// Posts
		posts := rg.Group("/posts")
		{
			posts.POST("", handlers.CreatePostHandler)
			posts.GET("/my", handlers.GetMyPostsHandler)
			posts.POST("/:id/react", handlers.ReactHandler)
			posts.POST("/:id/comment", handlers.AddCommentHandler)
			posts.POST("/:id/save", handlers.SavePostHandler)
		}

		// Relationships
		rg.POST("/follow/toggle", handlers.ToggleFollowHandler)
		rg.POST("/users/:id/block", handlers.BlockUserHandler)

		// Search
		rg.GET("/search", handlers.SearchHandler)
	}
}
