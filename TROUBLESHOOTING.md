# 🛠️ Guide de Dépannage - Todo App

## 🚨 Problèmes Courants

### ❌ Erreur "ECONNREFUSED" ou "http proxy error"

**Symptômes :**
```
[vite] http proxy error: /tasks
AggregateError [ECONNREFUSED]
```

**Cause :** Le backend n'est pas démarré ou ne fonctionne pas sur le port 3000.

**Solutions :**

1. **Vérifier l'état des services :**
   ```bash
   # Double-cliquer sur :
   check-services.bat
   ```

2. **Démarrer le backend manuellement :**
   ```bash
   cd server
   npm run dev
   ```

3. **Démarrage automatique complet :**
   ```bash
   # Double-cliquer sur :
   start-dev.bat
   ```

4. **Redémarrage complet :**
   ```bash
   # 1. Arrêter tous les services
   stop-dev.bat
   
   # 2. Redémarrer
   start-dev.bat
   ```

### ❌ Erreur "JWT_SECRET is missing"

**Symptômes :**
```
FATAL: JWT_SECRET is missing. Create a .env file
```

**Solutions :**

1. **Créer le fichier .env :**
   ```bash
   cd server
   copy .env.example .env
   ```

2. **Vérifier le contenu de server/.env :**
   ```env
   JWT_SECRET=amna_secret_key
   PORT=3000
   ```

### ❌ Port déjà utilisé

**Symptômes :**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions :**

1. **Arrêter les processus existants :**
   ```bash
   stop-dev.bat
   ```

2. **Changer le port (si nécessaire) :**
   ```env
   # Dans server/.env
   PORT=3001
   ```

3. **Forcer l'arrêt des processus :**
   ```bash
   taskkill /f /im node.exe
   taskkill /f /im nodemon.exe
   ```

### ❌ Modules manquants

**Symptômes :**
```
Cannot find module 'express'
```

**Solutions :**

1. **Réinstaller les dépendances backend :**
   ```bash
   cd server
   rm -rf node_modules
   npm install
   ```

2. **Réinstaller les dépendances frontend :**
   ```bash
   cd client
   rm -rf node_modules
   npm install
   ```

### ❌ Base de données corrompue

**Symptômes :**
- Erreurs SQLite
- Données manquantes
- Erreurs de contraintes

**Solutions :**

1. **Réinitialiser la base de données :**
   ```bash
   cd server
   del data.sqlite
   # Redémarrer le serveur pour recréer les tables
   ```

## 🔧 Scripts de Maintenance

### Démarrage
- `start-dev.bat` - Démarrage automatique complet
- `cd server && npm run dev` - Backend seulement
- `cd client && npm run dev` - Frontend seulement

### Vérification
- `check-services.bat` - Vérifier l'état des services
- `curl http://localhost:3000` - Tester l'API backend
- `curl http://localhost:5173` - Tester le frontend

### Arrêt
- `stop-dev.bat` - Arrêt propre de tous les services
- `Ctrl+C` dans les terminaux - Arrêt manuel

### Tests
- `cd server && npm test` - Tests backend
- `cd server && npm run test:watch` - Tests en mode watch

## 📋 Checklist de Dépannage

Quand quelque chose ne fonctionne pas, suivez cette checklist :

1. **✅ Vérifier les services :**
   - [ ] Backend actif sur port 3000
   - [ ] Frontend actif sur port 5173/5174
   - [ ] API répond à `http://localhost:3000`

2. **✅ Vérifier les fichiers de configuration :**
   - [ ] `server/.env` existe et contient `JWT_SECRET`
   - [ ] `client/.env` existe (optionnel)
   - [ ] Pas d'erreurs de syntaxe dans les fichiers

3. **✅ Vérifier les dépendances :**
   - [ ] `server/node_modules` existe
   - [ ] `client/node_modules` existe
   - [ ] Pas d'erreurs dans `package.json`

4. **✅ Vérifier les ports :**
   - [ ] Port 3000 libre ou utilisé par notre backend
   - [ ] Port 5173/5174 libre ou utilisé par notre frontend
   - [ ] Pas de conflits de ports

5. **✅ Vérifier les logs :**
   - [ ] Pas d'erreurs dans la console backend
   - [ ] Pas d'erreurs dans la console frontend
   - [ ] Messages de démarrage corrects

## 🆘 Commandes d'Urgence

### Redémarrage complet
```bash
# 1. Tout arrêter
stop-dev.bat

# 2. Nettoyer les processus
taskkill /f /im node.exe
taskkill /f /im nodemon.exe

# 3. Redémarrer
start-dev.bat
```

### Reset complet
```bash
# 1. Arrêter les services
stop-dev.bat

# 2. Supprimer les modules
rmdir /s server\node_modules
rmdir /s client\node_modules

# 3. Réinstaller
cd server && npm install
cd client && npm install

# 4. Redémarrer
start-dev.bat
```

### Vérification rapide
```bash
# Tester l'API
curl http://localhost:3000

# Vérifier les ports
netstat -an | find ":3000"
netstat -an | find ":5173"

# Vérifier les processus
tasklist | find "node.exe"
```

## 📞 Support

Si les problèmes persistent :

1. Vérifiez les logs complets dans les terminaux
2. Consultez la documentation dans `README.md`
3. Vérifiez que Node.js version 16+ est installé
4. Assurez-vous que les ports 3000 et 5173 ne sont pas bloqués par un firewall