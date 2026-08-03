# Bachelorarbeit IS0 27001 Maturity Assessment Web App: Verification & Validation-based ISMS Maturity System-Ansatz (V²ISMS-MS) 

Webanwendung zur Bewertung des Reifegrads von Informationssicherheits‑Kontrollen der ISO 27001.  
Das Projekt kombiniert ein Angular‑Frontend mit einem Flask‑Backend und stellt sowohl eine metrische Sicht auf Controls als auch einen geführten Maturity‑Assessment‑Workflow bereit.

## Features

- Metric View für ISO‑Controls mit hierarchischem Metrikbaum (Metric Groups, Metrics, Evidenzen).
- Session‑basierter Maturity‑Assessment‑Workflow mit Maturity-Indicator-Level‑Bewertung pro Control.
- Aggregierte Domain‑ und Overall‑Scores mit Prozentwerten und Punkten.
- REST‑API mit klar definierten JSON‑Strukturen für Frontend‑Integration.
- Modularer Angular‑Code (Services, Components) und schlankes Flask‑Backend.

## Technologie‑Stack

- **Frontend**: Angular, TypeScript, RxJS, Angular Material (optional).
- **Backend**: Python, Flask, REST‑API.
- **Sonstiges**: HTTP‑Client (`HttpClient`), JSON‑basierte Schnittstellen.

## Projektstruktur (Kurzüberblick)

- `frontend/` – Angular‑App
  - `src/app/metric-view/` – Metric View Komponenten & Services
  - `src/app/maturity-assessment/` – Maturity‑Assessment Komponenten & Services
- `backend/` – Flask‑App
  - `api/` – REST‑Routen für `/api` und `/api/maturity`
  - weitere Module für Datenzugriff und Business‑Logik

## Voraussetzungen

- Node.js (empfohlen: aktuelle LTS‑Version)
- npm 
- Angular CLI
- Python 3.x
- Flask und benötigte Python‑Abhängigkeiten 

## Installation & Setup

### Backend (Flask)

1. In das Backend‑Verzeichnis wechseln:

   ```bash
   cd backend
   ```

2. Virtuelle Umgebung erstellen und aktivieren (optional, empfohlen):

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```


3. Flask‑Server starten (Entwicklungsmodus):

   ```bash
   flask run
   ```

   Der Server lauscht standardmäßig auf `http://127.0.0.1:5000/`.

### Frontend (Angular)

1. In das Frontend‑Verzeichnis wechseln:

   ```bash
   cd frontend
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Angular‑Entwicklungsserver starten:

   ```bash
   ng serve
   ```

4. Die App im Browser öffnen:

   ```text
   http://localhost:4200
   ```

   Das Frontend erwartet das Backend unter `http://127.0.0.1:5000/api` bzw. `http://localhost:5000/api/maturity`.

## API‑Überblick

### Metric View API (`/api`)

**Controls‑Liste laden**

```http
GET /api/controls
```

Beispiel‑Antwort:

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

**Metric View für ein Control**

```http
GET /api/metric-view/control/{controlId}
```

Antwort: hierarchischer Metric‑Baum (`MetricTreeNode`), der von der Angular‑`MetricViewComponent` visualisiert wird.

### Maturity API (`/api/maturity`)

**Session anlegen**

```http
POST /api/maturity/session
```

Antwort:

```json
{
  "status": "success",
  "data": {
    "session_id": "assessment-20260729-xyz123",
    "status": "active"
  }
}
```

**Session Summary abrufen**

```http
GET /api/maturity/session/{sessionId}/summary
```

Antwort (vereinfacht):

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

Request‑Body (vereinfacht):

```json
{
  "controls": [
    {
      "control_id": "5.12",
      "answers": [
        { "assessment_level": 2, "notes": "..." }
      ]
    }
  ]
}
```

Antwort: `SubmitSessionResponseData` mit finalem Status `completed` und Summary pro Control.

## Entwicklung & Tests (in Progress)

- Frontend‑Tests können über Angular CLI ausgeführt werden:

  ```bash
  ng test
  ```

- Backend‑Tests (falls vorhanden) werden mit `pytest` oder einem anderen Testframework im `backend`‑Verzeichnis ausgeführt:

  ```bash
  pytest
  ```

## Lizenz

Dieses Projekt ist ausschließlich zu Demonstrations‑ und Forschungszwecken im Rahmen einer Bachelorarbeit gedacht.  
Benutzung des Protoypen für kommerzielle oder externe Gründe ist unter Absprache mit Ann-Jacqueline Kaldjob möglich.

## Kontakt

Autor: Ann-Jacqueline Kaldjob  
Kontext: Bachelorarbeit zum Thema Maturity‑Assessment und Metrik‑basierter Bewertung von Informationssicherheits‑Kontrollen.
