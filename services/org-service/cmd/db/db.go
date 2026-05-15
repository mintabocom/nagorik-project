package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() {
	dbUrl := os.Getenv("ORG_DB_URL")
	if dbUrl == "" {
		dbUrl = "postgres://root:@localhost:5432/nagorik_org"
	}

	config, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("কনফিগারেশন এরর: %v", err)
	}

	config.MaxConns = 100

	Pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("অর্গানাইজেশন ডাটাবেসে কানেক্ট করা সম্ভব হয়নি: %v", err)
	}

	log.Println("Organization DB-র সাথে সাকসেসফুলি কানেক্ট হয়েছে!")
}
