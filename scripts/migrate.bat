@echo off
echo [NagoMan] Running Database Migrations...
cd ..
docker compose exec api-gateway npm run migrate
echo [NagoMan] Migrations Finished!
pause
