package models

import (
	"time"

	"github.com/google/uuid"
)

type PostRequest struct {
	Text        string                 `json:"text" binding:"required,min=1"`
	MediaUrls   []interface{}          `json:"media_urls"` // List of media objects
	Privacy     string                 `json:"privacy"`
	PostType    string                 `json:"post_type"`
	RecipientID *uuid.UUID             `json:"recipient_id"`
	CommitteeID int                    `json:"committee_id"`
	GroupID     int                    `json:"group_id"`
	EventID     int                    `json:"event_id"`
	FundID      int                    `json:"fund_id"`
	PollID      int                    `json:"poll_id"`
	Flair       map[string]interface{} `json:"flair"`
	LinkData    map[string]interface{} `json:"link_data"`
	SharedFrom  *uuid.UUID             `json:"shared_from"`
	ParentID    *uuid.UUID             `json:"parent_id"`
	IsReel      bool                   `json:"is_reel"`
}

type CommentRequest struct {
	Text            string                 `json:"text" binding:"required,min=1"`
	CommentableType string                 `json:"commentable_type"` // post, comment
	Attachment      map[string]interface{} `json:"attachment"`
}

type ReactRequest struct {
	Type string `json:"type" binding:"required"` // like, love, haha, sad, angry, wow
}

type ToggleFollowRequest struct {
	TargetUserID string `json:"target_user_id" binding:"required,uuid"`
}

type PostResponse struct {
	ID             uuid.UUID              `json:"id"`
	UserID         uuid.UUID              `json:"user_id"`
	RecipientID    *uuid.UUID             `json:"recipient_id,omitempty"`
	Text           string                 `json:"text"`
	PostType       string                 `json:"post_type"`
	Privacy        string                 `json:"privacy"`
	Media          []interface{}          `json:"media"`
	Flair          map[string]interface{} `json:"flair,omitempty"`
	LinkData       map[string]interface{} `json:"link_data,omitempty"`
	SharedFrom     *uuid.UUID             `json:"shared_from,omitempty"`
	ParentID       *uuid.UUID             `json:"parent_id,omitempty"`
	ShareCount     int                    `json:"share_count"`
	CommentCount   int                    `json:"comment_count"`
	ReactionCount  int                    `json:"reaction_count"`
	ViewCount      int                    `json:"view_count"`
	IsReel         bool                   `json:"is_reel"`
	CommentsStatus bool                   `json:"comments_status"`
	CreatedAt      time.Time              `json:"created_at"`
}

type StoryResponse struct {
	ID        uuid.UUID `json:"id"`
	UserID    uuid.UUID `json:"user_id"`
	MediaURL  string    `json:"media_url"`
	MediaType string    `json:"media_type"`
	CreatedAt time.Time `json:"created_at"`
}
