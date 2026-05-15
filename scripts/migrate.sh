#!/bin/bash

# Go to project root from scripts directory
cd "$(dirname "$0")/.."

# NagoMan Migration Helper Script
# Usage: ./migrate.sh [service] [command] [args]
# Example: ./migrate.sh auth up
# Example: ./migrate.sh social create add_posts_table

SERVICE=$1
COMMAND=$2
SHIFT_ARGS="${@:3}"

if [ -z "$SERVICE" ] || [ -z "$COMMAND" ]; then
    echo "Usage: ./migrate.sh [auth|social|org|chat|reports|notification] [up|down|create|force] [args]"
    exit 1
fi

# Map service names to DB URLs (from docker-compose env)
case $SERVICE in
    auth)
        DB_URL="cockroachdb://root@db:26257/nagorik_identity?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/identity"
        ;;
    infra)
        DB_URL="cockroachdb://root@db:26257/nagorik_infra?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/infra"
        ;;
    social)
        DB_URL="cockroachdb://root@db:26257/nagorik_social?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/social"
        ;;
    org)
        DB_URL="cockroachdb://root@db:26257/nagorik_org?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/org"
        ;;
    chat)
        DB_URL="cockroachdb://root@db:26257/nagorik_chat?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/chat"
        ;;
    reports)
        DB_URL="cockroachdb://root@db:26257/nagorik_reports?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/reports"
        ;;
    notification)
        DB_URL="cockroachdb://root@db:26257/nagorik_notification?sslmode=disable"
        MIGRATIONS_DIR="databases/migrations/notification"
        ;;
    *)
        echo "Unknown service: $SERVICE"
        exit 1
        ;;
esac

# Create directory if not exists
mkdir -p $MIGRATIONS_DIR

case $COMMAND in
    create)
        NAME=$3
        if [ -z "$NAME" ]; then
            echo "Error: Migration name required for 'create'"
            exit 1
        fi
        MSYS_NO_PATHCONV=1 docker run --rm -v "/$(pwd)/$MIGRATIONS_DIR:/migrations" migrate/migrate create -ext sql -dir /migrations -seq $NAME
        ;;
    up)
        MSYS_NO_PATHCONV=1 docker run --rm -v "/$(pwd)/$MIGRATIONS_DIR:/migrations" --network nagoman_default migrate/migrate -path=/migrations/ -database "$DB_URL" up $SHIFT_ARGS
        ;;
    down)
        MSYS_NO_PATHCONV=1 docker run --rm -v "/$(pwd)/$MIGRATIONS_DIR:/migrations" --network nagoman_default migrate/migrate -path=/migrations/ -database "$DB_URL" down $SHIFT_ARGS
        ;;
    force)
        VERSION=$3
        if [ -z "$VERSION" ]; then
            echo "Error: Version required for 'force'"
            exit 1
        fi
        MSYS_NO_PATHCONV=1 docker run --rm -v "/$(pwd)/$MIGRATIONS_DIR:/migrations" --network nagoman_default migrate/migrate -path=/migrations/ -database "$DB_URL" force $VERSION
        ;;
    *)
        echo "Unknown command: $COMMAND"
        exit 1
        ;;
esac
