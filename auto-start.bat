@echo off
title Todo App - Auto Start & Monitor
echo ========================================
echo    Todo App - Demarrage Automatique
echo ========================================
echo.

echo [1/5] Verification des dependances...
if not exist "server\node_modules" (
    echo Installation des dependances backend...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules" (
    echo Installation des dependances frontend...
    cd client
    call npm install
    cd ..
)

echo [2/5] Verification de la configuration...
if not exist "server\.env" (
    echo Creation du fichier .env backend...
    copy "server\.env.example" "server\.env"
)

echo [3/5] Arret des processus existants...
taskkill /f /im node.exe 2>nul
taskkill /f /im nodemon.exe 2>nul

echo [4/5] Demarrage du backend...
start "Backend API - Todo App" cmd /k "cd server && npm run dev"

echo Attente du demarrage du backend...
:wait_backend
timeout /t 2 /nobreak >nul
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo Backend en cours de demarrage...
    goto wait_backend
)
echo ✅ Backend pret!

echo [5/5] Demarrage du frontend...
start "Frontend React - Todo App" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo    Services Demarres avec Succes!
echo ========================================
echo.
echo Backend API:  http://localhost:3000
echo Frontend:     http://localhost:5173 (ou 5174)
echo.
echo Les checkboxes des taches fonctionnent maintenant!
echo.
echo Surveillance automatique activee...
echo Ce script surveille les services et les redémarre si nécessaire.
echo.

:monitor
timeout /t 30 /nobreak >nul

REM Verifier le backend
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [%time%] ❌ Backend non accessible - Redemarrage...
    taskkill /f /im node.exe 2>nul
    taskkill /f /im nodemon.exe 2>nul
    timeout /t 3 /nobreak >nul
    start "Backend API - Auto Restart" cmd /k "cd server && npm run dev"
    echo [%time%] ✅ Backend redémarre
) else (
    echo [%time%] ✅ Backend fonctionne
)

REM Verifier le frontend
netstat -an | find ":5173" | find "LISTENING" >nul
if %errorlevel% neq 0 (
    netstat -an | find ":5174" | find "LISTENING" >nul
    if %errorlevel% neq 0 (
        echo [%time%] ❌ Frontend non accessible - Redemarrage...
        start "Frontend React - Auto Restart" cmd /k "cd client && npm run dev"
        echo [%time%] ✅ Frontend redémarre
    )
)

goto monitor