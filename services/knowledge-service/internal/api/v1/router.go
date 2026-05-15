package v1

import (
	"nagoman/knowledge-service/internal/api/v1/handlers"
	"nagoman/knowledge-service/internal/api/v1/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(rg *gin.RouterGroup) {
	// Standard middleware
	rg.Use(middleware.GatewayAuth())
	{
		rg.GET("/categories", handlers.GetCategories)
		rg.GET("/articles", handlers.GetArticles)
		rg.GET("/articles/:id", handlers.GetArticleByID)
		
		// Quiz related (Match gateway target paths)
		rg.GET("/quiz/:id", handlers.GetQuizzesByArticle)
		rg.POST("/quiz/:id/answer", handlers.SubmitQuizAnswer)
	}
}
