package models

import (
	"time"

	"github.com/google/uuid"
)

type Category struct {
	ID       int        `json:"id"`
	Name     string     `json:"name"`
	NameBN   string     `json:"name_bn"`
	Slug     string     `json:"slug"`
	ParentID *int       `json:"parent_id"`
	Icon     string     `json:"icon"`
}

type Article struct {
	ID        uuid.UUID `json:"id"`
	CategoryID int      `json:"category_id"`
	Title     string    `json:"title"`
	TitleBN   string    `json:"title_bn"`
	Content   string    `json:"content"`
	ContentBN string    `json:"content_bn"`
	MediaURL  string    `json:"media_url"`
	Tags      []string  `json:"tags"`
	ViewCount int       `json:"view_count"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Question struct {
	ID            uuid.UUID `json:"id"`
	ContentID     uuid.UUID `json:"content_id"`
	Question      string    `json:"question"`
	Options       []string  `json:"options"`
	CorrectOption int       `json:"correct_option,omitempty"` // Omitted in response to user
	Explanation   string    `json:"explanation,omitempty"`
}

type QuizSubmitRequest struct {
	QuestionID uuid.UUID `json:"question_id" binding:"required"`
	Answer     int       `json:"answer"`
}
