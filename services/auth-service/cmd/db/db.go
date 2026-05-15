package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() {
	// ডাটাবেস কানেকশন ইউআরএল (প্রোডাকশনে এটি .env ফাইল থেকে আসবে)
	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl == "" {
		// CockroachDB-র ডিফল্ট পোর্ট ২৬২৫৭ ব্যবহার করা হয়েছে
		dbUrl = "postgres://root@localhost:26257/nagorik_identity?sslmode=disable"
	}

	// কানেকশন কনফিগারেশন পার্স করা হচ্ছে
	config, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("ডাটাবেস কনফিগারেশন রিড করতে সমস্যা হয়েছে: %v", err)
	}

	// হাই-স্কেল অপ্টিমাইজেশন: সর্বোচ্চ ১০০টি কানেকশন একসাথে খোলা থাকবে
	config.MaxConns = 100 

	// নতুন কানেকশন পুল তৈরি করা হচ্ছে
	Pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("ডাটাবেসের সাথে কানেক্ট করা সম্ভব হয়নি: %v", err)
	}

	log.Println("Identity DB-র সাথে সাকসেসফুলি কানেক্ট হয়েছে!")
}
