@echo off
echo [NagoMan] Fetching Live Logs (Press Ctrl+C to stop)...
cd ..
docker compose logs -f
pause
