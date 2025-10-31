# CI/CD & Deployment Guide

## GitHub Actions Workflow

Die CI/CD-Pipeline wird automatisch bei jedem Push oder Pull Request ausgelöst.

### Workflow-Jobs

1. **Test** - Führt Unit-Tests aus
2. **Lint** - Prüft Code-Qualität mit flake8
3. **Build Docker** - Erstellt Docker-Image (nur main Branch)
4. **Deploy Azure** - Deployment zu Azure Web App (optional)
5. **Deploy Generic** - SSH-Deployment zu eigenem Server (optional)

## Secrets für Deployment konfigurieren

Gehe zu **Settings → Secrets and variables → Actions** in deinem GitHub Repository.

### Option 1: Azure Web App

Füge folgende Secrets hinzu:

```
AZURE_WEBAPP_NAME           = dein-webapp-name
AZURE_WEBAPP_PUBLISH_PROFILE = <XML-Inhalt aus Azure Portal>
```

**Publish Profile herunterladen:**
1. Azure Portal → Web App → "Get publish profile"
2. XML-Datei öffnen und kompletten Inhalt kopieren
3. Als Secret `AZURE_WEBAPP_PUBLISH_PROFILE` einfügen

### Option 2: Docker Hub

```
DOCKER_USERNAME  = dein-dockerhub-username
DOCKER_PASSWORD  = dein-dockerhub-token
```

### Option 3: Eigener Server (SSH)

```
DEPLOY_HOST     = server.example.com
DEPLOY_USER     = ubuntu
DEPLOY_SSH_KEY  = <privater SSH-Key>
DEPLOY_PATH     = /var/www/case-study-manager
DEPLOY_PORT     = 22  # optional, Standard: 22
```

**SSH-Key Setup:**
```bash
# Auf deinem lokalen Rechner
ssh-keygen -t ed25519 -C "github-deploy"
# Public Key auf Server installieren
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server.example.com
# Private Key als Secret speichern
cat ~/.ssh/id_ed25519
```

## Lokale Tests vor Push

```bash
# Unit-Tests lokal ausführen
python -m pytest tests/ -v

# Docker-Image lokal bauen und testen
docker build -t case-study-manager .
docker run -p 5000:5000 case-study-manager

# Oder mit Docker Compose
docker-compose up
```

## Deployment-Plattformen

### Azure Web App (empfohlen für Python)

```bash
# Azure CLI Installation
az login
az webapp create --name case-study-manager \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --runtime "PYTHON:3.12"

# Publish Profile herunterladen
az webapp deployment list-publishing-profiles \
  --name case-study-manager \
  --resource-group myResourceGroup \
  --xml
```

### Docker Container

```bash
# Image von Docker Hub ziehen
docker pull username/case-study-manager:main

# Container starten
docker run -d \
  -p 5000:5000 \
  -e SECRET_KEY="production-secret" \
  -v $(pwd)/uploads:/app/uploads \
  --name case-study-app \
  username/case-study-manager:main
```

### Generic Linux Server

**1. Server vorbereiten:**
```bash
# Python und Git installieren
sudo apt update
sudo apt install python3.12 python3-pip git nginx

# App-Verzeichnis erstellen
sudo mkdir -p /var/www/case-study-manager
sudo chown $USER:$USER /var/www/case-study-manager

# Repository klonen
cd /var/www/case-study-manager
git clone https://github.com/username/ghcp-test.git .

# Virtual Environment einrichten
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt gunicorn
```

**2. Systemd Service:**
```bash
sudo nano /etc/systemd/system/case-study-manager.service
```

```ini
[Unit]
Description=Case Study Manager
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/case-study-manager
Environment="PATH=/var/www/case-study-manager/venv/bin"
ExecStart=/var/www/case-study-manager/venv/bin/gunicorn \
  --bind 127.0.0.1:5000 \
  --workers 4 \
  run:app

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable case-study-manager
sudo systemctl start case-study-manager
```

**3. Nginx Reverse Proxy:**
```bash
sudo nano /etc/nginx/sites-available/case-study-manager
```

```nginx
server {
    listen 80;
    server_name case-study.example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        alias /var/www/case-study-manager/static;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/case-study-manager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Umgebungsvariablen (Produktion)

```bash
# Generiere sicheren Secret Key
python -c "import secrets; print(secrets.token_hex(32))"

# Setze in .env oder systemd service
SECRET_KEY=dein-generierter-key
DATABASE_URL=postgresql://user:pass@host/db  # Optional: PostgreSQL statt SQLite
```

## Monitoring & Logging

```bash
# Logs ansehen (systemd)
sudo journalctl -u case-study-manager -f

# Docker Logs
docker logs -f case-study-app

# Nginx Access Log
sudo tail -f /var/log/nginx/access.log
```

## Rollback bei Problemen

```bash
# Azure Web App
az webapp deployment slot swap --slot staging --name case-study-manager

# Docker
docker stop case-study-app
docker run -d --name case-study-app username/case-study-manager:previous-tag

# SSH/Git
cd /var/www/case-study-manager
git reset --hard HEAD~1
sudo systemctl restart case-study-manager
```

## Troubleshooting

**Tests schlagen fehl:**
- Überprüfe `requirements.txt` vollständig
- Stelle sicher, dass `pytest` installiert ist

**Docker Build schlägt fehl:**
- Prüfe Dockerfile Syntax
- Stelle sicher, dass alle Dependencies in `requirements.txt` sind

**Azure Deployment schlägt fehl:**
- Publish Profile aktuell?
- Web App läuft auf Python 3.12?
- Startup Command: `gunicorn --bind 0.0.0.0:8000 run:app`

**SSH Deployment schlägt fehl:**
- SSH-Key korrekt?
- User hat Schreibrechte im Deploy-Verzeichnis?
- Firewall öffnet Port 22?
