package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() {
	// ডাটাবেস ইউআরএল (Social DB)
	dbUrl := os.Getenv("SOCIAL_DB_URL")
	if dbUrl == "" {
		dbUrl = "postgres://root:@localhost:5432/nagorik_social"
	}

	config, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("কনফিগারেশন এরর: %v", err)
	}

	// হাই-স্কেল অপ্টিমাইজেশন
	config.MaxConns = 150 // সোশ্যাল সার্ভিসে কানেকশন একটু বেশি রাখা হয়েছে

	Pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("সোশ্যাল ডাটাবেসে কানেক্ট করা সম্ভব হয়নি: %v", err)
	}

	log.Println("Social DB-র সাথে সাকসেসফুলি কানেক্ট হয়েছে!")
}
