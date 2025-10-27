@echo off
echo ========================================
echo    Todo App - Diagnostic Complet
echo ========================================
echo.

echo [1/8] Verification de Node.js...
node --version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Node.js installé: 
    node --version
) else (
    echo ❌ Node.js non installé ou non accessible
    echo    Téléchargez depuis: https://nodejs.org/
    goto end
)

echo.
echo [2/8] Verification de npm...
npm --version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ npm installé: 
    npm --version
) else (
    echo ❌ npm non accessible
    goto end
)

echo.
echo [3/8] Verification des dépendances backend...
if exist "server\node_modules" (
    echo ✅ Dépendances backend installées
) else (
    echo ❌ Dépendances backend manquantes
    echo    Solution: cd server ^&^& npm install
)

echo.
echo [4/8] Verification des dépendances frontend...
if exist "client\node_modules" (
    echo ✅ Dépendances frontend installées
) else (
    echo ❌ Dépendances frontend manquantes
    echo    Solution: cd client ^&^& npm install
)

echo.
echo [5/8] Verification des fichiers de configuration...
if exist "server\.env" (
    echo ✅ Fichier server\.env existe
    findstr "JWT_SECRET" server\.env >nul
    if %errorlevel%==0 (
        echo ✅ JWT_SECRET configuré
    ) else (
        echo ❌ JWT_SECRET manquant dans server\.env
    )
) else (
    echo ❌ Fichier server\.env manquant
    echo    Solution: copy server\.env.example server\.env
)

if exist "client\.env" (
    echo ✅ Fichier client\.env existe
) else (
    echo ⚠️  Fichier client\.env manquant (optionnel)
    echo    Solution: copy client\.env.example client\.env
)

echo.
echo [6/8] Verification des ports...
netstat -an | find ":3000" | find "LISTENING" >nul
if %errorlevel%==0 (
    echo ✅ Port 3000: Utilisé (probablement par le backend)
) else (
    echo ⚠️  Port 3000: Libre (backend non démarré)
)

netstat -an | find ":5173" | find "LISTENING" >nul
if %errorlevel%==0 (
    echo ✅ Port 5173: Utilisé (probablement par le frontend)
) else (
    netstat -an | find ":5174" | find "LISTENING" >nul
    if %errorlevel%==0 (
        echo ✅ Port 5174: Utilisé (probablement par le frontend)
    ) else (
        echo ⚠️  Ports 5173/5174: Libres (frontend non démarré)
    )
)

echo.
echo [7/8] Verification des processus...
tasklist | find "node.exe" >nul
if %errorlevel%==0 (
    echo ✅ Processus Node.js actifs:
    tasklist | find "node.exe"
) else (
    echo ⚠️  Aucun processus Node.js actif
)

tasklist | find "nodemon.exe" >nul
if %errorlevel%==0 (
    echo ✅ Processus Nodemon actifs:
    tasklist | find "nodemon.exe"
) else (
    echo ⚠️  Aucun processus Nodemon actif
)

echo.
echo [8/8] Test de connectivité...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Backend accessible sur http://localhost:3000
) else (
    echo ❌ Backend non accessible
)

echo.
echo ========================================
echo    Recommandations
echo ========================================
echo.

REM Compter les problèmes
set problems=0

if not exist "server\node_modules" set /a problems+=1
if not exist "client\node_modules" set /a problems+=1
if not exist "server\.env" set /a problems+=1

curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 set /a problems+=1

if %problems%==0 (
    echo ✅ Aucun problème détecté!
    echo    Votre application devrait fonctionner correctement.
    echo.
    echo    Si vous avez encore des problèmes:
    echo    1. Lancer: test-connection.bat
    echo    2. Consulter: TROUBLESHOOTING.md
) else (
    echo ❌ %problems% problème(s) détecté(s)
    echo.
    echo    Solutions recommandées:
    echo    1. Installer les dépendances: cd server ^&^& npm install ^&^& cd ..\client ^&^& npm install
    echo    2. Configurer l'environnement: copy server\.env.example server\.env
    echo    3. Démarrer les services: start-dev.bat
    echo    4. Tester la connexion: test-connection.bat
)

echo.
:end
pause