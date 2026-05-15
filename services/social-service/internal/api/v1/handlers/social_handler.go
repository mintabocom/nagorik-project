package handlers

import (
	"context"
	"net/http"
	"time"

	"nagoman/social-service/cmd/db"
	"nagoman/social-service/internal/api/v1/models"
	"nagoman/social-service/internal/api/v1/middleware"

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

// ─── Post Handlers ────────────────────────────────────────────────────────

func CreatePostHandler(c *gin.Context) {
	var req models.PostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ডাটা দিন: "+err.Error())
		return
	}

	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	if req.Privacy == "" {
		req.Privacy = "public"
	}
	if req.PostType == "" {
		req.PostType = "general"
	}

	postID := uuid.New()
	query := `INSERT INTO posts (
				id, user_id, recipient_id, post_text, post_type, privacy, 
				committee_id, group_id, event_id, fund_id, poll_id,
				post_flair, link_data, media_urls, shared_from, parent_id, is_reel
			  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`

	_, err := db.Pool.Exec(context.Background(), query,
		postID, userID, req.RecipientID, req.Text, req.PostType, req.Privacy,
		req.CommitteeID, req.GroupID, req.EventID, req.FundID, req.PollID,
		req.Flair, req.LinkData, req.MediaUrls, req.SharedFrom, req.ParentID, req.IsReel)

	if err != nil {
		fail(c, http.StatusInternalServerError, "পোস্ট তৈরি করা যায়নি: "+err.Error())
		return
	}

	ok(c, http.StatusCreated, "পোস্টটি সফলভাবে পাবলিশ হয়েছে", gin.H{
		"id":      postID,
		"user_id": userID,
	})
}

func GetMyPostsHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `SELECT id, user_id, recipient_id, post_text, post_type, privacy, 
	                 media_urls, post_flair, link_data, shared_from, parent_id,
	                 share_count, comment_count, reaction_count, view_count,
	                 is_reel, comments_status, created_at
	          FROM posts
	          WHERE user_id = $1 AND COALESCE(is_active, TRUE) = TRUE
	          ORDER BY created_at DESC LIMIT 50`

	rows, err := db.Pool.Query(context.Background(), query, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Posts load failed")
		return
	}
	defer rows.Close()

	var posts []models.PostResponse
	for rows.Next() {
		var p models.PostResponse
		err := rows.Scan(
			&p.ID, &p.UserID, &p.RecipientID, &p.Text, &p.PostType, &p.Privacy,
			&p.Media, &p.Flair, &p.LinkData, &p.SharedFrom, &p.ParentID,
			&p.ShareCount, &p.CommentCount, &p.ReactionCount, &p.ViewCount,
			&p.IsReel, &p.CommentsStatus, &p.CreatedAt,
		)
		if err == nil {
			posts = append(posts, p)
		}
	}

	ok(c, http.StatusOK, "", posts)
}

func GetFeedHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `
		SELECT p.id, p.user_id, p.recipient_id, p.post_text, p.post_type, p.privacy, 
		       p.media_urls, p.post_flair, p.link_data, p.shared_from, p.parent_id,
		       p.share_count, p.comment_count, p.reaction_count, p.view_count,
		       p.is_reel, p.comments_status, p.created_at
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

	feed := []models.PostResponse{}
	for rows.Next() {
		var p models.PostResponse
		err := rows.Scan(
			&p.ID, &p.UserID, &p.RecipientID, &p.Text, &p.PostType, &p.Privacy,
			&p.Media, &p.Flair, &p.LinkData, &p.SharedFrom, &p.ParentID,
			&p.ShareCount, &p.CommentCount, &p.ReactionCount, &p.ViewCount,
			&p.IsReel, &p.CommentsStatus, &p.CreatedAt,
		)
		if err == nil {
			feed = append(feed, p)
		}
	}

	ok(c, http.StatusOK, "", feed)
}

func GetStoriesHandler(c *gin.Context) {
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

	stories := []models.StoryResponse{}
	for rows.Next() {
		var s models.StoryResponse
		if err := rows.Scan(&s.ID, &s.UserID, &s.MediaURL, &s.MediaType, &s.CreatedAt); err == nil {
			stories = append(stories, s)
		}
	}

	ok(c, http.StatusOK, "", stories)
}

// ─── Reaction & Comment ───────────────────────────────────────────────────

func ReactHandler(c *gin.Context) {
	postID := c.Param("id")
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req models.ReactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Reaction type দিন")
		return
	}

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

func AddCommentHandler(c *gin.Context) {
	targetID := c.Param("id") // ID of the post or comment
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req models.CommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Comment text দিন")
		return
	}

	if req.CommentableType == "" {
		req.CommentableType = "post"
	}

	commentID := uuid.New()
	query := `INSERT INTO comments (id, user_id, commentable_id, commentable_type, comment_text, attachment) 
	          VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := db.Pool.Exec(context.Background(), query, 
		commentID, userID, targetID, req.CommentableType, req.Text, req.Attachment)
	
	if err != nil {
		fail(c, http.StatusInternalServerError, "Comment save failed: "+err.Error())
		return
	}

	ok(c, http.StatusCreated, "Comment added", gin.H{"id": commentID})
}

func SavePostHandler(c *gin.Context) {
	postID := c.Param("id")
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

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

func ToggleFollowHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req models.ToggleFollowRequest
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

func SearchHandler(c *gin.Context) {
	q := c.Query("q")
	if q == "" {
		ok(c, http.StatusOK, "", gin.H{"posts": []gin.H{}, "users": []gin.H{}})
		return
	}

	postQuery := `SELECT id, user_id, post_text, media_urls FROM posts 
	              WHERE post_text ILIKE $1 AND COALESCE(is_active, TRUE) = TRUE 
	              LIMIT 20`
	rows, err := db.Pool.Query(context.Background(), postQuery, "%"+q+"%")
	
	posts := []models.PostResponse{}
	if err == nil {
		defer rows.Close()
		for rows.Next() {
			var p models.PostResponse
			if err := rows.Scan(&p.ID, &p.UserID, &p.Text, &p.Media); err == nil {
				posts = append(posts, p)
			}
		}
	}

	ok(c, http.StatusOK, "", gin.H{
		"query": q,
		"posts": posts,
		"users": []gin.H{}, 
	})
}
