# CI/CD Quick Start

## ✅ Was wurde erstellt?

### 1. GitHub Actions Workflow (`.github/workflows/ci-cd.yml`)
- **Test-Job**: Führt automatisch Unit-Tests mit pytest aus
- **Lint-Job**: Code-Qualitätsprüfung mit flake8
- **Build-Job**: Erstellt Docker-Image (nur main Branch)
- **Deploy-Jobs**: Deployment zu Azure oder eigenem Server

### 2. Docker-Konfiguration
- `Dockerfile`: Production-ready Container mit Gunicorn
- `docker-compose.yml`: Lokale Entwicklungsumgebung
- `.dockerignore`: Optimierte Build-Performance

### 3. Tests
- `tests/test_app.py`: Umfassende Unit-Tests
- Coverage: 81% Code-Abdeckung
- Pytest-Integration für CI/CD

## 🚀 Sofort starten

### Option 1: Einfach pushen
```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

Die Pipeline läuft automatisch! Gehe zu **Actions** in GitHub, um den Status zu sehen.

### Option 2: Lokal testen (empfohlen)
```bash
# Tests ausführen
python -m pytest tests/ -v --cov=app

# Docker-Image bauen
docker build -t case-study-manager .

# Container starten
docker run -p 5000:5000 case-study-manager

# Oder mit Docker Compose
docker-compose up
```

## 🔐 Deployment konfigurieren (optional)

Wenn du automatisch deployen möchtest, füge diese **GitHub Secrets** hinzu:

### Azure Web App
1. Gehe zu **Settings → Secrets and variables → Actions**
2. Klicke **New repository secret**
3. Füge hinzu:
   ```
   AZURE_WEBAPP_NAME           = dein-webapp-name
   AZURE_WEBAPP_PUBLISH_PROFILE = <XML aus Azure Portal>
   ```

### Docker Hub
```
DOCKER_USERNAME  = dein-dockerhub-username
DOCKER_PASSWORD  = dein-dockerhub-token
```

### Eigener Server (SSH)
```
DEPLOY_HOST     = server.example.com
DEPLOY_USER     = ubuntu
DEPLOY_SSH_KEY  = <privater SSH-Key>
DEPLOY_PATH     = /var/www/case-study-manager
```

**Ohne Secrets läuft nur der Test-Job** - das ist okay für den Anfang!

## 📊 Pipeline-Status überprüfen

1. Gehe zu deinem GitHub-Repository
2. Klicke auf **Actions** (oben im Menü)
3. Sieh alle Workflow-Runs und deren Status
4. Klicke auf einen Run für Details

### Badge hinzufügen (optional)
Füge das in `README.md` ein:
```markdown
![CI/CD](https://github.com/totosan/ghcp-test/workflows/CI%2FCD%20Pipeline/badge.svg)
```

## 🐛 Troubleshooting

### Tests schlagen fehl?
```bash
# Lokal testen
python -m pytest tests/ -v

# Dependencies prüfen
pip install -r requirements.txt
```

### Docker-Build schlägt fehl?
```bash
# Syntax prüfen
docker build --no-cache -t test .

# Logs ansehen
docker logs <container-id>
```

### GitHub Actions Fehler?
- Überprüfe die Logs unter **Actions → Workflow-Run → Job**
- Secrets richtig gesetzt? (Settings → Secrets)
- Branch-Name korrekt? (main vs. master)

## 📝 Nächste Schritte

1. **Jetzt pushen** und ersten Workflow-Run ansehen
2. **Secrets hinzufügen**, wenn du deployen möchtest
3. **Badge ins README** für sichtbaren Status
4. **Branch Protection** aktivieren (Settings → Branches):
   - Require status checks to pass
   - Require branches to be up to date

## 🎯 Was passiert automatisch?

### Bei jedem Push/PR:
✅ Tests laufen  
✅ Code-Qualität wird geprüft  
✅ Build-Status wird angezeigt  

### Bei Push auf main (mit Secrets):
✅ Docker-Image wird gebaut  
✅ Image wird zu Docker Hub gepusht  
✅ App wird zu Azure/Server deployed  

### Ohne Secrets:
✅ Tests und Linting laufen  
⏭️  Deployment-Jobs werden übersprungen  

---

**Fertig!** Die CI/CD-Pipeline ist einsatzbereit. 🎉
