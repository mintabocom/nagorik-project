package models

import (
	"time"
	"github.com/google/uuid"
)

// ─── DB Entities (v1) ─────────────────────────────────────────────────────

// User মডেলটি ডাটাবেসের 'users' টেবিলের সাথে মিল রেখে তৈরি করা হয়েছে
type User struct {
	ID         uuid.UUID `json:"id" db:"id"`
	Username   string    `json:"username" db:"username"`
	FirstName  string    `json:"first_name" db:"first_name"`
	LastName   string    `json:"last_name" db:"last_name"`
	Nickname   string    `json:"nickname" db:"nickname"`
	Email      string    `json:"email" db:"email"`
	Phone      string    `json:"phone" db:"phone"`
	Password   string    `json:"-" db:"password"` // JSON-এ hide
	UserType   string    `json:"user_type" db:"user_type"`
	IsVerified bool      `json:"is_verified" db:"is_verified"`
	IsActive   bool      `json:"is_active" db:"is_active"`
	Avatar     string    `json:"avatar" db:"avatar"`
	Cover      string    `json:"cover" db:"cover"`
	ReferralCode string  `json:"referral_code" db:"referral_code"`

	// Location (soft references — Supabase)
	DivisionID        *uuid.UUID `json:"division_id" db:"division_id"`
	DistrictID        *uuid.UUID `json:"district_id" db:"district_id"`
	UpazilaID         *uuid.UUID `json:"upazila_id" db:"upazila_id"`
	UnionID           *uuid.UUID `json:"union_id" db:"union_id"`
	WardID            *uuid.UUID `json:"ward_id" db:"ward_id"`
	CityCorporationID *uuid.UUID `json:"city_corporation_id" db:"city_corporation_id"`
	MunicipalityID    *uuid.UUID `json:"municipality_id" db:"municipality_id"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// Verification — DB row
type Verification struct {
	ID              uuid.UUID  `json:"id" db:"id"`
	UserID          uuid.UUID  `json:"user_id" db:"user_id"`
	Type            string     `json:"type" db:"type"`
	Status          string     `json:"status" db:"status"`
	DocumentURLs    []string   `json:"document_urls" db:"document_urls"`
	IDNumber        string     `json:"id_number" db:"id_number"`
	RejectionReason string     `json:"rejection_reason" db:"rejection_reason"`
	VerifiedAt      *time.Time `json:"verified_at" db:"verified_at"`
	VerifiedBy      *uuid.UUID `json:"verified_by" db:"verified_by"`
	CreatedAt       time.Time  `json:"created_at" db:"created_at"`
}

// ─── Request Models (v1) ──────────────────────────────────────────────────

// RegisterRequest — register endpoint payload
type RegisterRequest struct {
	Username  string `json:"username" binding:"required,min=3,max=32"`
	FirstName string `json:"first_name" binding:"required,min=1,max=60"`
	LastName  string `json:"last_name" binding:"max=32"`
	Phone     string `json:"phone" binding:"required,min=11,max=15"`
	Email     string `json:"email" binding:"omitempty,email"`
	Password  string `json:"password" binding:"required,min=6"`
	UserType  string `json:"user_type"` // gateway override করবে if X-Gateway-Inject-User-Type set
}

// LoginRequest — login endpoint payload
type LoginRequest struct {
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Admin — admins টেবিলের জন্য
type Admin struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Email     string    `json:"email" db:"email"`
	Password  string    `json:"-" db:"password"`
	Role      string    `json:"role" db:"role"`
	IsActive  bool      `json:"is_active" db:"is_active"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// AdminLoginRequest — অ্যাডমিন লগইন পেলোড
type AdminLoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// PhoneCheckRequest — phone exists কিনা check
type PhoneCheckRequest struct {
	Phone string `json:"phone" binding:"required,min=11,max=15"`
}

// ForgotPasswordRequest — reset token generate করার জন্য
type ForgotPasswordRequest struct {
	Phone string `json:"phone" binding:"required"`
}

// ResetPasswordRequest — token দিয়ে password reset
type ResetPasswordRequest struct {
	Token       string `json:"token" binding:"required"`
	NewPassword string `json:"new_password" binding:"required,min=6"`
}

// UpdateProfileRequest — profile update payload
type UpdateProfileRequest struct {
	FirstName         *string    `json:"first_name"`
	LastName          *string    `json:"last_name"`
	Nickname          *string    `json:"nickname"`
	Email             *string    `json:"email"`
	Avatar            *string    `json:"avatar"`
	Cover             *string    `json:"cover"`
	DivisionID        *uuid.UUID `json:"division_id"`
	DistrictID        *uuid.UUID `json:"district_id"`
	UpazilaID         *uuid.UUID `json:"upazila_id"`
	UnionID           *uuid.UUID `json:"union_id"`
	WardID            *uuid.UUID `json:"ward_id"`
	CityCorporationID *uuid.UUID `json:"city_corporation_id"`
	MunicipalityID    *uuid.UUID `json:"municipality_id"`
}

// VerificationRequest — identity/document/organization verification submission
type VerificationRequest struct {
	Type         string   `json:"type" binding:"required,oneof=identity document organization"`
	IDNumber     string   `json:"id_number"`
	DocumentURLs []string `json:"document_urls"`
}
