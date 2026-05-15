package handlers

import (
	"context"
	"net/http"
	"time"

	"nagoman/social-service/internal/db"
	"nagoman/social-service/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// ─── Helpers ──────────────────────────────────────────────────────────────

func ok(c *gin.Context, status int, message string, data interface{}) {
	c.JSON(status, gin.H{"success": true, "message": message, "data": data})
}

func fail(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"success": false, "message": message, "data": nil})
}

// ─── Models ───────────────────────────────────────────────────────────────

// PostRequest — পোস্ট create payload
type PostRequest struct {
	Text      string   `json:"text" binding:"required,min=1"`
	MediaUrls []string `json:"media_urls"`
	Privacy   string   `json:"privacy"`
}

// CommentRequest — comment payload
type CommentRequest struct {
	Text string `json:"text" binding:"required,min=1"`
}

// ReactRequest — reaction payload
type ReactRequest struct {
	Type string `json:"type" binding:"required"` // like, love, haha, sad, angry, wow
}

// ─── Post Handlers ────────────────────────────────────────────────────────

// CreatePostHandler — gateway-provided user_id দিয়ে পোস্ট তৈরি
func CreatePostHandler(c *gin.Context) {
	var req PostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ডাটা দিন: "+err.Error())
		return
	}

	userID := middleware.GetUserID(c) // Gateway থেকে আসা trusted user_id
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	if req.Privacy == "" {
		req.Privacy = "public"
	}

	postID := uuid.New()
	query := `INSERT INTO posts (id, user_id, post_text, media_urls, privacy)
	          VALUES ($1, $2, $3, $4, $5)`

	_, err := db.Pool.Exec(context.Background(), query,
		postID, userID, req.Text, req.MediaUrls, req.Privacy)

	if err != nil {
		fail(c, http.StatusInternalServerError, "পোস্ট তৈরি করা যায়নি: "+err.Error())
		return
	}

	ok(c, http.StatusCreated, "পোস্টটি সফলভাবে পাবলিশ হয়েছে", gin.H{
		"id":      postID,
		"user_id": userID,
	})
}

// GetMyPostsHandler — current user এর পোস্টগুলো
func GetMyPostsHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `SELECT id, user_id, post_text, media_urls, privacy, created_at
	          FROM posts
	          WHERE user_id = $1 AND COALESCE(is_active, TRUE) = TRUE
	          ORDER BY created_at DESC LIMIT 50`

	rows, err := db.Pool.Query(context.Background(), query, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Posts load failed")
		return
	}
	defer rows.Close()

	posts := []gin.H{}
	for rows.Next() {
		var id, uID uuid.UUID
		var text, privacy string
		var media []string
		var createdAt time.Time
		if err := rows.Scan(&id, &uID, &text, &media, &privacy, &createdAt); err == nil {
			posts = append(posts, gin.H{
				"id":         id,
				"user_id":    uID,
				"text":       text,
				"media":      media,
				"privacy":    privacy,
				"created_at": createdAt,
			})
		}
	}

	ok(c, http.StatusOK, "", posts)
}

// GetFeedHandler — current user এর following থেকে feed
func GetFeedHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `
		SELECT p.id, p.user_id, p.post_text, p.media_urls, p.created_at
		FROM posts p
		INNER JOIN follows f ON p.user_id = f.following_id
		WHERE f.follower_id = $1 AND COALESCE(p.is_active, TRUE) = TRUE
		ORDER BY p.created_at DESC
		LIMIT 50
	`

	rows, err := db.Pool.Query(context.Background(), query, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "ফিড লোড করা যাচ্ছে না: "+err.Error())
		return
	}
	defer rows.Close()

	feed := []gin.H{}
	for rows.Next() {
		var id, uID uuid.UUID
		var text string
		var media []string
		var createdAt time.Time
		if err := rows.Scan(&id, &uID, &text, &media, &createdAt); err == nil {
			feed = append(feed, gin.H{
				"id":         id,
				"user_id":    uID,
				"content":    text,
				"media":      media,
				"created_at": createdAt,
			})
		}
	}

	ok(c, http.StatusOK, "", feed)
}

// GetStoriesHandler — active stories (last 24h)
func GetStoriesHandler(c *gin.Context) {
	// Simple: fetch all stories from following users (placeholder logic)
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `
		SELECT s.id, s.user_id, s.media_url, s.media_type, s.created_at
		FROM stories s
		INNER JOIN follows f ON s.user_id = f.following_id
		WHERE f.follower_id = $1 AND s.created_at > (CURRENT_TIMESTAMP - INTERVAL '24 hours')
		ORDER BY s.created_at DESC
	`

	rows, err := db.Pool.Query(context.Background(), query, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Stories load failed")
		return
	}
	defer rows.Close()

	stories := []gin.H{}
	for rows.Next() {
		var id, uID uuid.UUID
		var url, mType string
		var createdAt time.Time
		if err := rows.Scan(&id, &uID, &url, &mType, &createdAt); err == nil {
			stories = append(stories, gin.H{
				"id":         id,
				"user_id":    uID,
				"media_url":  url,
				"media_type": mType,
				"created_at": createdAt,
			})
		}
	}

	ok(c, http.StatusOK, "", stories)
}

// ─── Reaction & Comment ───────────────────────────────────────────────────

// ReactHandler — পোস্টে reaction (like/love/etc.)
func ReactHandler(c *gin.Context) {
	postID := c.Param("id")
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req ReactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Reaction type দিন")
		return
	}

	// Upsert: একই user একই post এ একবারই react করতে পারবে (toggle)
	query := `INSERT INTO reactions (id, user_id, reactable_id, reactable_type, reaction_type)
	          VALUES ($1, $2, $3, $4, $5)
	          ON CONFLICT (user_id, reactable_id, reactable_type) DO UPDATE SET reaction_type = EXCLUDED.reaction_type`

	_, err := db.Pool.Exec(context.Background(), query, uuid.New(), userID, postID, "post", req.Type)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Reaction save failed: "+err.Error())
		return
	}

	ok(c, http.StatusOK, "Reaction recorded", gin.H{"post_id": postID, "type": req.Type})
}

// AddCommentHandler — পোস্টে comment
func AddCommentHandler(c *gin.Context) {
	postID := c.Param("id")
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req CommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Comment text দিন")
		return
	}

	commentID := uuid.New()
	query := `INSERT INTO comments (id, post_id, user_id, comment_text) VALUES ($1, $2, $3, $4)`
	_, err := db.Pool.Exec(context.Background(), query, commentID, postID, userID, req.Text)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Comment save failed: "+err.Error())
		return
	}

	ok(c, http.StatusCreated, "Comment added", gin.H{"id": commentID})
}

// SavePostHandler — bookmark/save toggle
func SavePostHandler(c *gin.Context) {
	postID := c.Param("id")
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	// Check if already saved
	var exists bool
	if err := db.Pool.QueryRow(context.Background(),
		`SELECT EXISTS(SELECT 1 FROM saved_posts WHERE post_id = $1 AND user_id = $2)`,
		postID, userID).Scan(&exists); err != nil {
		fail(c, http.StatusInternalServerError, "Database error")
		return
	}

	if exists {
		_, _ = db.Pool.Exec(context.Background(),
			`DELETE FROM saved_posts WHERE post_id = $1 AND user_id = $2`, postID, userID)
		ok(c, http.StatusOK, "Unsaved", gin.H{"saved": false})
		return
	}

	_, err := db.Pool.Exec(context.Background(),
		`INSERT INTO saved_posts (id, post_id, user_id) VALUES ($1, $2, $3)`,
		uuid.New(), postID, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Save failed: "+err.Error())
		return
	}
	ok(c, http.StatusOK, "Saved", gin.H{"saved": true})
}

// ─── Relationship ─────────────────────────────────────────────────────────

// ToggleFollowRequest — follow toggle payload
type ToggleFollowRequest struct {
	TargetUserID string `json:"target_user_id" binding:"required,uuid"`
}

// ToggleFollowHandler — follow/unfollow toggle
func ToggleFollowHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req ToggleFollowRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Target user ID দিন")
		return
	}

	if req.TargetUserID == userID {
		fail(c, http.StatusBadRequest, "নিজেকে follow করা যাবে না")
		return
	}

	var exists bool
	if err := db.Pool.QueryRow(context.Background(),
		`SELECT EXISTS(SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2)`,
		userID, req.TargetUserID).Scan(&exists); err != nil {
		fail(c, http.StatusInternalServerError, "Database error")
		return
	}

	if exists {
		_, _ = db.Pool.Exec(context.Background(),
			`DELETE FROM follows WHERE follower_id = $1 AND following_id = $2`,
			userID, req.TargetUserID)
		ok(c, http.StatusOK, "Unfollowed", gin.H{"following": false})
		return
	}

	_, err := db.Pool.Exec(context.Background(),
		`INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)`,
		userID, req.TargetUserID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Follow failed: "+err.Error())
		return
	}
	ok(c, http.StatusOK, "Followed", gin.H{"following": true})
}

// BlockUserHandler — block user
func BlockUserHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}
	targetID := c.Param("id")

	if targetID == userID {
		fail(c, http.StatusBadRequest, "নিজেকে block করা যাবে না")
		return
	}

	_, err := db.Pool.Exec(context.Background(),
		`INSERT INTO blocks (id, blocker_id, blocked_id) VALUES ($1, $2, $3)
		 ON CONFLICT (blocker_id, blocked_id) DO NOTHING`,
		uuid.New(), userID, targetID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Block failed: "+err.Error())
		return
	}
	ok(c, http.StatusOK, "User blocked", nil)
}

// SearchHandler — basic post/user search
func SearchHandler(c *gin.Context) {
	q := c.Query("q")
	if q == "" {
		ok(c, http.StatusOK, "", gin.H{"posts": []gin.H{}, "users": []gin.H{}})
		return
	}

	// Search posts
	postQuery := `SELECT id, user_id, post_text, media_urls FROM posts 
	              WHERE post_text ILIKE $1 AND COALESCE(is_active, TRUE) = TRUE 
	              LIMIT 20`
	rows, err := db.Pool.Query(context.Background(), postQuery, "%"+q+"%")
	
	posts := []gin.H{}
	if err == nil {
		defer rows.Close()
		for rows.Next() {
			var id, uID uuid.UUID
			var text string
			var media []string
			if err := rows.Scan(&id, &uID, &text, &media); err == nil {
				posts = append(posts, gin.H{"id": id, "user_id": uID, "text": text, "media": media})
			}
		}
	}

	// NOTE: User search requires cross-service call or duplicated user data in social_db
	// For now, we'll return empty users or just posts
	ok(c, http.StatusOK, "", gin.H{
		"query": q,
		"posts": posts,
		"users": []gin.H{}, // Placeholder
	})
}
