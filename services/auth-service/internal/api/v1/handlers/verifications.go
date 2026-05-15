package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"nagoman/auth-service/internal/api/v1/models"
	"nagoman/auth-service/cmd/db"
	"nagoman/auth-service/internal/api/v1/middleware"



	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// ListVerificationsHandler — current user এর সব verification request list
func ListVerificationsHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	query := `SELECT id, user_id, type, status, COALESCE(id_number, ''),
	          document_urls, COALESCE(rejection_reason, ''),
	          verified_at, verified_by, created_at
	          FROM verifications WHERE user_id = $1 ORDER BY created_at DESC`

	rows, err := db.Pool.Query(context.Background(), query, userID)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Database error")
		return
	}
	defer rows.Close()

	verifications := []models.Verification{}
	for rows.Next() {
		var v models.Verification
		var docsJSON []byte
		err := rows.Scan(&v.ID, &v.UserID, &v.Type, &v.Status, &v.IDNumber,
			&docsJSON, &v.RejectionReason, &v.VerifiedAt, &v.VerifiedBy, &v.CreatedAt)
		if err != nil {
			continue
		}
		_ = json.Unmarshal(docsJSON, &v.DocumentURLs)
		verifications = append(verifications, v)
	}

	ok(c, http.StatusOK, "", verifications)
}

// CreateVerificationHandler — নতুন verification submit (identity/document/organization)
func CreateVerificationHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req models.VerificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ডাটা দিন: "+err.Error())
		return
	}

	verificationID := uuid.New()
	docsJSON, _ := json.Marshal(req.DocumentURLs)

	query := `INSERT INTO verifications (id, user_id, type, status, document_urls, id_number)
	          VALUES ($1, $2, $3, 'pending', $4, NULLIF($5, ''))`

	_, err := db.Pool.Exec(context.Background(), query,
		verificationID, userID, req.Type, docsJSON, req.IDNumber)

	if err != nil {
		fail(c, http.StatusInternalServerError, "Verification submit failed: "+err.Error())
		return
	}

	ok(c, http.StatusCreated, "Verification request submitted", gin.H{
		"id":     verificationID,
		"status": "pending",
	})
}

// GetVerificationHandler — single verification details
func GetVerificationHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	verificationID := c.Param("id")

	var v models.Verification
	var docsJSON []byte
	query := `SELECT id, user_id, type, status, COALESCE(id_number, ''),
	          document_urls, COALESCE(rejection_reason, ''),
	          verified_at, verified_by, created_at
	          FROM verifications WHERE id = $1 AND user_id = $2`

	err := db.Pool.QueryRow(context.Background(), query, verificationID, userID).Scan(
		&v.ID, &v.UserID, &v.Type, &v.Status, &v.IDNumber,
		&docsJSON, &v.RejectionReason, &v.VerifiedAt, &v.VerifiedBy, &v.CreatedAt)

	if err != nil {
		fail(c, http.StatusNotFound, "Verification not found")
		return
	}

	_ = json.Unmarshal(docsJSON, &v.DocumentURLs)
	ok(c, http.StatusOK, "", v)
}
