package handlers

import (
	"context"
	"net/http"
	"strconv"

	"nagoman/geo-service/cmd/db"
	"nagoman/geo-service/internal/api/v1/models"

	"github.com/gin-gonic/gin"
)

func GetDivisions(c *gin.Context) {
	rows, err := db.Pool.Query(context.Background(), "SELECT id, name, name_bn, url FROM divisions ORDER BY name ASC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var divisions []models.Division
	for rows.Next() {
		var d models.Division
		if err := rows.Scan(&d.ID, &d.Name, &d.NameBn, &d.URL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		divisions = append(divisions, d)
	}

	c.JSON(http.StatusOK, divisions)
}

func GetDistricts(c *gin.Context) {
	divisionIDStr := c.Query("division_id")
	var query string
	var args []interface{}

	if divisionIDStr != "" {
		query = "SELECT id, division_id, name, name_bn, lat, lon, url FROM districts WHERE division_id = $1 ORDER BY name ASC"
		divisionID, _ := strconv.Atoi(divisionIDStr)
		args = append(args, divisionID)
	} else {
		query = "SELECT id, division_id, name, name_bn, lat, lon, url FROM districts ORDER BY name ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var districts []models.District
	for rows.Next() {
		var d models.District
		if err := rows.Scan(&d.ID, &d.DivisionID, &d.Name, &d.NameBn, &d.Lat, &d.Lon, &d.URL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		districts = append(districts, d)
	}

	c.JSON(http.StatusOK, districts)
}

func GetUpazilas(c *gin.Context) {
	districtIDStr := c.Query("district_id")
	var query string
	var args []interface{}

	if districtIDStr != "" {
		query = "SELECT id, district_id, name, name_bn, url FROM upazilas WHERE district_id = $1 ORDER BY name ASC"
		districtID, _ := strconv.Atoi(districtIDStr)
		args = append(args, districtID)
	} else {
		query = "SELECT id, district_id, name, name_bn, url FROM upazilas ORDER BY name ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var upazilas []models.Upazila
	for rows.Next() {
		var u models.Upazila
		if err := rows.Scan(&u.ID, &u.DistrictID, &u.Name, &u.NameBn, &u.URL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		upazilas = append(upazilas, u)
	}

	c.JSON(http.StatusOK, upazilas)
}

func GetUnions(c *gin.Context) {
	upazilaIDStr := c.Query("upazila_id")
	var query string
	var args []interface{}

	if upazilaIDStr != "" {
		query = "SELECT id, upazila_id, name, name_bn, url FROM unions WHERE upazila_id = $1 ORDER BY name ASC"
		upazilaID, _ := strconv.Atoi(upazilaIDStr)
		args = append(args, upazilaID)
	} else {
		query = "SELECT id, upazila_id, name, name_bn, url FROM unions ORDER BY name ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var unions []models.Union
	for rows.Next() {
		var u models.Union
		if err := rows.Scan(&u.ID, &u.UpazilaID, &u.Name, &u.NameBn, &u.URL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		unions = append(unions, u)
	}

	c.JSON(http.StatusOK, unions)
}

func GetCityCorporations(c *gin.Context) {
	districtIDStr := c.Query("district_id")
	var query string
	var args []interface{}

	if districtIDStr != "" {
		query = "SELECT id, district_id, name, name_bn FROM city_corporations WHERE district_id = $1 ORDER BY name ASC"
		districtID, _ := strconv.Atoi(districtIDStr)
		args = append(args, districtID)
	} else {
		query = "SELECT id, district_id, name, name_bn FROM city_corporations ORDER BY name ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var corps []models.CityCorporation
	for rows.Next() {
		var d models.CityCorporation
		if err := rows.Scan(&d.ID, &d.DistrictID, &d.Name, &d.NameBn); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		corps = append(corps, d)
	}

	c.JSON(http.StatusOK, corps)
}

func GetMunicipalities(c *gin.Context) {
	upazilaIDStr := c.Query("upazila_id")
	var query string
	var args []interface{}

	if upazilaIDStr != "" {
		query = "SELECT id, upazila_id, name, name_bn FROM municipalities WHERE upazila_id = $1 ORDER BY name ASC"
		upazilaID, _ := strconv.Atoi(upazilaIDStr)
		args = append(args, upazilaID)
	} else {
		query = "SELECT id, upazila_id, name, name_bn FROM municipalities ORDER BY name ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var munis []models.Municipality
	for rows.Next() {
		var d models.Municipality
		if err := rows.Scan(&d.ID, &d.UpazilaID, &d.Name, &d.NameBn); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		munis = append(munis, d)
	}

	c.JSON(http.StatusOK, munis)
}

func GetWards(c *gin.Context) {
	unionID := c.Query("union_id")
	muniID := c.Query("municipality_id")
	corpID := c.Query("city_corp_id")

	var query string
	var args []interface{}

	if unionID != "" {
		query = "SELECT id, union_id, municipality_id, city_corp_id, number, name_bn FROM wards WHERE union_id = $1 ORDER BY number ASC"
		val, _ := strconv.Atoi(unionID)
		args = append(args, val)
	} else if muniID != "" {
		query = "SELECT id, union_id, municipality_id, city_corp_id, number, name_bn FROM wards WHERE municipality_id = $1 ORDER BY number ASC"
		val, _ := strconv.Atoi(muniID)
		args = append(args, val)
	} else if corpID != "" {
		query = "SELECT id, union_id, municipality_id, city_corp_id, number, name_bn FROM wards WHERE city_corp_id = $1 ORDER BY number ASC"
		val, _ := strconv.Atoi(corpID)
		args = append(args, val)
	} else {
		query = "SELECT id, union_id, municipality_id, city_corp_id, number, name_bn FROM wards ORDER BY number ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var wards []models.Ward
	for rows.Next() {
		var w models.Ward
		if err := rows.Scan(&w.ID, &w.UnionID, &w.MunicipalityID, &w.CityCorpID, &w.Number, &w.NameBn); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		wards = append(wards, w)
	}

	c.JSON(http.StatusOK, wards)
}

func GetConstituencies(c *gin.Context) {
	districtIDStr := c.Query("district_id")
	var query string
	var args []interface{}

	if districtIDStr != "" {
		query = "SELECT id, district_id, number, name, name_bn FROM constituencies WHERE district_id = $1 ORDER BY number ASC"
		districtID, _ := strconv.Atoi(districtIDStr)
		args = append(args, districtID)
	} else {
		query = "SELECT id, district_id, number, name, name_bn FROM constituencies ORDER BY number ASC"
	}

	rows, err := db.Pool.Query(context.Background(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var consts []models.Constituency
	for rows.Next() {
		var d models.Constituency
		if err := rows.Scan(&d.ID, &d.DistrictID, &d.Number, &d.Name, &d.NameBn); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		consts = append(consts, d)
	}

	c.JSON(http.StatusOK, consts)
}
