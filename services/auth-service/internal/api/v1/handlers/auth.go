package handlers

import (
	"context"
	"net/http"
	"strings"
	"time"

	"nagoman/auth-service/internal/api/v1/models"
	"nagoman/auth-service/cmd/db"
	"nagoman/auth-service/internal/api/v1/middleware"
	"nagoman/auth-service/internal/api/v1/utils"



	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

// ─── Helpers ──────────────────────────────────────────────────────────────

func ok(c *gin.Context, status int, message string, data interface{}) {
	c.JSON(status, gin.H{"success": true, "message": message, "data": data})
}

func fail(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"success": false, "message": message, "data": nil})
}

// ─── Public Handlers ──────────────────────────────────────────────────────

// PhoneCheckHandler — phone number system এ আছে কি না check
func PhoneCheckHandler(c *gin.Context) {
	var req models.PhoneCheckRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ফোন নাম্বার দিন")
		return
	}

	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM users WHERE phone = $1)`
	err := db.Pool.QueryRow(context.Background(), query, req.Phone).Scan(&exists)
	if err != nil {
		fail(c, http.StatusInternalServerError, "সার্ভার এরর, আবার চেষ্টা করুন")
		return
	}

	ok(c, http.StatusOK, "চেক সম্পন্ন", gin.H{
		"phone":  req.Phone,
		"exists": exists,
	})
}

// RegisterHandler — নতুন user create
func RegisterHandler(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ডাটা প্রদান করুন: "+err.Error())
		return
	}

	// Gateway force করতে পারে user_type (নাগরিক/সেবক/জনসেবক app থেকে register এ এসেছে)
	if injected := middleware.GetInjectedUserType(c); injected != "" {
		req.UserType = injected
	}
	if req.UserType == "" {
		req.UserType = "citizen"
	}

	// Validation: user_type allowed list
	if req.UserType != "citizen" && req.UserType != "member" && req.UserType != "representative" {
		fail(c, http.StatusBadRequest, "Invalid user_type")
		return
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Password processing failed")
		return
	}

	userID := uuid.New()
	query := `INSERT INTO users (id, username, first_name, last_name, phone, email, password, user_type)
	          VALUES ($1, $2, $3, $4, $5, NULLIF($6, ''), $7, $8)`

	_, err = db.Pool.Exec(context.Background(), query,
		userID, req.Username, req.FirstName, req.LastName, req.Phone, req.Email, hashedPassword, req.UserType)

	if err != nil {
		// Likely duplicate phone/email/username
		if strings.Contains(err.Error(), "duplicate") || strings.Contains(err.Error(), "unique") {
			fail(c, http.StatusConflict, "এই phone/email/username আগে থেকে registered")
			return
		}
		fail(c, http.StatusInternalServerError, "Registration failed: "+err.Error())
		return
	}

	// Auto-issue JWT — registration successful হলেই login হয়ে যাবে
	token, err := utils.GenerateToken(userID.String(), req.UserType)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Token generation failed")
		return
	}

	ok(c, http.StatusCreated, "Registration successful", gin.H{
		"token": token,
		"user": gin.H{
			"id":         userID,
			"username":   req.Username,
			"first_name": req.FirstName,
			"phone":      req.Phone,
			"user_type":  req.UserType,
		},
	})
}

// LoginHandler — phone + password দিয়ে login
func LoginHandler(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "ফোন এবং পাসওয়ার্ড দিন")
		return
	}

	var user models.User
	query := `SELECT id, password, user_type, is_active FROM users WHERE phone = $1`
	err := db.Pool.QueryRow(context.Background(), query, req.Phone).Scan(
		&user.ID, &user.Password, &user.UserType, &user.IsActive)

	if err != nil {
		fail(c, http.StatusUnauthorized, "ফোন বা পাসওয়ার্ড ভুল")
		return
	}

	if !user.IsActive {
		fail(c, http.StatusForbidden, "অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে")
		return
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		fail(c, http.StatusUnauthorized, "ফোন বা পাসওয়ার্ড ভুল")
		return
	}

	token, err := utils.GenerateToken(user.ID.String(), user.UserType)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Token তৈরি করতে সমস্যা হয়েছে")
		return
	}

	ok(c, http.StatusOK, "Login successful", gin.H{
		"token": token,
		"user": gin.H{
			"id":        user.ID,
			"user_type": user.UserType,
		},
	})
}

// ForgotPasswordHandler — phone দিলে reset token issue
// Token DB তে save (password_resets table)। SMS/email gateway notification-service handle করবে।
func ForgotPasswordHandler(c *gin.Context) {
	var req models.ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Phone নাম্বার দিন")
		return
	}

	var userID uuid.UUID
	query := `SELECT id FROM users WHERE phone = $1`
	err := db.Pool.QueryRow(context.Background(), query, req.Phone).Scan(&userID)
	if err != nil {
		// Security: phone exists না করলেও same response (enumeration prevent)
		ok(c, http.StatusOK, "যদি phone registered থাকে, reset link পাঠানো হয়েছে", nil)
		return
	}

	token, err := utils.GenerateResetToken()
	if err != nil {
		fail(c, http.StatusInternalServerError, "Token generation failed")
		return
	}

	// Save reset token (6 hour expiry)
	expiresAt := time.Now().Add(6 * time.Hour)
	insert := `INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)
	           ON CONFLICT (user_id) DO UPDATE SET token = $2, expires_at = $3, created_at = CURRENT_TIMESTAMP`
	_, err = db.Pool.Exec(context.Background(), insert, userID, token, expiresAt)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Reset token save failed")
		return
	}

	// TODO: Notification-service কে event publish করো (SMS/email send)
	// publishEvent("password.reset.requested", {user_id, phone, token})

	ok(c, http.StatusOK, "Reset token পাঠানো হয়েছে আপনার ফোনে", gin.H{
		"reset_token": token, // dev mode — production-এ remove করতে হবে
	})
}

// ResetPasswordHandler — token verify করে নতুন password set
func ResetPasswordHandler(c *gin.Context) {
	var req models.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "Token এবং নতুন password দিন")
		return
	}

	var userID uuid.UUID
	var expiresAt time.Time
	query := `SELECT user_id, expires_at FROM password_resets WHERE token = $1`
	err := db.Pool.QueryRow(context.Background(), query, req.Token).Scan(&userID, &expiresAt)
	if err == pgx.ErrNoRows {
		fail(c, http.StatusBadRequest, "Invalid token")
		return
	}
	if err != nil {
		fail(c, http.StatusInternalServerError, "Database error")
		return
	}

	if time.Now().After(expiresAt) {
		fail(c, http.StatusBadRequest, "Token expired হয়েছে")
		return
	}

	hashedPassword, err := utils.HashPassword(req.NewPassword)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Password processing failed")
		return
	}

	// Update password + delete used token
	tx, err := db.Pool.Begin(context.Background())
	if err != nil {
		fail(c, http.StatusInternalServerError, "Transaction start failed")
		return
	}
	defer tx.Rollback(context.Background())

	if _, err := tx.Exec(context.Background(), `UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, hashedPassword, userID); err != nil {
		fail(c, http.StatusInternalServerError, "Password update failed")
		return
	}
	if _, err := tx.Exec(context.Background(), `DELETE FROM password_resets WHERE user_id = $1`, userID); err != nil {
		fail(c, http.StatusInternalServerError, "Token cleanup failed")
		return
	}
	if err := tx.Commit(context.Background()); err != nil {
		fail(c, http.StatusInternalServerError, "Commit failed")
		return
	}

	ok(c, http.StatusOK, "Password successfully reset", nil)
}

// ─── Authenticated Handlers ───────────────────────────────────────────────

// LogoutHandler — JWT stateless, client-side token discard করবে।
func LogoutHandler(c *gin.Context) {
	// Future: Blacklist token in Redis if needed for high-security logout
	ok(c, http.StatusOK, "সফলভাবে লগআউট হয়েছে", nil)
}

// MeHandler — current user profile + role-specific profile data
func MeHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "লগইন করুন")
		return
	}

	var user models.User
	query := `SELECT id, username, first_name, COALESCE(last_name, ''), COALESCE(nickname, ''),
	          COALESCE(email, ''), phone, user_type, is_verified, is_active,
	          COALESCE(avatar, ''), COALESCE(cover, ''), COALESCE(referral_code, ''),
	          division_id, district_id, upazila_id, union_id, ward_id, city_corporation_id, municipality_id,
	          created_at, updated_at
	          FROM users WHERE id = $1`

	err := db.Pool.QueryRow(context.Background(), query, userID).Scan(
		&user.ID, &user.Username, &user.FirstName, &user.LastName, &user.Nickname,
		&user.Email, &user.Phone, &user.UserType, &user.IsVerified, &user.IsActive,
		&user.Avatar, &user.Cover, &user.ReferralCode,
		&user.DivisionID, &user.DistrictID, &user.UpazilaID, &user.UnionID,
		&user.WardID, &user.CityCorporationID, &user.MunicipalityID,
		&user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		fail(c, http.StatusNotFound, "ইউজার খুঁজে পাওয়া যায়নি")
		return
	}

	// Role-specific profile fetch
	profileData := gin.H{}
	switch user.UserType {
	case "member":
		profileData = fetchMemberProfile(userID)
	case "representative":
		profileData = fetchRepresentativeProfile(userID)
	default:
		profileData = nil
	}

	ok(c, http.StatusOK, "প্রোফাইল তথ্য", gin.H{
		"user":    user,
		"profile": profileData,
	})
}

// UpdateProfileHandler — basic profile fields update
func UpdateProfileHandler(c *gin.Context) {
	userID := middleware.GetUserID(c)
	if userID == "" {
		fail(c, http.StatusUnauthorized, "Unauthenticated")
		return
	}

	var req models.UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fail(c, http.StatusBadRequest, "সঠিক ডাটা দিন")
		return
	}

	// Build dynamic UPDATE query
	query := `UPDATE users SET updated_at = CURRENT_TIMESTAMP`
	args := []interface{}{}
	argIdx := 1

	if req.FirstName != nil {
		query += `, first_name = $` + itoa(argIdx)
		args = append(args, *req.FirstName)
		argIdx++
	}
	if req.LastName != nil {
		query += `, last_name = $` + itoa(argIdx)
		args = append(args, *req.LastName)
		argIdx++
	}
	if req.Nickname != nil {
		query += `, nickname = $` + itoa(argIdx)
		args = append(args, *req.Nickname)
		argIdx++
	}
	if req.Email != nil {
		query += `, email = $` + itoa(argIdx)
		args = append(args, *req.Email)
		argIdx++
	}
	if req.Avatar != nil {
		query += `, avatar = $` + itoa(argIdx)
		args = append(args, *req.Avatar)
		argIdx++
	}
	if req.Cover != nil {
		query += `, cover = $` + itoa(argIdx)
		args = append(args, *req.Cover)
		argIdx++
	}
	if req.DivisionID != nil {
		query += `, division_id = $` + itoa(argIdx)
		args = append(args, *req.DivisionID)
		argIdx++
	}
	if req.DistrictID != nil {
		query += `, district_id = $` + itoa(argIdx)
		args = append(args, *req.DistrictID)
		argIdx++
	}
	if req.UpazilaID != nil {
		query += `, upazila_id = $` + itoa(argIdx)
		args = append(args, *req.UpazilaID)
		argIdx++
	}
	if req.UnionID != nil {
		query += `, union_id = $` + itoa(argIdx)
		args = append(args, *req.UnionID)
		argIdx++
	}
	if req.WardID != nil {
		query += `, ward_id = $` + itoa(argIdx)
		args = append(args, *req.WardID)
		argIdx++
	}
	if req.CityCorporationID != nil {
		query += `, city_corporation_id = $` + itoa(argIdx)
		args = append(args, *req.CityCorporationID)
		argIdx++
	}
	if req.MunicipalityID != nil {
		query += `, municipality_id = $` + itoa(argIdx)
		args = append(args, *req.MunicipalityID)
		argIdx++
	}

	query += ` WHERE id = $` + itoa(argIdx)
	args = append(args, userID)

	_, err := db.Pool.Exec(context.Background(), query, args...)
	if err != nil {
		fail(c, http.StatusInternalServerError, "Profile update failed: "+err.Error())
		return
	}

	ok(c, http.StatusOK, "Profile updated", nil)
}

// ─── Helper functions ─────────────────────────────────────────────────────

// fetchMemberProfile — member-specific profile (from member_profiles table)
func fetchMemberProfile(userID string) gin.H {
	query := `SELECT id, member_id_card, nid, committee_id, position_id, designation,
	          is_active_member, membership_expiry, skills, is_sos_volunteer
	          FROM member_profiles WHERE user_id = $1`

	var (
		id, memberIDCard, nid, designation, skills string
		committeeID, positionID                     *uuid.UUID
		isActive, isSOS                             bool
		expiry                                      *time.Time
	)

	err := db.Pool.QueryRow(context.Background(), query, userID).Scan(
		&id, &memberIDCard, &nid, &committeeID, &positionID,
		&designation, &isActive, &expiry, &skills, &isSOS,
	)
	if err != nil {
		return nil
	}

	return gin.H{
		"id":                id,
		"member_id_card":    memberIDCard,
		"nid":               nid,
		"committee_id":      committeeID,
		"position_id":       positionID,
		"designation":       designation,
		"is_active_member":  isActive,
		"membership_expiry": expiry,
		"skills":            skills,
		"is_sos_volunteer":  isSOS,
	}
}

// fetchRepresentativeProfile — representative-specific profile
func fetchRepresentativeProfile(userID string) gin.H {
	query := `SELECT id, nid, representative_type, current_position, party_id, constituency_id,
	          education, profession, bio, manifesto, is_official_verified
	          FROM representative_profiles WHERE user_id = $1`

	var (
		id, nid, repType, currentPos, education, profession, bio, manifesto string
		partyID, constituencyID                                              *uuid.UUID
		isVerified                                                           bool
	)

	err := db.Pool.QueryRow(context.Background(), query, userID).Scan(
		&id, &nid, &repType, &currentPos, &partyID, &constituencyID,
		&education, &profession, &bio, &manifesto, &isVerified,
	)
	if err != nil {
		return nil
	}

	return gin.H{
		"id":                   id,
		"nid":                  nid,
		"representative_type":  repType,
		"current_position":     currentPos,
		"party_id":             partyID,
		"constituency_id":      constituencyID,
		"education":            education,
		"profession":           profession,
		"bio":                  bio,
		"manifesto":            manifesto,
		"is_official_verified": isVerified,
	}
}

// itoa — int to string (avoid strconv import)
func itoa(i int) string {
	if i == 0 {
		return "0"
	}
	digits := []byte{}
	negative := false
	if i < 0 {
		negative = true
		i = -i
	}
	for i > 0 {
		digits = append([]byte{byte('0' + i%10)}, digits...)
		i /= 10
	}
	if negative {
		digits = append([]byte{'-'}, digits...)
	}
	return string(digits)
}
