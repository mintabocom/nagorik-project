package handlers

import (
	"context"
	"net/http"

	"nagoman/knowledge-service/cmd/db"
	"nagoman/knowledge-service/internal/api/v1/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetCategories(c *gin.Context) {
	query := `SELECT id, name, name_bn, slug, parent_id, icon FROM categories ORDER BY name ASC`
	rows, err := db.Pool.Query(context.Background(), query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var cat models.Category
		if err := rows.Scan(&cat.ID, &cat.Name, &cat.NameBN, &cat.Slug, &cat.ParentID, &cat.Icon); err == nil {
			categories = append(categories, cat)
		}
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": categories})
}

func GetArticles(c *gin.Context) {
	categoryID := c.Query("category_id")
	
	query := `SELECT id, category_id, title, title_bn, content, content_bn, media_url, tags, view_count, created_at 
	          FROM knowledge_contents`
	
	var rows interface {
		Close()
		Next() bool
		Scan(...interface{}) error
	}
	var err error

	if categoryID != "" {
		query += " WHERE category_id = $1 ORDER BY created_at DESC"
		rows, err = db.Pool.Query(context.Background(), query, categoryID)
	} else {
		query += " ORDER BY created_at DESC LIMIT 50"
		rows, err = db.Pool.Query(context.Background(), query)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch articles"})
		return
	}
	defer rows.Close()

	var articles []models.Article
	for rows.Next() {
		var a models.Article
		if err := rows.Scan(&a.ID, &a.CategoryID, &a.Title, &a.TitleBN, &a.Content, &a.ContentBN, &a.MediaURL, &a.Tags, &a.ViewCount, &a.CreatedAt); err == nil {
			articles = append(articles, a)
		}
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": articles})
}

func GetArticleByID(c *gin.Context) {
	id := c.Param("id")
	
	// Incremental view count
	go db.Pool.Exec(context.Background(), "UPDATE knowledge_contents SET view_count = view_count + 1 WHERE id = $1", id)

	var a models.Article
	query := `SELECT id, category_id, title, title_bn, content, content_bn, media_url, tags, view_count, created_at 
	          FROM knowledge_contents WHERE id = $1`
	
	err := db.Pool.QueryRow(context.Background(), query, id).Scan(
		&a.ID, &a.CategoryID, &a.Title, &a.TitleBN, &a.Content, &a.ContentBN, &a.MediaURL, &a.Tags, &a.ViewCount, &a.CreatedAt,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": a})
}

func GetQuizzesByArticle(c *gin.Context) {
	articleID := c.Param("id")

	query := `SELECT id, content_id, question, options FROM knowledge_questions WHERE content_id = $1`
	rows, err := db.Pool.Query(context.Background(), query, articleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch quizzes"})
		return
	}
	defer rows.Close()

	var questions []models.Question
	for rows.Next() {
		var q models.Question
		if err := rows.Scan(&q.ID, &q.ContentID, &q.Question, &q.Options); err == nil {
			questions = append(questions, q)
		}
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": questions})
}

func SubmitQuizAnswer(c *gin.Context) {
	questionID := c.Param("id")
	var req models.QuizSubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var correctOption int
	var explanation string
	err := db.Pool.QueryRow(context.Background(), 
		"SELECT correct_option, explanation FROM knowledge_questions WHERE id = $1", 
		questionID).Scan(&correctOption, &explanation)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Question not found"})
		return
	}

	isCorrect := (req.Answer == correctOption)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"is_correct":  isCorrect,
			"correct_option": correctOption,
			"explanation": explanation,
		},
	})
}
