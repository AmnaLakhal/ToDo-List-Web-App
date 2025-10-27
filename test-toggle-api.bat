@echo off
echo ========================================
echo    Test Toggle API Directement
echo ========================================
echo.

echo 1. Creation d'un utilisateur de test...
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"email\":\"testuser@test.com\",\"password\":\"password123\"}" 2>nul
echo.

echo 2. Connexion...
for /f "tokens=*" %%i in ('curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"testuser@test.com\",\"password\":\"password123\"}"') do set LOGIN_RESPONSE=%%i
echo Response: %LOGIN_RESPONSE%
echo.

echo 3. Creation d'une tache de test...
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_HERE" -d "{\"title\":\"Test Task\"}"
echo.

echo 4. Liste des taches...
curl -X GET http://localhost:3000/tasks -H "Authorization: Bearer TOKEN_HERE"
echo.

echo 5. Test de toggle (completed = true)...
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_HERE" -d "{\"completed\":true}"
echo.

echo 6. Verification...
curl -X GET http://localhost:3000/tasks -H "Authorization: Bearer TOKEN_HERE"
echo.

pause