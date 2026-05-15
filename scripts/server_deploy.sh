#!/bin/bash

echo "[NagoMan] Starting Server Deployment..."

# Go to root directory
cd ..

# Build and Start Containers
docker-compose down
docker-compose up -d --build

# Optional: Run Migrations for all services
# ./migrate.sh auth up
# ./migrate.sh infra up
# ./migrate.sh social up

echo "[NagoMan] Deployment Successful!"
echo "[NagoMan] Check logs using: docker-compose logs -f"
