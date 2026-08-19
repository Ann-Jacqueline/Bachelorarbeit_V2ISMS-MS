# V²ISMS-MS – ISO/IEC 27001 Maturity Assessment Web App

**Verification & Validation-based ISMS Maturity System-Ansatz**

Webanwendung zur systematischen Bewertung des Reifegrads von Informationssicherheits-Kontrollen nach ISO/IEC 27001. Die Anwendung ist der prototypische Nachweis (Proof of Concept) des im Rahmen einer Bachelorarbeit entwickelten V²ISMS-MS-Frameworks, das Verifikations- und Validierungsmetriken zu einem strukturierten Reifegradmodell verbindet.

Das Projekt kombiniert ein **Angular-Frontend** mit einem **Flask-Backend** und stellt sowohl eine metrische Sicht auf einzelne Controls (Metric View) als auch einen geführten Maturity-Assessment-Workflow mit automatisierter Score-Berechnung bereit.

<p align="center">
  <video src="media/V2ISMSMS.mp4" width="80%" controls></video>
</p>

<p align="center">
  <em>Demo-Video: Durchlauf durch Metric View und Maturity-Assessment-Workflow</em>
</p>

---

## Inhaltsverzeichnis

1. [Motivation & Konzept](#motivation--konzept)
2. [Architektur](#architektur)
3. [Features](#features)
4. [Technologie-Stack](#technologie-stack)
5. [Projektstruktur](#projektstruktur)
6. [Datenmodell (Kurzüberblick)](#datenmodell-kurzüberblick)
7. [Voraussetzungen](#voraussetzungen)
8. [Installation & Setup](#installation--setup)
9. [Konfiguration](#konfiguration)
10. [API-Dokumentation](#api-dokumentation)
11. [Beispiel-Workflow (End-to-End)](#beispiel-workflow-end-to-end)
12. [Entwicklung & Tests](#entwicklung--tests)
13. [Bekannte Einschränkungen & Roadmap](#bekannte-einschränkungen--roadmap)
14. [Lizenz](#lizenz)
15. [Kontakt](#kontakt)

---

## Motivation & Konzept

ISO/IEC 27001 Annex A definiert 93 Controls, deren Umsetzungsgrad in der Praxis meist nur binär ("umgesetzt" / "nicht umgesetzt") oder anhand grober Selbsteinschätzungen bewertet wird. Audits nach ISO/IEC 17021 liefern dabei selten eine transparente, nachvollziehbare Herleitung des tatsächlichen Reifegrads einzelner Controls.

Der **V²ISMS-MS-Ansatz** (Verification & Validation-based ISMS Maturity System) begegnet diesem Problem, indem er jedes Control mit einem Satz aus **Verifikationsmetriken** (technische, messbare Nachweise) und **Validierungsmetriken** (organisatorische, prozessuale Nachweise) verknüpft. Aus der Kombination beider Metrikarten sowie zugehöriger Evidenzen wird pro Control ein **Maturity Indicator Level (MIL 0–3)** abgeleitet – angelehnt an das C2M2-Reifegradmodell (Cybersecurity Capability Maturity Model).

Diese Web-App bildet die praktische Umsetzung des Frameworks ab und demonstriert:

- wie aus einem Control-Profil und einem Metric-Profil passende Metriken automatisiert zugeordnet werden (Decision Engine, Schicht 2 des Frameworks),
- wie diese Zuordnung transparent und nachvollziehbar visualisiert wird (Metric View, Schicht 3),
- wie ein Prüfer oder Auditor auf dieser Grundlage eine geführte Reifegradbewertung durchführt und aggregierte Scores auf Control-, Domain- und Gesamtebene erhält (Maturity Evaluator, Schicht 4).

## Architektur

Die Anwendung folgt konzeptionell der vierschichtigen Architektur des V²ISMS-MS-Frameworks:

| Schicht | Bezeichnung | Zweck | Entsprechung in der App |
|---|---|---|---|
| 1 | Duale Profilbildung | Strukturierte Erfassung von Control-Profil (Kritikalität, Prüfbarkeit, Org-/Tech-Anteil …) und Metric-Profil | Backend-Datenmodell (`control_profile`, `metric_profile`) |
| 2 | Decision Engine | Attributweiser Abgleich von Control- und Metric-Profil, Fit-Score-Berechnung, Filterung inkompatibler Metriken, Ranking | Backend-Businesslogik hinter `/api/metric-view` |
| 3 | Metric View | Transparente, hierarchische Darstellung der zugeordneten Verifikations- und Validierungsmetriken inkl. Evidenzbasis | Angular-Modul `metric-view/` |
| 4 | Maturity Evaluator | Geführte Bewertung je Control (MIL 0–3), Aggregation zu Domain- und Gesamt-Scores | Angular-Modul `maturity-assessment/` + `/api/maturity` |

Technisch ist die App als klassische Client-Server-Anwendung mit getrennten Codebasen aufgebaut:

```
┌────────────────────┐        REST/JSON        ┌──────────────────────┐
│   Angular Frontend  │  <─────────────────────>│    Flask Backend      │
│  (Port 4200, dev)   │      HttpClient          │   (Port 5000, dev)    │
└────────────────────┘                          └──────────────────────┘
                                                          │
                                                          ▼
                                              Control-/Metric-/Evidenz-
                                              Datenbasis (SQL)
```

Das Frontend enthält keine Geschäftslogik zur Score-Berechnung – sämtliche Aggregationen (Fit-Score, MIL-Level, Domain-/Overall-Prozentwerte) werden serverseitig im Flask-Backend berechnet und dem Client als fertige JSON-Struktur bereitgestellt. Dies stellt sicher, dass die Bewertungslogik zentral, testbar und unabhängig vom UI-Layer bleibt.

## Features

### Metric View
- Hierarchischer Metrikbaum pro Control: Control → zugeordnete Verifikations-/Validierungsmetriken → Formeln/Messlogik → Evidenzarten → konkrete Evidenzen.
- Automatisches Profil-Matching zwischen Control-Profil und Metric-Profil (Domain, Kritikalität, Prüfbarkeit, Org-/Tech-Anteil, Änderungsfrequenz) über die Decision Engine.
- Übersichtliche Baumdarstellung im Frontend, die auch für fachfremde Auditoren nachvollziehbar sein soll (keine reine Datenbank-Ansicht).

### Maturity-Assessment-Workflow
- Session-basierter Ablauf: Eine Assessment-Session kapselt alle Bewertungen eines Durchlaufs und kann unabhängig von anderen Sessions parallel existieren.
- Geführte Bewertung pro Control anhand definierter Assessment-Level (MIL 0–3) inkl. optionaler Freitext-Notizen je Antwort.
- Zwischenspeicherung des Fortschritts über eine Summary-Abfrage, sodass der Bearbeitungsstand jederzeit eingesehen werden kann, ohne die Session abzuschließen.
- Abschließendes "Submit", das die Session final validiert, den Status auf `completed` setzt und keine weiteren Änderungen mehr zulässt.

### Aggregation & Reporting
- Automatische Berechnung von Ø-MIL-Level, erreichten/maximalen Punkten und Prozentwerten je Control.
- Aggregation auf Domain-Ebene (z. B. `ACCESS`, `GOVERNANCE`, …) sowie eine konsolidierte Gesamt-Summary (`overall`).
- Unterscheidung zwischen bewerteten (`rated_controls`) und noch offenen (`unrated_controls`) Controls, um den Bearbeitungsfortschritt sichtbar zu machen.

### Technische Eigenschaften
- Klar getrennte REST-API mit konsistenten JSON-Antwortstrukturen (`status` + `data`) für einfache Frontend-Integration und Testbarkeit.
- Modularer Angular-Code: fachliche Trennung in `metric-view/` und `maturity-assessment/`, jeweils mit eigenen Services und Komponenten.
- Schlankes, unabhängig lauffähiges Flask-Backend ohne Frontend-Kopplung – kann grundsätzlich auch von anderen Clients (CLI, andere UIs) angesprochen werden.

## Technologie-Stack

| Bereich | Technologie | Zweck |
|---|---|---|
| Frontend-Framework | Angular (TypeScript) | Komponentenbasierte Single-Page-Application |
| Reaktive Datenflüsse | RxJS | Observables für HTTP-Aufrufe und State-Handling in Services |
| UI-Komponenten | Angular Material (optional) | Konsistente, barrierearme UI-Bausteine |
| HTTP-Kommunikation | Angular `HttpClient` | Kommunikation mit der Flask-REST-API |
| Backend-Framework | Python / Flask | Leichtgewichtiger REST-API-Server |
| Schnittstellenformat | JSON | Einheitliches Austauschformat zwischen Frontend und Backend |
| Datenhaltung | SQL-basierte Control-/Metric-/Evidenz-Tabellen | Persistenz der Profile, Metriken und Assessment-Sessions |
| Tests Frontend | Angular CLI / Karma / Jasmine (Standard-Toolchain) | Unit-Tests für Komponenten und Services |
| Tests Backend | pytest (bzw. vergleichbares Framework) | Unit-/Integrationstests für API-Routen und Businesslogik |

## Projektstruktur

```
.
├── frontend/                          # Angular-Anwendung
│   ├── src/
│   │   ├── app/
│   │   │   ├── metric-view/           # Metric View: Komponenten, Services, Modelle
│   │   │   │   ├── metric-view.component.ts
│   │   │   │   ├── metric-view.service.ts
│   │   │   │   └── models/            # z. B. MetricTreeNode-Interfaces
│   │   │   ├── maturity-assessment/   # Maturity-Assessment: Komponenten, Services, Modelle
│   │   │   │   ├── session/           # Session-Erstellung, -Fortschritt, -Abschluss
│   │   │   │   ├── control-rating/    # Bewertungs-UI je Control
│   │   │   │   └── summary/           # Domain-/Overall-Score-Ansicht
│   │   │   └── shared/                # geteilte Komponenten, Pipes, Utilities
│   │   ├── assets/                    # statische Assets (Icons, Styles)
│   │   └── environments/              # Umgebungskonfiguration (API-Base-URL etc.)
│   ├── angular.json
│   └── package.json
├── backend/                            # Flask-Anwendung
│   ├── api/
│   │   ├── controls_routes.py         # REST-Routen unter /api (Controls, Metric View)
│   │   └── maturity_routes.py         # REST-Routen unter /api/maturity
│   ├── services/                      # Business-/Domänenlogik (Decision Engine, Scoring)
│   ├── models/                        # Datenzugriffs-/ORM-Schicht
│   ├── data/                          # Control-/Metric-/Evidenz-Datenbasis
│   ├── app.py                         # Flask-Einstiegspunkt
│   └── requirements.txt
├── media/
│   └── V2ISMSMS.mp4                   # Demo-Video
└── README.md
```

> Hinweis: Die genaue Benennung einzelner Unterordner kann je nach Ausbaustufe des Projekts leicht abweichen; die fachliche Trennung Metric View / Maturity Assessment auf Frontend-Seite sowie `/api` / `/api/maturity` auf Backend-Seite ist die maßgebliche Struktur.

## Datenmodell (Kurzüberblick)

Fachlich basiert die Anwendung auf folgenden zentralen Entitäten:

- **`control_raw`** – Rohdaten eines ISO/IEC-27001-Controls (Control-ID, Normtext).
- **`control_profile`** – strukturiertes Profil eines Controls (Kritikalität, Prüf-/Automatisierbarkeit, Org-/Tech-Anteil, Änderungsfrequenz, benötigte Evidenzarten).
- **`metric_profile`** – gemeinsames Profil für Verifikations- und Validierungsmetriken, matchbar gegen `control_profile`.
- **`verifikationsmetrik`** / **`validierungsmetrik`** – konkrete Metriken je Control mit Formel/Messlogik und Beschreibung.
- **`evidenzart`** / **`evidenzen`** – Klassifikation und konkrete Nachweise (Logs, Konfiguration, Dokumente, Interviews, Beobachtung), die einer Metrik zugeordnet sind.

Die Maturity-Assessment-Sessions referenzieren diese Basisdaten, ohne sie zu verändern – eine Session besteht aus Bewertungen (Assessment-Level je Control) zuzüglich der daraus abgeleiteten, serverseitig berechneten Scores.

## Voraussetzungen

- **Node.js** (empfohlen: aktuelle LTS-Version)
- **npm** (wird mit Node.js installiert)
- **Angular CLI** (`npm install -g @angular/cli`)
- **Python 3.x**
- **Flask** und weitere Python-Abhängigkeiten (siehe `backend/requirements.txt`)
- Ein moderner Browser (Chrome, Firefox, Edge) für die Frontend-Nutzung

## Installation & Setup

### Backend (Flask)

1. In das Backend-Verzeichnis wechseln:

   ```bash
   cd backend
   ```

2. Virtuelle Umgebung erstellen und aktivieren (empfohlen, um Abhängigkeiten zu isolieren):

   ```bash
   python -m venv venv
   source venv/bin/activate    # Windows: venv\Scripts\activate
   ```

3. Abhängigkeiten installieren:

   ```bash
   pip install -r requirements.txt
   ```

4. Flask-Server im Entwicklungsmodus starten:

   ```bash
   flask run
   ```

   Der Server lauscht standardmäßig auf `http://127.0.0.1:5000/`. Für automatisches Neuladen bei Codeänderungen kann zusätzlich der Debug-Modus aktiviert werden:

   ```bash
   flask --app app run --debug
   ```

5. Funktionscheck: Ein Aufruf von `GET http://127.0.0.1:5000/api/controls` sollte eine JSON-Antwort mit `status: "success"` liefern.

### Frontend (Angular)

1. In das Frontend-Verzeichnis wechseln:

   ```bash
   cd frontend
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Angular-Entwicklungsserver starten:

   ```bash
   ng serve
   ```

4. Die App im Browser öffnen:

   ```text
   http://localhost:4200
   ```

Das Frontend erwartet das Backend standardmäßig unter `http://127.0.0.1:5000/api` bzw. `http://127.0.0.1:5000/api/maturity`. Die Basis-URL ist in der Regel in `frontend/src/environments/environment.ts` (Entwicklung) bzw. `environment.prod.ts` (Produktion) hinterlegt und kann dort bei Bedarf angepasst werden.

### Troubleshooting

| Problem | Mögliche Ursache | Lösung |
|---|---|---|
| Frontend zeigt keine Daten / CORS-Fehler in der Konsole | Backend läuft nicht oder auf abweichendem Port | Backend-Status prüfen, Port in `environment.ts` abgleichen, ggf. CORS im Flask-Backend aktivieren |
| `flask run` schlägt fehl | `FLASK_APP` nicht gesetzt oder virtuelle Umgebung nicht aktiv | `venv` aktivieren, `FLASK_APP=app.py` setzen bzw. `flask --app app run` verwenden |
| `ng serve` bricht mit Abhängigkeitsfehlern ab | Node-/npm-Version zu alt oder `node_modules` inkonsistent | Aktuelle Node-LTS-Version verwenden, `node_modules` löschen und `npm install` erneut ausführen |
| Session-Submit liefert Validierungsfehler | Nicht alle Controls der Session bewertet | Summary-Endpunkt prüfen (`unrated_controls`) und offene Bewertungen ergänzen |

## Konfiguration

Typische Konfigurationsparameter, die je nach Umgebung angepasst werden können:

| Parameter | Ort | Beschreibung |
|---|---|---|
| API-Basis-URL | `frontend/src/environments/environment*.ts` | Ziel-URL des Backends, die der Angular-Client verwendet |
| Server-Port (Backend) | Startbefehl (`flask run --port <PORT>`) oder `app.py` | Port, auf dem der Flask-Server lauscht (Standard: 5000) |
| Server-Port (Frontend) | `ng serve --port <PORT>` | Port des Angular-Dev-Servers (Standard: 4200) |
| Datenbankanbindung | Backend-Konfiguration/`.env` | Verbindungsparameter zur Control-/Metric-/Evidenz-Datenbasis |

## API-Dokumentation

Alle Antworten folgen dem einheitlichen Muster `{ "status": "success" | "error", "data": ... }`. Im Fehlerfall wird zusätzlich eine aussagekräftige Fehlermeldung mitgeliefert.

### Metric View API (`/api`)

**Controls-Liste laden**

```http
GET /api/controls
```

Beispiel-Antwort:

```json
{
  "status": "success",
  "data": [
    { "control_id": "5.12", "name": "Klassifizierung von Informationen" },
    { "control_id": "6.3",  "name": "Informationssicherheitsbewusstsein, -ausbildung und -schulung" },
    { "control_id": "8.3",  "name": "Informationszugangsbeschränkung" }
  ]
}
```

**Metric View für ein Control laden**

```http
GET /api/metric-view/control/{controlId}
```

Liefert einen hierarchischen Metrikbaum (`MetricTreeNode`), der von der Angular-`MetricViewComponent` rekursiv visualisiert wird. Jeder Knoten enthält u. a.:

- den Metriktyp (Verifikation/Validierung),
- Formel bzw. Messlogik,
- zugeordnete Evidenzarten und konkrete Evidenzen.

### Maturity API (`/api/maturity`)

**Session anlegen**

```http
POST /api/maturity/session
```

Legt eine neue Assessment-Session an und liefert deren eindeutige ID.

```json
{
  "status": "success",
  "data": {
    "session_id": "assessment-20260729-xyz123",
    "status": "active"
  }
}
```

**Session-Summary abrufen**

```http
GET /api/maturity/session/{sessionId}/summary
```

Liefert den aktuellen Bearbeitungsstand inklusive aggregierter Scores, ohne die Session abzuschließen – ideal, um einen Zwischenstand anzuzeigen.

```json
{
  "status": "success",
  "data": {
    "session_id": "assessment-20260729-xyz123",
    "status": "active",
    "overall": {
      "rated_controls": 3,
      "unrated_controls": 0,
      "avg_mil_level": 2.33,
      "achieved_points": 7,
      "max_points": 9,
      "percentage": 77.8
    },
    "domains": [
      {
        "domain": "ACCESS",
        "rated_controls": 3,
        "avg_mil_level": 2.33,
        "achieved_points": 7,
        "max_points": 9,
        "percentage": 77.8
      }
    ]
  }
}
```

**Session final abschließen**

```http
POST /api/maturity/session/{sessionId}/submit
```

Request-Body (vereinfacht):

```json
{
  "controls": [
    {
      "control_id": "5.12",
      "answers": [
        { "assessment_level": 2, "notes": "Automatisierte Log-Auswertung vorhanden, manuelle Review noch unregelmäßig." }
      ]
    }
  ]
}
```

Antwort: `SubmitSessionResponseData` mit finalem Status `completed` sowie einer Summary pro Control. Nach erfolgreichem Submit gilt die Session als abgeschlossen und ist read-only.

## Beispiel-Workflow (End-to-End)

Ein typischer Durchlauf durch die Anwendung sieht wie folgt aus:

1. **Metric View erkunden** – Über `GET /api/controls` werden alle verfügbaren Controls geladen. Für ein ausgewähltes Control liefert `GET /api/metric-view/control/{controlId}` die zugeordneten Verifikations- und Validierungsmetriken samt Evidenzbasis.
2. **Session starten** – `POST /api/maturity/session` erzeugt eine neue Assessment-Session mit Status `active`.
3. **Controls bewerten** – Für jedes zu bewertende Control wird ein Assessment-Level (MIL 0–3) inklusive optionaler Notizen erfasst; der Fortschritt lässt sich jederzeit über `GET /api/maturity/session/{sessionId}/summary` einsehen.
4. **Session abschließen** – Sobald alle relevanten Controls bewertet sind, wird die Session über `POST /api/maturity/session/{sessionId}/submit` final abgeschlossen. Die Antwort enthält die konsolidierten Domain- und Overall-Scores.
5. **Ergebnisse interpretieren** – Die aggregierten Prozentwerte und MIL-Level je Domain geben Auskunft darüber, in welchen Bereichen des ISMS Nachbesserungsbedarf besteht.

## Entwicklung & Tests

**Frontend-Tests** (Angular CLI, Standard-Toolchain mit Karma/Jasmine):

```bash
cd frontend
ng test
```

**Backend-Tests** (pytest oder vergleichbares Framework):

```bash
cd backend
pytest
```

Für Beiträge/Weiterentwicklung gilt:

- Neue Backend-Routen sollten dem bestehenden Antwortformat (`status` + `data`) folgen.
- Neue Frontend-Features werden nach Möglichkeit im passenden Fachmodul (`metric-view/` oder `maturity-assessment/`) ergänzt, um die modulare Trennung zu erhalten.
- Änderungen an der Scoring-Logik (Fit-Score, MIL-Aggregation) sollten durch entsprechende Backend-Tests abgesichert werden, da sie die fachliche Kernaussage der Anwendung betreffen.

## Bekannte Einschränkungen & Roadmap

Da es sich um einen im Rahmen einer Bachelorarbeit entstandenen Forschungsprototyp handelt, bestehen aktuell folgende Einschränkungen:

- Kein produktionsreifes Authentifizierungs-/Autorisierungskonzept für Mehrbenutzerbetrieb.
- Die Datenbasis (Control-/Metric-Katalog) deckt den im Rahmen der Arbeit definierten Scope ab und ist nicht als vollständiger, offiziell zertifizierter ISO/IEC-27001-Metrikkatalog zu verstehen.
- Persistenz und Skalierung sind auf den Nachweis des Konzepts ausgelegt, nicht auf produktiven Mehrmandantenbetrieb.

Mögliche Erweiterungen für künftige Iterationen:

- Rollen- und Rechteverwaltung für mehrere Auditoren/Prüfer pro Session.
- Export von Assessment-Ergebnissen (PDF/Excel) für Auditberichte.
- Historisierung mehrerer Assessment-Durchläufe zur Reifegrad-Trendanalyse über die Zeit.

## Lizenz

Dieses Projekt ist ausschließlich zu Demonstrations- und Forschungszwecken im Rahmen einer Bachelorarbeit gedacht. Die Nutzung des Prototyps für kommerzielle oder sonstige externe Zwecke ist nur nach vorheriger Absprache mit Ann-Jacqueline Kaldjob zulässig.

## Kontakt

**Autorin:** Ann-Jacqueline Kaldjob
**Kontext:** Bachelorarbeit zum Thema Maturity-Assessment und metrik-basierter Bewertung von Informationssicherheits-Kontrollen nach ISO/IEC 27001 (V²ISMS-MS-Ansatz).
