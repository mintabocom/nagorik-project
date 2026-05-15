package v1

import (
	"nagoman/geo-service/internal/api/v1/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(rg *gin.RouterGroup) {
	geo := rg.Group("/geo")
	{
		geo.GET("/divisions", handlers.GetDivisions)
		geo.GET("/districts", handlers.GetDistricts)
		geo.GET("/upazilas", handlers.GetUpazilas)
		geo.GET("/unions", handlers.GetUnions)
		geo.GET("/wards", handlers.GetWards)
		geo.GET("/city-corporations", handlers.GetCityCorporations)
		geo.GET("/municipalities", handlers.GetMunicipalities)
		geo.GET("/constituencies", handlers.GetConstituencies)
	}
}
