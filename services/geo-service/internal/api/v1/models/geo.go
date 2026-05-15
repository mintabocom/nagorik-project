package models

import "time"

type Division struct {
	ID        uint32    `json:"id"`
	Name      string    `json:"name"`
	NameBn    string    `json:"name_bn"`
	URL       string    `json:"url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type District struct {
	ID         uint32    `json:"id"`
	DivisionID uint32    `json:"division_id"`
	Name       string    `json:"name"`
	NameBn     string    `json:"name_bn"`
	Lat        string    `json:"lat,omitempty"`
	Lon        string    `json:"lon,omitempty"`
	URL        string    `json:"url,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Upazila struct {
	ID         uint32    `json:"id"`
	DistrictID uint32    `json:"district_id"`
	Name       string    `json:"name"`
	NameBn     string    `json:"name_bn"`
	URL        string    `json:"url,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Union struct {
	ID        uint32    `json:"id"`
	UpazilaID uint32    `json:"upazila_id"`
	Name      string    `json:"name"`
	NameBn    string    `json:"name_bn"`
	URL       string    `json:"url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Ward struct {
	ID           uint32  `json:"id"`
	UnionID      *uint32 `json:"union_id,omitempty"`
	MunicipalityID *uint32 `json:"municipality_id,omitempty"`
	CityCorpID   *uint32 `json:"city_corp_id,omitempty"`
	Number       string  `json:"number"`
	NameBn       string  `json:"name_bn,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CityCorporation struct {
	ID         uint32    `json:"id"`
	DistrictID uint32    `json:"district_id"`
	Name       string    `json:"name"`
	NameBn     string    `json:"name_bn"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Municipality struct {
	ID         uint32    `json:"id"`
	UpazilaID  uint32    `json:"upazila_id"`
	Name       string    `json:"name"`
	NameBn     string    `json:"name_bn"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Constituency struct {
	ID         uint32    `json:"id"`
	DistrictID uint32    `json:"district_id"`
	Number     int       `json:"number"`
	Name       string    `json:"name"`
	NameBn     string    `json:"name_bn"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
