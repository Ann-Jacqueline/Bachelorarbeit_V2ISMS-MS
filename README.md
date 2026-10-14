# V²ISMS-MS – ISO/IEC 27001 Maturity Assessment Web App

**Verification & Validation-based ISMS Maturity System-Ansatz**

Webanwendung zur systematischen Bewertung des Reifegrads von Informationssicherheits-Kontrollen nach ISO/IEC 27001. Die Anwendung ist der prototypische Nachweis (Proof of Concept) des im Rahmen einer Bachelorarbeit entwickelten V²ISMS-MS-Frameworks, das Verifikations- und Validierungsmetriken zu einem strukturierten Reifegradmodell verbindet.

Das Projekt kombiniert ein **Angular-Frontend** mit einem **Flask-Backend** und stellt sowohl eine metrische Sicht auf einzelne Controls (Metric View) als auch einen geführten Maturity-Assessment-Workflow mit automatisierter Score-Berechnung bereit.

> **Wichtiger Hinweis zum Projektstand:** Diese README dokumentiert **zwei Stände**. Abschnitt [1) STAND BACHELORARBEIT (Endzustand) – OUTDATED](#1-stand-bachelorarbeit-endzustand--outdated) beschreibt den ursprünglichen, rein deterministischen Prototyp. Abschnitt [2) STAND JETZT (Status Quo / aktueller Prototyp)](#2-stand-jetzt-status-quo--aktueller-prototyp) beschreibt den weiterentwickelten Stand inklusive der Transformation **von deterministisch → agentisch**.

https://github.com/user-attachments/assets/4639b4ea-f0bf-4cd8-94fd-4605bd1a44ee

---

## Inhaltsverzeichnis

1. [Motivation & Konzept](#1-motivation--konzept)
2. [Architektur](#2-architektur)
3. [Features](#3-features)
4. [Technologie-Stack](#4-technologie-stack)
5. [Projektstruktur](#5-projektstruktur)
6. [Datenmodell (Kurzüberblick)](#6-datenmodell-kurzüberblick)
7. [Voraussetzungen](#7-voraussetzungen)
8. [Installation & Setup](#8-installation--setup)
9. [Konfiguration](#9-konfiguration)
10. [API-Dokumentation](#10-api-dokumentation)
11. [Beispiel-Workflow (End-to-End)](#11-beispiel-workflow-end-to-end)
12. [Entwicklung & Tests](#12-entwicklung--tests)
13. [Bekannte Einschränkungen & Roadmap](#13-bekannte-einschränkungen--roadmap)
14. [Lizenz](#14-lizenz)
15. [Kontakt](#15-kontakt)

---

## 1. Motivation & Konzept

### 1.1 Ausgangsproblem

Informationssicherheits-Audits nach ISO 27001 beantworten die Frage: *„Wie reif (mature) ist die Umsetzung eines bestimmten Sicherheits-Controls in einer Organisation – und welche Metriken helfen konkret bei der Implementierung der Control?"*

In der Praxis passiert ISMS-Reifegradbewertung heute meist **subjektiv**: Ein Auditor schätzt „gut/mittel/schlecht" ohne einheitliche, wiederholbare Metrik. V²ISMS-MS ersetzt dieses Bauchgefühl durch ein **standardisiertes Metrik-Modell**: Jedes Control wird mit konkreten, messbaren Metriken verknüpft, aus denen sich ein reproduzierbarer Reifegrad-Score (MIL – Maturity Indicator Level, 0–3) ableitet.

### 1.2 Die fünf Bausteine

1. **Control-/Metric-Katalog** – die Wissensbasis: welche ISO-27001-Controls existieren, welche Metriken passen zu welchem Control.
2. **Decision Engine** – ordnet automatisch Metriken zu Controls zu (per Namenskonvention/Regelwerk) und berechnet einen Fit-Score.
3. **Metric View** – zeigt Auditor:innen die passenden Metriken samt Nachweisen (Evidenzen) transparent an.
4. **Maturity Evaluator** – sammelt die Auditor-Antworten pro Control und berechnet daraus den finalen MIL-Score.
5. **Summary View** – aggregiert alle MIL-Antworten zu einem Gesamtbericht: Gesamt-Score des ISMS sowie Gesamt-Score je Control-Domain.

### 1.3 Das Grundprinzip: Selbstauskunft statt Fremdbewertung

**Das System bewertet nicht selbst.** Es ist bewusst ein **Selbstauskunfts-Interface**, kein Auditor: Jede Metrik = eine Frage, der Mensch beantwortet sie mit seiner eigenen Einschätzung (MIL 0–3), das System aggregiert diese Antworten nur deterministisch zu Domain- und Gesamt-Scores. **Das soll so bleiben** – das ist keine Lücke, sondern ein Design-Prinzip.

### 1.4 Was der deterministische Kern leistet

- Zuverlässige, jederzeit reproduzierbare MIL-Score-Berechnung aus vordefinierten Metriken.
- Automatische Vorfilterung, welche Metriken zu welchem Control gehören (per Namensmuster).
- Fragebogen-Interface für die MIL-Selbstauskunft pro Metrik.
- Aggregation der Nutzerantworten zu einem reproduzierbaren Gesamt-Score und Domain-Scores.
- Nachvollziehbare, prüfbare Aggregationslogik – jeder Score lässt sich exakt zurückrechnen.
- Persistente Verwaltung von Controls, Metriken, Evidenzen, Sessions in einer strukturierten Datenbank.

### 1.5 Die drei Lücken, die den Wechsel zu Agentic AI motivieren

- **Kein Verständnis von unstrukturiertem Text** – Freitext-Audit-Notizen werden gespeichert, aber nie inhaltlich ausgewertet.
- **Keine Begründungstexte** – *warum* der Nutzer einen bestimmten MIL-Wert gewählt hat.
- **Keine Flexibilität bei neuen/unüblich benannten Metriken** – die Zuordnung basiert auf starrem Namensmuster; passt der Name nicht exakt, wird die Metrik schlicht nicht gefunden, auch wenn sie inhaltlich passen würde.

### 1.6 Warum überhaupt agentisch werden (deterministisch → agentisch)

Nicht als Selbstzweck, sondern weil genau diese Lücken **prinzipiell nicht mit weiteren Regeln schließbar sind** – sie brauchen Sprachverständnis und Interpretation, nicht mehr If-Else. Zusatznutzen: Die für Agenten nötige Nachvollziehbarkeits-Infrastruktur (Logging jedes Bewertungsschritts) ist ohnehin etwas, das ein Audit-Tool fachlich braucht.

**Gegenrechnung:** ~80 % des Aufwands einer Agenten-Einführung fließt laut Referenzmaterial (Google-Whitepaper zu Agents) in Security und Risk Mitigation, nicht in die „Intelligenz" selbst. Bei einem Audit-Tool ist ein falscher, unbelegter Score ein größeres Risiko als bei einem gewöhnlichen Chatbot – deshalb **nie ohne Sicherheitsnetz einführen**.

### 1.6.1 Wo genau der Switch deterministisch → agentisch passiert

Drei konkrete Übergangspunkte, sonst keine:

- **Switch 1 – Kandidatensuche statt Namenskonvention:** Heute filtert `metric_belongs_to_control()` nur nach Substring-Muster im ID-Namen. Ein Agent schlägt stattdessen semantisch passende Metriken vor. **Sinnvoll, weil:** Vorschlagen ist schwer (Kreativität nötig), Prüfen ist leicht – die bestehende deterministische Scoring-Funktion verifiziert den Vorschlag sofort. *Der Agent erzeugt, der Code entscheidet.*
- **Switch 2 – Freitext-Interpretation:** Audit-Notizen sind unstrukturierte Sprache – dafür gibt es keine deterministische Lösung, nur Fließtext-Speicherung. **Sinnvoll, weil:** Es ist reine Zusatzinformation (kein Score-Risiko), aktuell komplett brachliegender Wert.
- **Switch 3 – Begründungstext & Analyse zu einer bereits vom Nutzer gewählten MIL-Antwort:** Der MIL-Wert selbst kommt und bleibt ausschließlich Selbstauskunft des Nutzers. **Erst danach** setzt der Agent an: Er formuliert eine nachvollziehbare Begründung, *warum* diese Antwort zur gewählten MIL-Stufe passt, und prüft diese gegen die Normanforderung – bevor ein Mensch sie final freigibt.

> **Nirgends verschoben wird die Verantwortung für den eigentlichen MIL-Score** – weder an den Agenten noch an den deterministischen Code. Der Score ist und bleibt Selbstauskunft des Menschen. Das ist der entscheidende Unterschied zu einem „normalen" KI-Projekt: Agentic AI übernimmt ausschließlich Zusatzarbeit, Interpretation und nachträgliche Erklärung – niemals die Entscheidung selbst.

### 1.6.2 Autonomiegrad – wo agentisch, wo nicht

| Ort im System | Agentisch? | Grad | Begründung |
|---|---|---|---|
| Scoring-Kern (Formeln, Aggregation, MIL-Mapping) | **Nein, nie** | Level 0 | Aufgabe ist bereits vollständig algorithmisch gelöst – kein Interpretationsbedarf. |
| Control-/Metric-Katalog (Onboarding neuer Normtexte) | Ja, punktuell | Level 1 (Berater) | Klassifikation von Fließtext ist Sprachaufgabe, heute manuell. |
| Decision Engine (neue Kandidatensuche) | Ja, ergänzend | Level 2 (Reasoning + Tools) | Nur die Suche nach *neuen* Zuordnungen wird agentisch; die Bewertung bleibt deterministisch. |
| Metric View (Evidenz-Auskunft) | Ja, begrenzt | Level 1 (Info-Abfrage) | Kein Entscheidungsrisiko, reine Auskunft. |
| Maturity Evaluator (Freitext & Begründung) | Ja, größtes Potenzial | Level 2, mehrstufig | Größte ungenutzte Datenquelle, höchster Interpretationsbedarf. |
| Übergreifende Steuerung mehrerer Normen | Noch nicht | Level 2 – erst bei Bedarf | Lohnt sich erst ab zweitem Framework, vorher Overengineering. |

**Wichtigster Punkt:** Der höchste jemals angestrebte Grad ist **Level 2** (Agent mit Tools, Vorschlagsrecht, kein Durchgriff). **Level 4 (voll autonom) ist für dieses System nirgends vorgesehen** – ein Audit-Tool ohne menschliche Letztentscheidung wäre nicht vertretbar.

### 1.7 Wo es sich lohnt – wo nicht

**Lohnt sich:**

- Freitext-Interpretation (größter ungenutzter Datenschatz, additiv, kein Score-Risiko) → bester erster Pilot.
- Neue/unüblich benannte Metrik-Kandidaten vorschlagen (Agent schlägt vor, bestehender Code prüft – Vorschlagen ist schwer, Prüfen ist leicht).
- Automatisch generierte Begründungs- oder Auswirkungstexte zu einem Score (heute: nur nackte Zahl).

**Lohnt sich nicht (aktuell):**

- Vollautonome MIL-Vergabe ohne Nutzereingabe – explizit ausgeschlossen. Ein Agent darf eine Begründung zu einer *bereits vom Menschen getroffenen* Antwort liefern, aber niemals die Selbstauskunft-Antwort selbst setzen oder vorschlagen.
- Den Scoring-Kern durch ein Modell zu ersetzen – bereits gelöst, würde nur Risiko ohne Zusatznutzen bringen.
- Multi-Agenten-Orchestrierung über mehrere Normen – es gibt aktuell nur ein Framework.

### 1.8 Wer trägt welche Verantwortung

| Rolle | Verantwortung |
|---|---|
| **Deterministischer Kern** | Bleibt einzige Quelle der Wahrheit für den finalen MIL-Score – unverändert, auditierbar. |
| **Agent** | Nur Vorschlag/Beratung (Kandidaten, Begründungstext, Freitext-Auswertung) – kein Schreibzugriff ohne Freigabe. |
| **Mensch (Auditor)** | Die Verantwortung für die **eigentliche MIL-Antwort pro Metrik** liegt und bleibt vollständig beim Menschen – ein Agent kommt frühestens *nach* der Eingabe ins Spiel, nie davor oder anstelle davon. |
| **Qualitätsaufsicht (neue Rolle)** | Pflegt Testfälle, Absicherungsregeln und Protokolle – Priorität 1 ist immer Sicherheit. |

### 1.9 Fazit der Motivation

V²ISMS-MS funktioniert wie ein zuverlässiger Taschenrechner mit festen Formeln – gut für das, wofür er gebaut wurde, aber blind für alles außerhalb starrer Namensmuster und Zahlen. Agentic AI wird **nicht** eingeführt, um den Taschenrechner zu ersetzen, sondern um ihm an drei klar begrenzten Stellen (Freitext, neue Kandidaten, Begründungstext) ein Sprachverständnis zur Seite zu stellen – immer mit dem Menschen als letzter Instanz.

---

## 2. Architektur

Client-Server-Architektur mit getrennter Codebasis:

**Backend (Flask/Python/SQLite)**
- **Control-/Metric-Katalog** – Wissensbasis der Controls und Metriken.
- **Decision Engine** – regelbasierte Zuordnung von Metriken zu Controls (Fit-Score).
- **Maturity Evaluator** – sammelt Antworten, berechnet MIL-Scores, persistiert pro-Metrik-Notizen und fehlende Metriken.
- **Report-Service** – erzeugt Executive Summary sowie Markdown-, PDF- und JSON-Exporte.
- **Agent-Layer (ergänzend)** – LLM-Client (Mock/DeepSeek/OpenAI/Anthropic), NoteAnalyzerAgent, Agent-Logging und Review-Workflow.

**Frontend (Angular/TypeScript)**
- **Metric View** – transparente Darstellung zugeordneter Metriken inkl. Evidenzen.
- **Maturity Assessment** – geführter Fragebogen-Workflow pro Control (MIL 0–3) inkl. optionaler Notizen pro Metrik.
- **Summary Review** – aggregierte Auswertung inkl. „Audit-Notizen", „Nicht bewertete Fragen" und Agent-Audit-Trail.

```
┌────────────────────────────┐        REST (JSON)        ┌──────────────────────────────┐
│        Angular Frontend     │  ───────────────────────▶ │        Flask Backend         │
│  Metric View · Evaluator    │ ◀───────────────────────  │  Katalog · Decision Engine   │
│  Summary Review             │                           │  Maturity · Report · Agents  │
└────────────────────────────┘                           └──────────────┬───────────────┘
                                                                        │
                                                              ┌─────────▼──────────┐
                                                              │   SQLite-Datenbank │
                                                              └────────────────────┘
```

Die Score-/Aggregationslogik liegt vollständig serverseitig und ist deterministisch. Die Agenten-Schicht ist additiv und score-neutral; sie hat niemals Schreibzugriff auf MIL-Werte.

---

## 3. Features

### 3.1 Deterministischer Kern

- **Metric View:** hierarchischer Metrikbaum mit automatischem Profil-Matching über die Decision Engine.
- **Maturity-Assessment-Workflow:** sessionbasiert, geführte Bewertung pro Control (MIL 0–3), optionale Freitext-Notizen, Submit schließt die Session ab (`completed`).
- **Aggregation & Reporting:** Ø-MIL, Punkte und Prozent je Control/Domain/Gesamt inklusive Unterscheidung bewerteter/unbewerteter Controls.
- **Konsistente REST-API:** einheitliches `{status, data}`-Antwortformat.

### 3.2 Präzisere Maturity-Semantik

- **Nur echte Antworten zählen:** `answer_count` = Anzahl tatsächlich beantworteter Metriken (ohne automatisch gefüllte Nullen).
- **Vollständigkeit:** `is_complete = (answer_count >= expected_answer_count)`; `incomplete` = bewertet, aber nicht alle erwarteten Metriken beantwortet.
- **0-Punkte-Differenzierung:** `zero_reason = not_implemented` (explizit MIL 0 für **alle** Metriken, vollständig bewertet) vs. `not_rated` (unbewertet **oder** unvollständig). `resolve_zero_reason` behandelt `incomplete` konsequent als `not_rated`.
- **Pro-Metrik-Notizen:** `metric_notes` (JSON) speichert `{metric_id, metric_name, note}` je beantworteter Metrik; die zusammengeführte `note` bleibt für Backward-Kompatibilität erhalten.

### 3.3 Nicht bewertete Fragen sichtbar machen

- **`missing_metrics`** pro Control: erwartete minus tatsächlich beantwortete Metriken (`[{metric_id, metric_name}]`), auch bei `fill_missing_with_zero=true`.
- **`coverage.unanswered_questions`**: sessionweite Aggregation aller nicht bewerteten Fragen.

### 3.4 Reporting (Executive / Markdown / PDF / JSON / FE)

- **Executive Summary:** enthält `coverage.unanswered_questions`, `executive.note_count` sowie Hinweise wie „X Fragen sind nicht bewertet und werden je Control als 'nicht bewertet' ausgewiesen" und „X Audit-Notizen (je Metrik) erfasst".
- **Control-Details:** Abschnitte „Audit-Notizen (je Metrik)" und „Nicht bewertete Fragen (Maturity Evaluator)" je Control.
- **Exports:** JSON/Markdown/PDF enthalten `metric_notes` und `missing_metrics`; PDF sanitisiert Sonderzeichen (z. B. `↔`), Report-Header ist sticky, Scale-to-fit für 1360×900.
- **FE Summary-Review:** „Audit-Notizen"-Kachel, „Nicht bewertete Fragen"-Statistik, Control-Cards mit fehlenden Metriken als Chips und strukturierten Metrik-Notizen.

### 3.5 Agents (ergänzend – nur Vorschlagsrecht)

- **NoteAnalyzerAgent:** analysiert Audit-Notizen und erzeugt strukturierte Vorschläge (**Zusammenfassung**, **Belegte Sicherheitsaspekte**, **Offene Punkte**) – **niemals** einen MIL-Vorschlag oder eine Score-Änderung.
- **Agent-Logging:** vollständige Nachvollziehbarkeit via `agent_log` mit `provider`, `model`, `output_text`, `status` (`proposed|accepted|rejected`), `reviewed_by`, `reviewed_at`, `control_id`, `session_id`.
- **Review-Workflow:** Vorschläge müssen explizit akzeptiert/abgelehnt werden; nur freigegebene Logs erscheinen im Report („AI-Analysen (Agent-Audit-Trail)").
- **LLM-Provider:** umschaltbar (`mock|deepseek|openai|anthropic`) – siehe [Konfiguration](#9-konfiguration).
- **Realistischer Mock:** `MockLLMClient` erzeugt eine deutschsprachige, strukturierte Analyse allein aus dem Notiztext (klar als Mock markiert) – für Entwicklung und Tests ohne API-Key.

---

## 4. Technologie-Stack

| Bereich | Technologie |
|---|---|
| Frontend | Angular 21 (TypeScript), Angular Material, RxJS, HttpClient |
| Frontend-Tests | Karma / Jasmine |
| Backend | Python 3.12, Flask, SQLite |
| Backend-Tests | pytest |
| Agenten/LLM | Provider-Adapter (Mock, DeepSeek, OpenAI, Anthropic), HTTP-Clients |
| Build/Tooling | npm / Angular CLI, esbuild; virtuelle Python-Umgebung (`.venv`) |

---

## 5. Projektstruktur

```
Bachelorarbeit_V2ISMS-MS/
├── backend/
│   ├── app.py                          # Flask-App, lädt ../.env
│   ├── module_controls/                # Control-Katalog
│   ├── module_metrics/                 # Metrik-Katalog & Fit-Score
│   ├── module_maturity_evaluation/
│   │   ├── MaturityService.py          # Submit-Workflow (metric_notes, missing_metrics)
│   │   ├── rating_state.py             # Migration, upsert, Zero-Semantik
│   │   └── score_aggregation.py        # Aggregation, unanswered_questions
│   ├── module_report/
│   │   ├── ReportService.py            # Executive Summary, Orchestrierung
│   │   ├── markdown_renderer.py
│   │   ├── pdf_renderer.py
│   │   └── json_exporter.py
│   ├── module_agents/
│   │   ├── llm_client.py               # MockLLMClient, DeepSeek/OpenAI/Anthropic
│   │   ├── NoteAnalyzerAgent.py
│   │   └── AgentService.py             # agent_log, Review-Workflow
│   └── tests/                          # pytest (conftest, submit flow, report)
├── frontend/
│   └── src/app/
│       ├── services/assessment-api.service.ts
│       └── pages/assessment-summary-review/
│           └── maturity-assessment/
│               └── metric-view/
├── .env                                # lokale Agent-Konfiguration (gitignored)
└── README.md
```

---

## 6. Datenmodell (Kurzüberblick)

Zentrale Tabellen (SQLite):

- **`control`** – ISO-27001-Controls (ID, Name, Domain).
- **`metric_profile`** – Metriken inkl. `name` und Zuordnung zum Control.
- **`control_maturity_rating`** – Bewertung je Session/Control:
  - `note` – zusammengeführte Audit-Notiz (Legacy-kompatibel)
  - `metric_notes` (JSON) – `[{metric_id, metric_name, note}]`
  - `missing_metrics` (JSON) – `[{metric_id, metric_name}]`
  - `answer_count`, `expected_answer_count`, `is_complete`
  - `zero_reason` (`not_implemented` | `not_rated`)
- **`agent_log`** – Agent-Läufe:
  - `agent_name`, `action`, `input_text`, `output_text`
  - `provider`, `model`
  - `status` (`proposed` | `accepted` | `rejected`)
  - `control_id`, `session_id`, `created_at`, `reviewed_at`, `reviewed_by`

Die Migration `ensure_rating_schema` ergänzt fehlende Spalten idempotent; der In-Memory-Cache-Key ist pro Connection stabil (`<mem:{id(conn)}>`).

---

## 7. Voraussetzungen

- **Python** 3.12+
- **Node.js** 20+ und **npm**
- Optional: ein **DeepSeek/OpenAI/Anthropic API-Key** für echte LLM-Analysen (sonst läuft der Mock)

---

## 8. Installation & Setup

### Backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python backend\app.py
```

### Frontend

```powershell
cd frontend
npm install
ng serve
```

Standard-URLs: Frontend `http://localhost:4200`, Backend `http://localhost:5000`.

---

## 9. Konfiguration

Die Agent-Konfiguration erfolgt über eine `.env`-Datei im Projektroot (durch `.gitignore` ausgeschlossen; wird von `backend/app.py` aus `../.env` geladen):

```env
AGENT_LLM_PROVIDER=deepseek        # mock | deepseek | openai | anthropic
DEEPSEEK_API_KEY=sk-...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
```

- Default ist `mock`: `MockLLMClient` liefert realistische, deutschsprachige Analysen ohne API-Key.
- Für echte Analysen `AGENT_LLM_PROVIDER` auf den gewünschten Provider setzen und den passenden Key hinterlegen.
- **Wichtig:** `.env` enthält Secrets und darf **niemals** committet werden.

---

## 10. API-Dokumentation

Alle Endpunkte antworten einheitlich mit `{ "status": "ok|error", "data": ... }`.

### Katalog & Metriken

| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/controls` | Liste aller Controls |
| GET | `/api/metrics/<control_id>` | Passende Metriken eines Controls (Decision Engine) |

### Maturity Assessment

| Methode | Endpoint | Beschreibung |
|---|---|---|
| POST | `/api/maturity/session` | Neue Assessment-Session anlegen |
| POST | `/api/maturity/submit` | Antworten übermitteln; Response enthält `missing_metrics`, `answer_count`, `expected_answer_count`, `status`, `zero_reason` |
| GET `/api/maturity/summary/<session_id>` | Session-Aggregation inkl. `metric_notes`, `missing_metrics`, `coverage.unanswered_questions`, `note_count` |

### Report & Export

| Methode | Endpunkt | Beschreibung |
|---|---|---|
| GET | `/api/report/<session_id>` | Strukturierter Report (Executive + Details) |
| GET | `/api/report/<session_id>/markdown` | Markdown-Download |
| GET | `/api/report/<session_id>/pdf` | PDF-Download |
| GET | `/api/report/<session_id>/json` | JSON-Export (vollständiger Payload) |

### Agents

- `POST /agents/analyze` – NoteAnalyzerAgent ausführen (erzeugt `proposed`-Eintrag im `agent_log`).
- `POST /agents/review` – Vorschlag akzeptieren/ablehnen (`accepted` | `rejected`).

### 10.1 Ausführliche Beispiele

#### `GET /api/controls`
Liefert alle Controls des Katalogs.
```json
{ "status": "ok", "data": [ { "id": "5.12", "name": "...", "domain": "Organisatorische Controls" } ] }
```

#### `GET /api/metrics/<control_id>`
Liefert die via Decision Engine zugeordneten Metriken samt Fit-Score.

#### `POST /api/maturity/submit`

Request (Auszug):

```json
{
  "session_id": 12,
  "control_id": "8.3",
  "fill_missing_with_zero": false,
  "answers": [
    { "metric_id": "M-8.3-1", "metric_name": "Backup-Testfrequenz", "value": 2, "note": "Monatlicher Restore-Test" }
  ]
}
```

Response (Auszug):

```json
{
  "status": "success",
  "data": {
    "answer_count": 6,
    "expected_answer_count": 6,
    "is_complete": true,
    "zero_reason": null,
    "metric_notes": [{ "metric_id": "M-8.3-1", "metric_name": "Backup-Testfrequenz", "note": "Monatlicher Restore-Test" }],
    "missing_metrics": []
  }
}
```

#### Report-Endpunkte

- `GET /report?format=json|markdown|pdf` bzw. die o. g. dedizierten Endpunkte liefern denselben Datenkern in unterschiedlichen Repräsentationen.
- Freigegebene Agent-Analysen erscheinen im Abschnitt „AI-Analysen (Agent-Audit-Trail)".

### 10.2 Agent-API

#### `POST /api/agents/note-analyzer`

Führt den `NoteAnalyzerAgent` für eine Bewertung aus und legt einen `proposed`-Eintrag in `agent_log` an.

#### `POST /api/agents/review`

Setzt den Status eines Vorschlags auf `accepted` oder `rejected`, inkl. `reviewed_by` und `reviewed_at`. Nur `accepted`-Einträge sind im Report sichtbar.

---

## 11. Beispiel-Workflow (End-to-End)

1. **Session starten** – im Frontend ein neues Maturity-Assessment anlegen.
2. **Control wählen** – z. B. `8.3` (Backup). Die Metric View zeigt die zugeordneten Metriken.
3. **Metriken beantworten** – je Metrik MIL 0–3 wählen und optional eine Notiz hinterlegen.
4. **Submit** – trifft der Auditor nicht alle erwarteten Metriken, werden diese als `missing_metrics` ausgewiesen; `zero_reason` differenziert `not_implemented` von `not_rated`.
5. **Agent-Analyse (optional)** – NoteAnalyzerAgent erzeugt einen Vorschlag; dieser ist zunächst `proposed`.
6. **Review** – der Vorschlag wird akzeptiert (`accepted`) oder abgelehnt (`rejected`).
7. **Report** – Executive Summary (inkl. „nicht bewertete Fragen" und „Audit-Notizen je Metrik"), Domain-Details und der Agent-Audit-Trail werden als JSON/Markdown/PDF exportiert.

---

## 12. Entwicklung & Tests

### Backend

```powershell
.\.venv\Scripts\Activate.ps1
pytest backend\tests -q
```

Abgedeckt u. a.: Speicherung von `metric_notes` pro Metrik, Auflistung `missing_metrics` pro Control, Zero-Semantik bei `fill_missing_with_zero`, Renderer-Ausgabe (MD/JSON/PDF). Aktueller Stand: **45 Tests grün**.

### Frontend

```powershell
cd frontend
ng build
ng test
```

Der Build läuft fehlerfrei; verbleibende Style-Budget-Warnungen betreffen ausschließlich `maturity-assessment.component.scss` und `metric-view.component.scss` (präexistent).

---

## 13. Bekannte Einschränkungen & Roadmap

### Aktuelle Einschränkungen

- Kein AuthN/AuthZ für Mehrbenutzer-Betrieb.
- Switch 1 (semantische Metrik-Kandidatensuche) und Switch 3 (Begründungstext) sind konzeptionell vorgesehen, aber **noch nicht** implementiert – umgesetzt ist Switch 2 (Freitext-Interpretation) mit striktem Review.
- Der Katalog deckt den Projekt-Scope ab (kein vollständiger Normen-Onboarding-Prozess).
- Agenten-Ausgaben sind nur `proposed`-Vorschläge; ohne Review erscheinen sie nicht im Report.

### Roadmap

1. **Switch 1** – semantische Kandidatensuche durch den Agenten, Verifikation durch den bestehenden deterministischen Scorer.
- **Switch 3** – automatisch generierte Begründungs-/Auswirkungstexte zu bereits getroffenen MIL-Antworten (ausschließlich nach menschlicher Eingabe).
- **AuthN/AuthZ** und rollenbasierte Rechte (inkl. Qualitätsaufsicht).
- **Multi-Framework-Unterstützung** (erst ab zweitem Framework sinnvoll).

---

## Anhang A: Stand Bachelorarbeit (Endzustand) – [OUTDATED]

> Dieser Abschnitt dokumentiert den ursprünglichen, rein deterministischen Prototyp der Bachelorarbeit. Er ist aus historischen Gründen erhalten und beschreibt **nicht** den aktuellen Code.

- **Kernkonzept:** ISO/IEC 27001 Annex A (93 Controls, meist binär/subjektiv bewertet); jedes Control mit Verifikations- (technisch/messbar) und Validierungsmetriken (organisatorisch/prozessual) verknüpft; Ableitung des **Maturity Indicator Level (MIL 0–3)** angelehnt an C2M2; vier Schichten: duale Profilbildung, Decision Engine, Metric View, Maturity Evaluator.
- **Architektur:** Client-Server mit getrennter Codebasis, Score-/Aggregationslogik serverseitig.
- **Features:** Metric View, sessionbasierter Maturity-Assessment-Workflow (MIL 0–3, Freitext-Notizen), Aggregation/Reporting (Ø-MIL, Punkte, Prozent je Control/Domain/Gesamt).
- **Technologie-Stack:** Angular (TypeScript), RxJS, HttpClient, Flask, JSON, SQL-Katalogtabellen, Karma/Jasmine, pytest.
- **Einschränkungen:** kein AuthN/AuthZ, Katalog im Bachelorarbeits-Scope, Freitext-Notizen nur gespeichert (nicht ausgewertet), keine differenzierte Ausweisung nicht bewerteter Fragen, kein Agent-/LLM-Logging/Review-Workflow.

---

## 14. Lizenz

Siehe `LICENSE`. Sofern keine separate Lizenzdatei vorhanden ist, gilt der im Rahmen der Bachelorarbeit gesetzte Rahmen.

---

## 15. Kontakt

**Ann-Jacqueline Kaldjob** – Bachelorarbeit V²ISMS-MS (V²ISMS-MS-Ansatz)

GitHub: [https://github.com/Ann-Jacqueline/Bachelorarbeit_V2ISMS-MS](https://github.com/Ann-Jacqueline/Bachelorarbeit_V2ISMS-MS)