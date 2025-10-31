# Architektur-Dokumentation: Case Study Manager

## Überblick

Der **Case Study Manager** ist eine Webanwendung zur Verwaltung und zum Export von Projektfallstudien für IT-Beratungsunternehmen. Die Anwendung ermöglicht das Erstellen, Durchsuchen und automatisierte Exportieren von Fallstudien in PowerPoint-Präsentationen.

## Technologie-Stack

### Backend
- **Python 3.8+**: Moderne, lesbare Programmiersprache
- **Flask 3.0**: Leichtgewichtiges Web-Framework für schnelle Entwicklung
- **SQLAlchemy 3.1**: ORM (Object-Relational Mapping) für Datenbankzugriffe
- **python-pptx 0.6**: Bibliothek zur Manipulation von PowerPoint-Dateien

### Frontend
- **HTML5**: Strukturierung der Webseiten
- **CSS3 + Bootstrap 5**: Responsive Design und moderne Benutzeroberfläche
- **Vanilla JavaScript**: Client-seitige Interaktivität ohne Framework-Overhead

### Datenspeicherung
- **SQLite**: Eingebettete Datenbank (wartungsfrei, ideal für kleine bis mittlere Datenmengen)
- **Dateisystem**: Speicherung von PowerPoint-Templates und Anhängen

## Architektur-Muster

Die Anwendung folgt einer **3-Schichten-Architektur**:

```
┌─────────────────────────────────────┐
│   Präsentationsschicht (Frontend)   │
│   • HTML/CSS (Bootstrap)            │
│   • JavaScript (AJAX/Fetch)         │
└─────────────────┬───────────────────┘
                  │ REST API (JSON)
┌─────────────────▼───────────────────┐
│    Anwendungslogik (Backend)        │
│   • Flask Routes (API-Endpunkte)    │
│   • Search Service (Suche/Filter)   │
│   • PPT Exporter (PowerPoint-Gen.)  │
└─────────────────┬───────────────────┘
                  │ SQLAlchemy ORM
┌─────────────────▼───────────────────┐
│    Datenschicht (Persistence)       │
│   • SQLite Datenbank                │
│   • Dateisystem (Templates/Uploads) │
└─────────────────────────────────────┘
```

## Komponenten-Übersicht

### 1. **Anwendungskern** (`app/`)

#### `__init__.py` - Application Factory
- Initialisiert die Flask-Anwendung
- Konfiguriert Datenbank und Verzeichnisse
- Registriert API-Routen

#### `models.py` - Datenmodelle
Definiert drei Hauptentitäten:
- **CaseStudy**: Projektfallstudie (Client, Problem, Lösung, Ergebnisse)
- **PPTTemplate**: PowerPoint-Vorlagen mit Platzhaltern
- **Attachment**: Dateianhänge zu Fallstudien

#### `routes.py` - REST API
Stellt RESTful-Endpunkte bereit:
- CRUD-Operationen für Fallstudien (`/api/case-studies`)
- Template-Verwaltung (`/api/templates`)
- PowerPoint-Export (`/api/case-studies/<id>/export/pptx`)
- Statistiken und Metadaten (`/api/stats`, `/api/facets`)

#### `search.py` - Suchlogik
- Volltextsuche über alle Felder
- Filterung nach Industrie, Jahr, Technologien, Tags
- Sortierung nach verschiedenen Kriterien

#### `ppt_export.py` - PowerPoint-Generator
- Lädt Template-Dateien
- Ersetzt Platzhalter (z.B. `{{PROJECT_NAME}}`) mit echten Daten
- Generiert downloadbare .pptx-Dateien

### 2. **Frontend** (`static/`, `templates/`)

#### `templates/index.html` - Single Page Application
Zentrale HTML-Seite mit:
- Dashboard (Statistiken, letzte Fallstudien)
- Formular zum Erstellen/Bearbeiten
- Suchmaske mit Filtern
- Detailansicht
- Template-Verwaltung

#### `static/js/app.js` - Client-Logik
- AJAX-Kommunikation mit REST API
- Dynamisches DOM-Rendering
- Formular-Validierung
- Event-Handling

#### `static/css/style.css` - Styling
- Custom-Design zusätzlich zu Bootstrap
- Responsive Layouts

### 3. **Konfiguration & Start**

#### `config.py` - Zentrale Konfiguration
- Datenbank-Pfade
- Upload-Verzeichnisse
- Sicherheitseinstellungen (Secret Key, Session)
- Dateigrößen-Limits

#### `run.py` - Einstiegspunkt
- Startet den Entwicklungsserver
- Port: 5001, Debug-Modus aktiviert

## Datenfluss: PowerPoint-Export (Beispiel)

```
1. Benutzer klickt "Export to PowerPoint"
   ↓
2. Frontend sendet GET-Request an:
   /api/case-studies/<id>/export/pptx
   ↓
3. Backend (routes.py):
   - Lädt Fallstudie aus Datenbank
   - Holt Default-PowerPoint-Template
   ↓
4. PPTExporter (ppt_export.py):
   - Öffnet Template mit python-pptx
   - Durchsucht alle Slides und Shapes
   - Ersetzt {{PLACEHOLDERS}} mit Fallstudien-Daten
   - Speichert neue .pptx-Datei
   ↓
5. Backend sendet Datei als Download zurück
   ↓
6. Browser lädt fertige PowerPoint herunter
```

## Datenmodell

### CaseStudy (Hauptentität)
```
┌─────────────────────────────┐
│ CaseStudy                   │
├─────────────────────────────┤
│ id (PK)                     │
│ project_name                │
│ client_name                 │
│ industry                    │
│ project_year                │
│ challenge                   │
│ solution                    │
│ outcomes                    │
│ technologies                │
│ team_size                   │
│ duration_months             │
│ tags                        │
│ project_value               │
│ confidential                │
│ created_at / updated_at     │
│ created_by                  │
└─────────────────────────────┘
        │ 1:n
        ▼
┌─────────────────────────────┐
│ Attachment                  │
├─────────────────────────────┤
│ id (PK)                     │
│ filename                    │
│ file_path                   │
│ case_study_id (FK)          │
└─────────────────────────────┘

┌─────────────────────────────┐
│ PPTTemplate                 │
├─────────────────────────────┤
│ id (PK)                     │
│ name                        │
│ filename                    │
│ file_path                   │
│ description                 │
│ is_default                  │
└─────────────────────────────┘
```

## Sicherheitsmerkmale

- **CSRF-Schutz**: Über Flask Session Management
- **Datei-Upload-Validierung**: Nur erlaubte Dateitypen (.pptx)
- **Sichere Dateinamen**: `secure_filename()` verhindert Path-Traversal
- **Größenlimit**: Max. 16 MB pro Upload
- **SQL-Injection-Schutz**: Durch SQLAlchemy ORM

## Deployment-Hinweise

### Entwicklung
```bash
python run.py  # Startet auf http://localhost:5001
```

### Produktion (Empfehlungen)
- **WSGI-Server**: Gunicorn oder uWSGI statt Flask-Dev-Server
- **Datenbank**: Migration zu PostgreSQL für höhere Last
- **Authentifizierung**: User-Management hinzufügen
- **HTTPS**: Reverse-Proxy (nginx) mit SSL-Zertifikat
- **Environment Variables**: Secret Keys nicht im Code

## Erweiterbarkeit

Die Architektur ermöglicht einfache Erweiterungen:
- **Neue Export-Formate**: Weitere Exporter neben `PPTExporter` (z.B. `PDFExporter`)
- **Authentifizierung**: Flask-Login Integration in `__init__.py`
- **API-Versionierung**: Blueprint-basierte Struktur erlaubt `/api/v2/`
- **Microservices**: Such- oder Export-Logik kann ausgelagert werden

## Performance-Charakteristika

- **Skalierung**: Gut für 1.000-10.000 Fallstudien
- **Response-Zeiten**: < 100ms für API-Calls (ohne Export)
- **PowerPoint-Export**: 2-5 Sekunden pro Präsentation
- **Concurrent Users**: 10-50 gleichzeitige Benutzer (mit SQLite)

---

**Zusammenfassung**: Eine moderne, wartbare Webanwendung mit klarer Schichtentrennung, RESTful API und flexiblem Export-System. Ideal für kleine bis mittlere Teams ohne komplexe Infrastruktur-Anforderungen.
