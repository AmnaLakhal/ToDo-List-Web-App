@echo off
title Todo App - Auto Start Both Services
echo ========================================
echo    Todo App - Demarrage Automatique
echo ========================================
echo.

echo [1/4] Arret des processus existants...
taskkill /f /im node.exe 2>nul
taskkill /f /im nodemon.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Demarrage du backend...
start "Backend API - Todo App" cmd /k "cd server && npm run dev"

echo [3/4] Attente du backend...
:wait_backend
timeout /t 2 /nobreak >nul
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo Backend en cours de demarrage...
    goto wait_backend
)
echo ✅ Backend pret sur http://localhost:3000

echo [4/4] Demarrage du frontend...
start "Frontend React - Todo App" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo    Services Demarres avec Succes!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Les deux services sont maintenant actifs!
echo Les checkboxes devraient fonctionner correctement.
echo.
pause