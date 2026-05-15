package models

import (
	"github.com/google/uuid"
)

// Committee — কমিটি ডাটা মডেল (v1)
type Committee struct {
	ID       uuid.UUID  `json:"id" db:"id"`
	ParentID *uuid.UUID `json:"parent_id" db:"parent_id"`
	Name     string     `json:"name" db:"name"`
	Level    string     `json:"level" db:"level"`
}
