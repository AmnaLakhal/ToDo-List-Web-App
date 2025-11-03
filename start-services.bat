@echo off
echo Demarrage des services Todo App...
echo.

echo [1/3] Arret des processus existants...
taskkill /f /im node.exe 2>nul
taskkill /f /im nodemon.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Demarrage du backend sur port 3000...
start "Backend-TodoApp" cmd /k "cd server && npm run dev"

echo [3/3] Attente puis demarrage du frontend...
timeout /t 5 /nobreak >nul
start "Frontend-TodoApp" cmd /k "cd client && npm run dev"

echo.
echo Services demarres!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173 (ou autre port disponible)
echo.
pause