@echo off
echo [NagoMan] Starting Full Deployment...
cd ..
docker compose down
docker compose up -d --build
echo [NagoMan] Deployment Complete!
echo [NagoMan] Website: http://bdnagorik.com
echo [NagoMan] Panel: http://panel.bdnagorik.com
echo [NagoMan] Admin: http://admin.bdnagorik.com
pause
