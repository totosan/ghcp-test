# Benutzerhandbuch - Case Study Manager

## Inhaltsverzeichnis

1. [Einführung](#einführung)
2. [Erste Schritte](#erste-schritte)
3. [Dashboard](#dashboard)
4. [Case Studies verwalten](#case-studies-verwalten)
5. [Suchen und Filtern](#suchen-und-filtern)
6. [PowerPoint-Export](#powerpoint-export)
7. [Template-Verwaltung](#template-verwaltung)
8. [Tipps und Best Practices](#tipps-und-best-practices)
9. [Häufig gestellte Fragen](#häufig-gestellte-fragen)
10. [Fehlerbehebung](#fehlerbehebung)

---

## Einführung

### Was ist der Case Study Manager?

Der Case Study Manager ist eine webbasierte Anwendung für IT-Beratungsunternehmen, die es ermöglicht, Projektreferenzen und Case Studies professionell zu sammeln, zu verwalten und für Ausschreibungen (RfPs) und Angebote zu exportieren.

### Hauptfunktionen

- ✅ **Zentrale Verwaltung** aller Projektreferenzen
- ✅ **Intelligente Suche** mit Filtern nach Branche, Jahr und Technologien
- ✅ **PowerPoint-Export** mit individuellen Vorlagen
- ✅ **Dashboard** mit Statistiken und Schnellzugriff
- ✅ **Markierung vertraulicher** Projekte

### Für wen ist diese Anwendung?

- Sales-Teams für Angebotserstellung
- Account Manager für Kundenpräsentationen
- Marketing-Teams für Referenzmaterial
- Projektleiter zur Dokumentation abgeschlossener Projekte

---

## Erste Schritte

### Anwendung starten

1. Öffnen Sie Ihren Webbrowser
2. Navigieren Sie zu: `http://localhost:5000`
3. Das Dashboard wird automatisch angezeigt

### Benutzeroberfläche im Überblick

Die Anwendung besteht aus vier Hauptbereichen:

#### Navigationsleiste (oben)
- **Case Study Manager** (Logo) - Zurück zum Dashboard
- **View Cases** - Alle Case Studies anzeigen
- **Add Case** - Neue Case Study erstellen
- **Templates** - PowerPoint-Vorlagen verwalten

#### Hauptbereich
Je nach Auswahl sehen Sie hier:
- Dashboard mit Statistiken
- Liste aller Case Studies
- Formular zum Erstellen/Bearbeiten
- Template-Verwaltung

---

## Dashboard

### Übersicht

Das Dashboard ist Ihre Startseite und bietet einen schnellen Überblick über Ihre Case Studies.

![Dashboard-Beispiel]

### Dashboard-Elemente

#### 1. Statistik-Karte
- **Gesamtanzahl** der gespeicherten Case Studies
- Wird automatisch aktualisiert

#### 2. Quick Actions (Schnellzugriff)
Drei Buttons für häufige Aktionen:
- **Add New Case Study** - Neue Referenz hinzufügen
- **Search & Filter** - In Case Studies suchen
- **Manage Templates** - Vorlagen verwalten

#### 3. Recent Case Studies (Neueste Case Studies)
Zeigt die 5 zuletzt erstellten oder aktualisierten Case Studies:
- Projektname und Kunde
- Branche und Jahr
- Quick-Actions pro Eintrag:
  - **Ansehen** (Auge-Symbol) - Details anzeigen
  - **Bearbeiten** (Stift-Symbol) - Direkt bearbeiten
  - **Export** (PowerPoint-Symbol) - Als PPT exportieren

### Navigation vom Dashboard

Klicken Sie auf:
- Eine Case Study → Detailansicht öffnet sich
- Quick Action Button → Direkt zur gewünschten Funktion
- Navigationsleiste → Zu anderen Bereichen wechseln

---

## Case Studies verwalten

### Neue Case Study erstellen

#### Schritt 1: Formular öffnen
1. Klicken Sie auf **"Add Case"** in der Navigationsleiste
2. Oder klicken Sie auf **"Add New Case Study"** im Dashboard

#### Schritt 2: Pflichtfelder ausfüllen (mit * markiert)

**Projekt-Informationen:**
- **Project Name*** - Name des Projekts (z.B. "Cloud Migration ABC GmbH")
- **Client Name*** - Kundenname (z.B. "ABC GmbH")

**Projekt-Beschreibung:**
- **Challenge/Problem*** - Welche Herausforderung hatte der Kunde?
  ```
  Beispiel: "Das Unternehmen nutzte veraltete On-Premise-Systeme, 
  die hohe Wartungskosten verursachten und nicht skalierbar waren."
  ```

- **Solution*** - Welche Lösung haben Sie implementiert?
  ```
  Beispiel: "Migration der gesamten IT-Infrastruktur in die AWS Cloud 
  mit Implementation eines Container-basierten Microservices-Ansatzes."
  ```

- **Outcomes/Results*** - Welche Ergebnisse wurden erzielt?
  ```
  Beispiel: "Reduktion der IT-Kosten um 40%, Verbesserung der 
  Systemverfügbarkeit auf 99,9%, Skalierbarkeit um das 10-fache."
  ```

#### Schritt 3: Optionale Felder ausfüllen

**Projekt-Details:**
- **Industry** - Branche (z.B. "Healthcare", "Finance", "Retail")
- **Project Year** - Projektjahr (z.B. 2024)
- **Project Value** - Projektwert (z.B. "$100K-$500K")

**Technische Details:**
- **Technologies Used** - Verwendete Technologien (komma-getrennt)
  ```
  Beispiel: AWS, Docker, Kubernetes, Python, React
  ```
- **Team Size** - Teamgröße (Anzahl Personen)
- **Duration (months)** - Projektdauer in Monaten

**Zusätzliche Informationen:**
- **Tags** - Schlagwörter für bessere Suche (komma-getrennt)
  ```
  Beispiel: cloud, migration, microservices, AWS
  ```
- **Created By** - Ihr Name als Ersteller

**Vertraulichkeit:**
- ☑ **Mark as Confidential** - Markierung für vertrauliche Projekte

#### Schritt 4: Speichern
- Klicken Sie auf **"Save Case Study"**
- Bei Erfolg werden Sie zur Case-Liste weitergeleitet
- Die neue Case Study erscheint in der Übersicht

### Case Study bearbeiten

#### Methode 1: Über die Liste
1. Navigieren Sie zu **"View Cases"**
2. Finden Sie die gewünschte Case Study
3. Klicken Sie auf das **Stift-Symbol** (Edit)
4. Nehmen Sie Ihre Änderungen vor
5. Klicken Sie auf **"Save Case Study"**

#### Methode 2: Über die Detailansicht
1. Öffnen Sie die Case Study durch Klick auf **"View"**
2. Klicken Sie auf **"Edit"** im Modal-Fenster
3. Bearbeiten Sie die Felder
4. Speichern Sie die Änderungen

### Case Study löschen

⚠️ **Achtung:** Das Löschen kann nicht rückgängig gemacht werden!

1. Öffnen Sie die Case Study-Detailansicht
2. Klicken Sie auf **"Delete"** (roter Button)
3. Bestätigen Sie die Sicherheitsabfrage
4. Die Case Study wird dauerhaft gelöscht

### Case Study Details ansehen

1. Klicken Sie auf das **Augen-Symbol** oder den Namen
2. Ein Modal-Fenster öffnet sich mit allen Details:
   - Projektnamen und Kunde
   - Branche, Jahr und Projektwert
   - Vollständige Challenge-Beschreibung
   - Implementierte Lösung
   - Erzielte Ergebnisse
   - Technische Details (Technologien, Team, Dauer)
   - Tags und Metadaten
   - Erstellt von und Datum

3. Aktionen im Detail-Modal:
   - **Export to PowerPoint** - Direkt exportieren
   - **Edit** - Bearbeiten
   - **Delete** - Löschen
   - **Close** - Fenster schließen

---

## Suchen und Filtern

### Einfache Suche

#### Volltext-Suche
1. Navigieren Sie zu **"View Cases"**
2. Geben Sie im **Suchfeld** einen Begriff ein
3. Drücken Sie **Enter** oder klicken Sie auf **"Apply Filters"**

Die Suche durchsucht:
- Projektnamen
- Kundennamen
- Challenge-Beschreibungen
- Lösungen
- Ergebnisse
- Technologien
- Tags

**Beispiele:**
```
"AWS"           → Findet alle Projekte mit AWS
"Migration"     → Findet alle Migrations-Projekte
"Healthcare"    → Findet alle Healthcare-Projekte
```

### Erweiterte Filter

#### Filter-Optionen

**1. Industry (Branche)**
- Dropdown mit allen verfügbaren Branchen
- Wählen Sie eine spezifische Branche oder "All Industries"

**2. Year (Jahr)**
- Dropdown mit allen Projektjahren
- Filtert nach Projektjahr

**3. Technologies (Technologien)**
- Freitextfeld für Technologie-Suche
- Mehrere Begriffe komma-getrennt möglich
```
Beispiel: Python, AWS
```

#### Filter anwenden
1. Setzen Sie die gewünschten Filter
2. Klicken Sie auf **"Apply Filters"**
3. Die Liste wird entsprechend gefiltert

#### Filter zurücksetzen
- Klicken Sie auf **"Clear All"**
- Alle Filter werden entfernt
- Die vollständige Liste wird angezeigt

### Sortierung

#### Sortier-Optionen
Wählen Sie in den Dropdown-Menüs oben rechts:

**Sort By (Sortieren nach):**
- **Last Updated** - Zuletzt aktualisiert (Standard)
- **Created Date** - Erstellungsdatum
- **Project Name** - Projektname (alphabetisch)
- **Year** - Projektjahr

**Sort Order (Reihenfolge):**
- **↓ Desc** - Absteigend (neueste zuerst)
- **↑ Asc** - Aufsteigend (älteste zuerst)

### Suchergebnisse

Die Ergebnisanzeige zeigt:
- **Badge mit Anzahl** - Wie viele Case Studies gefunden wurden
- **Karten-Ansicht** - Jede Case Study als Karte mit:
  - Projektname und Kunde
  - Branche und Jahr (wenn vorhanden)
  - Ausschnitt der Challenge
  - Tags
  - Vertraulichkeits-Badge (wenn markiert)
  - Action-Buttons (View, Edit, Export)

---

## PowerPoint-Export

### Voraussetzungen

Bevor Sie exportieren können:
1. Mindestens eine PowerPoint-Vorlage muss hochgeladen sein
2. Eine Vorlage sollte als "Default" markiert sein

### Einzelnen Case exportieren

#### Methode 1: Aus der Liste
1. Finden Sie die gewünschte Case Study
2. Klicken Sie auf das **PowerPoint-Symbol** (📊)
3. Der Download startet automatisch

#### Methode 2: Aus der Detailansicht
1. Öffnen Sie die Case Study-Details
2. Klicken Sie auf **"Export to PowerPoint"**
3. Die Datei wird generiert und heruntergeladen

### Export-Prozess

1. **Vorlage auswählen**
   - Standard: Die als "Default" markierte Vorlage wird verwendet
   - Optional: Spezifische Vorlage kann ausgewählt werden (zukünftige Funktion)

2. **Generierung**
   - Die Anwendung ersetzt alle Platzhalter in der Vorlage
   - Fehlende Werte werden leer gelassen

3. **Download**
   - Dateiname: `[Projektname].pptx`
   - Wird automatisch heruntergeladen
   - Kann sofort geöffnet und weiterbearbeitet werden

### Export-Daten

Folgende Daten werden exportiert:

| Kategorie | Felder |
|-----------|--------|
| **Basis-Info** | Projektname, Kunde, Branche, Jahr |
| **Beschreibung** | Challenge, Solution, Outcomes |
| **Technisches** | Technologien, Teamgröße, Dauer |
| **Finanzielles** | Projektwert |
| **Meta** | Tags, Ersteller, Exportdatum |

---

## Template-Verwaltung

### PowerPoint-Vorlagen verstehen

#### Was ist eine Vorlage?

Eine PowerPoint-Vorlage ist eine `.pptx`-Datei mit:
- Ihrem Corporate Design
- Platzhaltern für Case Study-Daten
- Vordefinierten Layouts

#### Platzhalter-System

Platzhalter werden mit doppelten geschweiften Klammern markiert:
```
{{PLATZHALTER_NAME}}
```

### Verfügbare Platzhalter

#### Projekt-Informationen
```
{{PROJECT_NAME}}     - Projektname (z.B. "Cloud Migration Project")
{{CLIENT}}           - Kundenname (z.B. "ABC GmbH")
{{INDUSTRY}}         - Branche (z.B. "Healthcare")
{{YEAR}}             - Projektjahr (z.B. "2024")
```

#### Projekt-Beschreibung
```
{{CHALLENGE}}        - Herausforderung/Problem
{{SOLUTION}}         - Implementierte Lösung
{{OUTCOMES}}         - Erzielte Ergebnisse
```

#### Technische Details
```
{{TECHNOLOGIES}}     - Verwendete Technologien (z.B. "AWS, Python, React")
{{TEAM_SIZE}}        - Teamgröße (z.B. "5 people")
{{DURATION}}         - Projektdauer (z.B. "6 months")
```

#### Zusätzliche Informationen
```
{{PROJECT_VALUE}}    - Projektwert (z.B. "$100K-$500K")
{{TAGS}}             - Schlagwörter (z.B. "cloud, migration, AWS")
{{CREATED_BY}}       - Ersteller (z.B. "Max Mustermann")
{{EXPORT_DATE}}      - Exportdatum (wird automatisch gesetzt)
```

### Vorlage erstellen

#### Schritt 1: PowerPoint-Datei vorbereiten

1. Öffnen Sie PowerPoint
2. Erstellen Sie eine neue Präsentation
3. Fügen Sie Ihr Corporate Design hinzu (Logo, Farben, Schriften)

#### Schritt 2: Slides gestalten

**Beispiel-Struktur:**

**Folie 1 - Titel**
```
{{PROJECT_NAME}}
Kunde: {{CLIENT}}
Jahr: {{YEAR}}
```

**Folie 2 - Übersicht**
```
Projekt-Übersicht
━━━━━━━━━━━━━━━━━

Branche:         {{INDUSTRY}}
Projektjahr:     {{YEAR}}
Projektdauer:    {{DURATION}}
Teamgröße:       {{TEAM_SIZE}}
Projektwert:     {{PROJECT_VALUE}}
```

**Folie 3 - Herausforderung**
```
Die Herausforderung
━━━━━━━━━━━━━━━━━━━

{{CHALLENGE}}
```

**Folie 4 - Lösung**
```
Unsere Lösung
━━━━━━━━━━━━━

{{SOLUTION}}

Verwendete Technologien:
{{TECHNOLOGIES}}
```

**Folie 5 - Ergebnisse**
```
Erzielte Ergebnisse
━━━━━━━━━━━━━━━━━━

{{OUTCOMES}}
```

#### Schritt 3: Speichern
- Speichern Sie die Datei als `.pptx` (nicht .ppt!)
- Verwenden Sie einen aussagekräftigen Namen
- Beispiel: `CaseStudy_Template_Standard_2024.pptx`

### Vorlage hochladen

1. Navigieren Sie zu **"Templates"** in der Navigation
2. Im Bereich **"Upload New Template"**:
   - **Template Name**: Geben Sie einen Namen ein (z.B. "Standard Template 2024")
   - **Description**: Optionale Beschreibung (z.B. "Standard-Vorlage mit neuem Design")
   - **PowerPoint File**: Wählen Sie Ihre `.pptx`-Datei
   - ☑ **Set as Default Template**: Aktivieren, wenn dies die Standardvorlage sein soll
3. Klicken Sie auf **"Upload Template"**

### Vorlagen verwalten

#### Vorlagen-Liste
Im Bereich **"Uploaded Templates"** sehen Sie:
- Name der Vorlage
- Beschreibung
- Upload-Datum
- Status (Default oder nicht)

#### Default-Vorlage setzen
1. Finden Sie die gewünschte Vorlage
2. Klicken Sie auf **"Set as Default"**
3. Diese Vorlage wird nun für alle Exporte verwendet

#### Vorlage löschen
1. Klicken Sie auf **"Delete"** bei der Vorlage
2. Bestätigen Sie die Aktion
3. ⚠️ **Achtung**: Die Datei wird dauerhaft gelöscht

### Platzhalter-Leitfaden

Im Template-Bereich finden Sie:
- **"Template Placeholder Guide"** - Übersicht aller verfügbaren Platzhalter
- Kopieren Sie die Platzhalter direkt in Ihre PowerPoint-Vorlage
- Groß-/Kleinschreibung beachten!

### Best Practices für Vorlagen

#### ✅ Empfehlungen

1. **Konsistente Formatierung**
   - Verwenden Sie einheitliche Schriften und Farben
   - Behalten Sie das Corporate Design bei

2. **Klare Struktur**
   - Logischer Aufbau: Übersicht → Problem → Lösung → Ergebnisse
   - Nicht mehr als 5-7 Folien pro Template

3. **Flexible Textboxen**
   - Textboxen sollten dynamisch wachsen können
   - Genug Platz für längere Texte einplanen

4. **Visuelle Elemente**
   - Fügen Sie Grafiken und Icons hinzu
   - Trennen Sie Bereiche visuell

5. **Metadaten-Folie**
   - Letzte Folie mit Kontaktdaten und Export-Informationen
   ```
   Erstellt von: {{CREATED_BY}}
   Exportiert am: {{EXPORT_DATE}}
   ```

#### ❌ Häufige Fehler vermeiden

1. **Falsche Platzhalter**
   - ❌ `{PROJECT_NAME}` - Einfache Klammern
   - ❌ `{{ PROJECT_NAME }}` - Leerzeichen
   - ✅ `{{PROJECT_NAME}}` - Korrekt

2. **Groß-/Kleinschreibung**
   - ❌ `{{project_name}}` - Kleinbuchstaben
   - ✅ `{{PROJECT_NAME}}` - Großbuchstaben

3. **Falsches Dateiformat**
   - ❌ `.ppt` - Altes Format
   - ✅ `.pptx` - Neues Format

---

## Tipps und Best Practices

### Daten-Qualität

#### Vollständige Dokumentation
- Füllen Sie möglichst alle Felder aus
- Auch optionale Felder erhöhen den Wert der Case Study
- Nutzen Sie Tags großzügig für bessere Auffindbarkeit

#### Strukturierte Challenge-Beschreibung
```
Format:
- Ausgangssituation
- Spezifische Probleme
- Anforderungen des Kunden
```

#### Messbare Outcomes
```
Gut: "Reduktion der Kosten um 40%, Verbesserung der Performance um 3x"
Schlecht: "Es gab Verbesserungen"
```

### Effektive Nutzung

#### Regelmäßige Pflege
- Aktualisieren Sie Case Studies nach Projektabschluss
- Ergänzen Sie nachträglich erkannte Erfolge
- Halten Sie Technologie-Listen aktuell

#### Tagging-Strategie
Verwenden Sie einheitliche Tags:
- **Technologie**: `AWS`, `Azure`, `Python`, `React`
- **Projekttyp**: `migration`, `development`, `optimization`
- **Industrie**: `healthcare`, `finance`, `retail`
- **Methoden**: `agile`, `devops`, `cloud-native`

#### Vertraulichkeit beachten
- Markieren Sie sensible Projekte als vertraulich
- Anonymisieren Sie Kundennamen wenn nötig
- Abstimmen Sie Veröffentlichungen mit dem Kunden ab

### Zusammenarbeit im Team

#### Ersteller-Angabe
- Geben Sie immer Ihren Namen an
- Ermöglicht Rückfragen
- Schafft Verantwortlichkeit

#### Konsistente Namensgebung
```
Projektname: [Kunde] - [Projekttyp] - [Jahr]
Beispiel: "ABC GmbH - Cloud Migration - 2024"
```

### Export-Optimierung

#### Vorlage testen
- Erstellen Sie Test-Case Studies
- Exportieren und prüfen Sie das Ergebnis
- Optimieren Sie die Vorlage wenn nötig

#### Multiple Vorlagen
- Standard-Vorlage für schnelle Exporte
- Detaillierte Vorlage für wichtige Angebote
- Branchenspezifische Vorlagen

---

## Häufig gestellte Fragen

### Allgemeine Fragen

**F: Wie viele Case Studies kann ich speichern?**
A: Es gibt keine technische Obergrenze. Die Anwendung nutzt SQLite und kann tausende Case Studies verwalten.

**F: Kann ich Bilder oder Anhänge hochladen?**
A: Die Funktion für Anhänge ist vorbereitet, aber noch nicht implementiert. Aktuell nur Text-Daten.

**F: Können mehrere Benutzer gleichzeitig arbeiten?**
A: Ja, aber es gibt aktuell keine Benutzer-Authentifizierung. Für Produktivumgebungen sollte dies ergänzt werden.

**F: Werden meine Daten automatisch gesichert?**
A: Die Daten werden in der Datenbank `case_studies.db` gespeichert. Regelmäßige Backups dieser Datei werden empfohlen.

### Suche und Filter

**F: Warum finde ich eine Case Study nicht?**
A: Prüfen Sie:
- Sind Filter aktiv? → Clear All klicken
- Rechtschreibung korrekt?
- Ist das Feld ausgefüllt, nach dem Sie suchen?

**F: Kann ich nach mehreren Technologien gleichzeitig suchen?**
A: Ja, geben Sie mehrere Begriffe komma-getrennt ein: `Python, AWS, Docker`

**F: Wie funktioniert die Volltext-Suche genau?**
A: Die Suche durchsucht alle Textfelder (case-insensitive) und findet Teil-Übereinstimmungen.

### PowerPoint-Export

**F: Warum werden manche Platzhalter nicht ersetzt?**
A: Mögliche Gründe:
- Feld ist nicht ausgefüllt (bleibt leer)
- Platzhalter falsch geschrieben
- Leerzeichen in den Klammern: `{{ NAME }}` statt `{{NAME}}`

**F: Kann ich die exportierte Datei weiterbearbeiten?**
A: Ja, absolut! Die Datei ist eine normale PowerPoint-Datei und kann beliebig angepasst werden.

**F: Kann ich mehrere Case Studies auf einmal exportieren?**
A: Aktuell nicht. Dies ist als zukünftige Funktion geplant (Batch-Export).

**F: Warum sieht die Formatierung in der exportierten Datei anders aus?**
A: Die Formatierung kommt von Ihrer Vorlage. Passen Sie die Textbox-Eigenschaften in der Vorlage an.

### Vorlagen

**F: Muss ich für jede Case Study eine separate Vorlage haben?**
A: Nein, normalerweise reicht eine Standard-Vorlage. Zusätzliche Vorlagen können für spezielle Zwecke erstellt werden.

**F: Kann ich Vorlagen mit anderen teilen?**
A: Ja, die `.pptx`-Datei kann einfach weitergegeben werden. Andere laden sie dann in ihre Installation hoch.

**F: Was passiert wenn ich die Default-Vorlage lösche?**
A: Exporte funktionieren nicht mehr, bis eine neue Default-Vorlage gesetzt wird.

### Technische Fragen

**F: Wo werden die Daten gespeichert?**
A: In der SQLite-Datenbank `case_studies.db` im Hauptverzeichnis.

**F: Kann ich die Anwendung auf einem Server betreiben?**
A: Ja, siehe `DEPLOYMENT.md` für Produktiv-Deployment mit Gunicorn und HTTPS.

**F: Wie kann ich meine Daten exportieren?**
A: Backup der `case_studies.db`-Datei. Für CSV/JSON-Export könnte ein Custom-Script erstellt werden.

---

## Fehlerbehebung

### Häufige Probleme

#### Problem: Anwendung startet nicht

**Symptome:**
- Fehlermeldung beim Start
- Seite lädt nicht

**Lösungen:**
1. Prüfen Sie ob Port 5000 verfügbar ist:
   ```bash
   lsof -i :5000
   ```

2. Starten Sie die Anwendung neu:
   ```bash
   python run.py
   ```

3. Prüfen Sie die Abhängigkeiten:
   ```bash
   pip install -r requirements.txt
   ```

#### Problem: Datenbank-Fehler

**Symptome:**
- "Database locked"
- "No such table"

**Lösungen:**
1. Datenbank neu erstellen:
   ```bash
   rm case_studies.db
   python run.py
   ```
   ⚠️ **Achtung**: Alle Daten gehen verloren!

2. Datenbank-Backup wiederherstellen:
   ```bash
   cp case_studies_backup.db case_studies.db
   ```

#### Problem: Upload funktioniert nicht

**Symptome:**
- Fehlermeldung bei Template-Upload
- "File too large"

**Lösungen:**
1. Prüfen Sie die Dateigröße (max. 16MB):
   ```bash
   ls -lh ihre_datei.pptx
   ```

2. Prüfen Sie das Dateiformat (.pptx, nicht .ppt)

3. Prüfen Sie Schreibrechte im Upload-Ordner:
   ```bash
   ls -la uploads/
   ```

#### Problem: Export schlägt fehl

**Symptome:**
- "Export failed"
- Heruntergeladene Datei ist beschädigt

**Lösungen:**
1. Prüfen Sie ob eine Default-Vorlage existiert
2. Testen Sie die Vorlage in PowerPoint (öffnen und speichern)
3. Prüfen Sie die Platzhalter in der Vorlage
4. Prüfen Sie den Server-Log für Details

#### Problem: Suche zeigt keine Ergebnisse

**Symptome:**
- "0 Case Studies" angezeigt
- Liste ist leer

**Lösungen:**
1. Klicken Sie auf "Clear All" um Filter zu entfernen
2. Prüfen Sie ob überhaupt Case Studies existieren (Dashboard-Zähler)
3. Öffnen Sie die Browser-Konsole (F12) für JavaScript-Fehler

### Browser-Probleme

#### Cache leeren
1. Drücken Sie `Ctrl + Shift + R` (Windows/Linux)
2. Oder `Cmd + Shift + R` (Mac)

#### Browser-Konsole öffnen
1. Drücken Sie `F12`
2. Wechseln Sie zum Tab "Console"
3. Prüfen Sie auf Fehlermeldungen

### Log-Dateien

Bei Problemen prüfen Sie:
1. **Terminal-Output** beim Start der Anwendung
2. **Browser-Konsole** (F12 → Console)
3. **Netzwerk-Tab** (F12 → Network) für API-Fehler

### Support und Hilfe

Bei weiteren Problemen:
1. Prüfen Sie die `README.md` für technische Details
2. Schauen Sie in `ARCHITECTURE.md` für System-Informationen
3. Kontaktieren Sie Ihr Entwicklungsteam

---

## Anhang

### Tastaturkürzel

Derzeit keine speziellen Tastaturkürzel implementiert.
Standard-Browser-Shortcuts funktionieren:
- `Ctrl/Cmd + F` - Suche auf der Seite
- `F5` - Seite neu laden
- `Ctrl/Cmd + Click` - Link in neuem Tab öffnen

### Systemanforderungen

**Browser:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Server:**
- Python 3.8+
- 512 MB RAM
- 1 GB Festplattenspeicher

### Glossar

- **Case Study**: Projektreferenz mit detaillierter Beschreibung
- **Challenge**: Problem oder Herausforderung des Kunden
- **Outcome**: Ergebnis oder Erfolg des Projekts
- **Template**: PowerPoint-Vorlage mit Platzhaltern
- **Placeholder**: Textmarker der durch echte Daten ersetzt wird (z.B. `{{PROJECT_NAME}}`)
- **Facets**: Filter-Optionen basierend auf vorhandenen Daten
- **Confidential**: Als vertraulich markierte Information

### Versionshistorie

**Version 1.0** (aktuell)
- Basis-Funktionalität
- CRUD-Operationen für Case Studies
- PowerPoint-Export
- Template-Verwaltung
- Suche und Filter
- Dashboard

**Geplante Features:**
- Benutzer-Authentifizierung
- Batch-Export
- PDF-Export
- Datei-Anhänge
- erweiterte Analytics
- Multi-Language Support

---

## Schnellreferenz

### Navigation
| Aktion | Navigation |
|--------|-----------|
| Dashboard | Logo klicken |
| Case Studies anzeigen | "View Cases" |
| Neue Case Study | "Add Case" |
| Vorlagen verwalten | "Templates" |

### Case Study Aktionen
| Aktion | Symbol/Button |
|--------|---------------|
| Ansehen | 👁️ View |
| Bearbeiten | ✏️ Edit |
| Löschen | 🗑️ Delete |
| Exportieren | 📊 Export |

### Pflichtfelder
- ✅ Project Name
- ✅ Client Name
- ✅ Challenge
- ✅ Solution
- ✅ Outcomes

### Export-Platzhalter (Auswahl)
```
{{PROJECT_NAME}}    {{CLIENT}}          {{INDUSTRY}}
{{YEAR}}            {{CHALLENGE}}       {{SOLUTION}}
{{OUTCOMES}}        {{TECHNOLOGIES}}    {{TEAM_SIZE}}
{{DURATION}}        {{PROJECT_VALUE}}   {{TAGS}}
{{CREATED_BY}}      {{EXPORT_DATE}}
```

---

**Ende des Benutzerhandbuchs**

Version 1.0 - Oktober 2025

Bei Fragen oder Problemen wenden Sie sich bitte an Ihr Entwicklungsteam.

**Viel Erfolg mit dem Case Study Manager! 🚀**
