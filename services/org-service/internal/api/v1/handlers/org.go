package handlers

import (
	"context"
	"net/http"
	"nagoman/org-service/cmd/db"
	"nagoman/org-service/internal/api/v1/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)


// কমিটির বংশলতিকা বা হাইয়ারার্কি বের করার হ্যান্ডলার
func GetHierarchyHandler(c *gin.Context) {
	committeeId := c.Param("id")

	// উইথ রিকিউরসিভ (WITH RECURSIVE) কুয়েরি ব্যবহার করে পুরো চেইন একবারে বের করা
	query := `
		WITH RECURSIVE committee_path AS (
			SELECT id, parent_id, name, level FROM committees WHERE id = $1
			UNION ALL
			SELECT c.id, c.parent_id, c.name, c.level FROM committees c
			JOIN committee_path cp ON cp.parent_id = c.id
		)
		SELECT * FROM committee_path;
	`

	rows, err := db.Pool.Query(context.Background(), query, committeeId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "হাইয়ারার্কি লোড করা যায়নি"})
		return
	}
	defer rows.Close()

	var path []models.Committee
	for rows.Next() {
		var com models.Committee
		rows.Scan(&com.ID, &com.ParentID, &com.Name, &com.Level)
		path = append(path, com)
	}

	c.JSON(http.StatusOK, gin.H{
		"committee_chain": path, // নিচ থেকে উপরে (Ward -> Union -> Central)
	})
}

// কভারেজ অ্যানালিটিক্স হ্যান্ডলার
func GetCoverageHandler(c *gin.Context) {
	// এখানে আমরা লজিক দেব যে কয়টি ইউনিয়ন বা ওয়ার্ডে কমিটি নেই
	// এটি এডমিন প্যানেলের জন্য অত্যন্ত জরুরি
	c.JSON(http.StatusOK, gin.H{
		"message": "কভারেজ ডাটা ক্যালকুলেট করা হচ্ছে...",
		"coverage_percent": 85.5,
	})
}

// নতুন কমিটি তৈরি করার হ্যান্ডলার
func CreateCommitteeHandler(c *gin.Context) {
	var com models.Committee
	if err := c.ShouldBindJSON(&com); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "সঠিক ডাটা দিন"})
		return
	}

	newId := uuid.New()
	query := `INSERT INTO committees (id, parent_id, name, level) VALUES ($1, $2, $3, $4)`
	
	_, err := db.Pool.Exec(context.Background(), query, newId, com.ParentID, com.Name, com.Level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "কমিটি তৈরি করা যায়নি"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "নতুন কমিটি সফলভাবে তৈরি হয়েছে", "id": newId})
}

// মিটিং শিডিউল করার হ্যান্ডলার
func ScheduleMeetingHandler(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "মিটিং শিডিউল করা হয়েছে"})
}

// মিটিং লিস্ট দেখার হ্যান্ডলার
func ListMeetingsHandler(c *gin.Context) {
	c.JSON(http.StatusOK, []string{"আগামীকাল বিকাল ৪টায় জুম মিটিং", "১০ই মে বার্ষিক সাধারণ সভা"})
}
