---
marp: true
theme: default
paginate: true
header: "V²ISMS-MS · Agentic AI Best Practices"
footer: "Bachelorarbeit Ann-Jacqueline Kaldjob"
style: |
  section {
    font-size: 25px;
  }
  section.lead h1 {
    font-size: 46px;
  }
  table {
    font-size: 20px;
  }
  code {
    font-size: 20px;
  }
  blockquote {
    font-size: 21px;
  }
---

<!-- _class: lead -->

# Agentic AI in V²ISMS-MS

## Methodiken, Best Practices & Teststruktur

**ISO-27001-Reifegradbewertung: vom deterministischen Kern zur agentischen Ergänzung**

---

# Agenda

1. **Ausgangslage** – Warum Agentic AI in einem Audit-Tool?
2. **Leitprinzip** – Der Mensch entscheidet, der Agent berät
3. **AI-Agent-Methodiken** – Was wir konkret gebaut haben
4. **Best Practices** – Unsere Regeln für sichere Agenten
5. **Teststruktur** – Wie wir Agenten und Sicherheitsnetze prüfen
6. **Lessons Learned & Checkliste**

---

# 1. Ausgangslage: V²ISMS-MS

**Web-App für ISO/IEC 27001 Maturity Assessments**

- **Backend:** Python · Flask · SQLite
- **Frontend:** Angular · TypeScript
- **Kern:** Deterministische MIL-Score-Berechnung (Maturity Indicator Level 0–3)

**Drei Lücken motivieren Agentic AI:**

| Lücke | Heute | Agentische Ergänzung |
|---|---|---|
| Freitext-Audit-Notizen | nur gespeichert | inhaltlich interpretieren |
| Unüblich benannte Metriken | starres Namensmuster | semantisch vorschlagen |
| Begründungstexte | nur nackte Zahl | nachvollziehbar erklären |

> Agentic AI schließt Sprachverständnis-Lücken – **nicht** den bereits gelösten Scoring-Kern.

---

# 2. Leitprinzip: Der Mensch entscheidet

**Der MIL-Score ist und bleibt Selbstauskunft des Menschen.**

- Der deterministische Kern ist die **einzige Quelle der Wahrheit**
- Der Agent liefert **nur Vorschläge** (`proposed`)
- Kein Agent hat Schreibzugriff auf Fach- oder Score-Tabellen
- Freigabe erfolgt explizit durch einen Menschen (`accepted` / `rejected`)
- Ohne Review erscheint nichts im Report

> **Der Agent erzeugt, der Code entscheidet, der Mensch gibt frei.**

---

# 3. Autonomie-Modell

**Nicht „so viel Autonomie wie möglich“, sondern so wenig wie nötig.**

| Stelle im System | Agentisch? | Autonomiegrad |
|---|---|---|
| Scoring-Kern (Formeln, Aggregation) | Nein, nie | Level 0 |
| Control-/Metric-Katalog | punktuell | Level 1 – Berater |
| Decision Engine (Kandidatensuche) | ergänzend | Level 2 – Reasoning + Kontext |
| Metric View (Evidenz-Auskunft) | begrenzt | Level 1 – Info |
| Maturity Evaluator (Freitext, Begründung) | ja | Level 2 – mehrstufig |
| Vollautonome MIL-Vergabe | **ausgeschlossen** | – |

**Höchster angestrebter Grad: Level 2. Level 4 (voll autonom) ist nirgends vorgesehen.**

---

# 4. Architektur der Agenten-Schicht

```
┌─────────────────────────────────────────────────────────────┐
│                     Angular Frontend                         │
│      Assessment · Summary Review · Agent-Vorschläge         │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST / JSON
┌──────────────────────────▼──────────────────────────────────┐
│                      Flask Backend                           │
│                                                              │
│  ┌────────────────────┐      ┌──────────────────────────┐   │
│  │ Deterministischer  │      │     Agent-Layer          │   │
│  │ Kern               │─────▶│  NoteAnalyzer            │   │
│  │ Scores · Regeln    │      │  IsmsAssessment          │   │
│  │ (unverändert)      │◀─────│  ImprovementAdvisor      │   │
│  └────────────────────┘      └────────────┬─────────────┘   │
│                                           │                  │
│                              ┌────────────▼─────────────┐   │
│                              │ agent_log (Audit-Trail)  │   │
│                              │ proposed → accepted      │   │
│                              └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Additiv, score-neutral, jederzeit abschaltbar (Mock-Provider).**

---

# 5. Methodik 1: Single-Responsibility-Agenten

**Ein Agent = eine klar abgegrenzte Sprachaufgabe.**

| Agent | Eingabe | Ausgabe | Darf NICHT |
|---|---|---|---|
| **NoteAnalyzerAgent** | Audit-Notiz + Notiz-Abdeckung | Zusammenfassung, belegte Aspekte, offene Punkte | MIL bewerten |
| **IsmsAssessmentAgent** | deterministische Scores, Domänen, Abdeckung | Gesamteinschätzung, Stärken, Risiken | Scores ändern/erfinden |
| **ImprovementAdvisorAgent** | deterministisch priorisierte Kandidaten | konkrete Maßnahmen je Control | Priorisierung ändern |

**Kein Multi-Agenten-Routing, keine freie Tool-Nutzung, keine Agent-zu-Agent-Kette.**

> Bewusst einfach: ein Framework, klare Aufgaben, kein Overengineering.

---

# 6. Methodik 2: Deterministische Kontext-Injektion

**Der Agent bekommt fertige Fakten – er holt sie sich nicht selbst.**

- Kein direkter Datenbankzugriff, keine frei wählbaren Tools
- Der Code berechnet Scores, Abdeckung, Prioritäten und übergibt sie als Prompt-Kontext
- Der Agent interpretiert **nur** diese Werte
- Beispiel: `prioritize_improvement_candidates()` liefert das Ranking – der Agent formuliert aus

**Vorteile:**

- Reproduzierbare Eingabebasis
- Keine Tool-Fehlbedienung
- Kein Risiko durch veraltete oder fremde Daten
- Prompt und Ergebnis sind vollständig loggbar

> **Kontrolle durch Datenhoheit: Der Code bestimmt, was der Agent überhaupt sehen darf.**

---

# 7. Methodik 3: Provider-Abstraktion & Mock-First

**Eine Schnittstelle, austauschbare Modelle.**

```python
class LLMClient(ABC):
    def complete(self, system_prompt, user_prompt) -> LLMResponse: ...
```

- **Adapter:** `MockLLMClient`, `OpenAIClient`, `DeepSeekClient`
- **Factory:** `create_llm_client()` liest `AGENT_LLM_PROVIDER`
- **Konfiguration:** `.env` (`mock | openai | deepseek`), Secrets nie im Repo
- **Mock-First:** realistische deutschsprachige Antworten ohne API-Key

**Nutzen:**

- Entwicklung und Tests laufen offline und deterministisch
- Provider-Wechsel ohne Änderung der Agenten-Logik
- Kein Vendor-Lock-in
- Klar erkennbare Mock-Antworten (`[MOCK-Antwort …]`)

---

# 8. Methodik 4: Strukturiertes Prompting mit Guardrails

**Jeder Agent hat einen expliziten System-Prompt mit Verboten und Ausgabeformat.**

Typische Regeln:

- „Du bewertest NIEMALS selbst einen Reifegrad und schlägst NIEMALS einen MIL-Wert vor.“
- „Du erfindest keine Fakten. Stütze dich ausschließlich auf den gelieferten Text.“
- „Der gewählte MIL-Wert ist reine Kontextinformation – kommentiere ihn nicht.“
- „Unterscheide belegte Lücken von nicht erwähnten Themen.“
- „Antworte auf Deutsch.“

**Ausgabe immer in fester Struktur**, z. B.:

```text
**Zusammenfassung:** …
**Belegte Sicherheitsaspekte:** …
**Offene Punkte:** …
```

> Struktur macht Ausgaben prüfbar, vergleichbar und im Frontend darstellbar.

---

# 9. Methodik 5: Human-in-the-Loop-Review

**Ein Vorschlag durchläuft einen expliziten Freigabe-Workflow.**

```
Agent-Call
   │
   ▼
proposed ──▶ accepted  ──▶ im Report sichtbar
   │
   ├────────▶ rejected  ──▶ verworfen
   │
   └────────▶ error     ──▶ technischer Fehler, protokolliert
```

- Nur `proposed`-Einträge sind reviewbar
- Review setzt `reviewed_by` und `reviewed_at`
- Report zeigt ausschließlich `accepted`-Analysen
- Jede Entscheidung ist nachvollziehbar

> **Kein stilles Wirksamwerden von KI-Ausgaben.**

---

# 10. Best Practice: Proposal-Only by Design

**Sicherheit entsteht durch Architektur, nicht durch Prompt-Vertrauen.**

- Agenten schreiben **nie** direkt in `control_maturity_rating`
- Agenten erhalten **kein** Schreib-API und keine DB-Tools
- `AgentService.run_agent_action()` ist der einzige Einstiegspunkt
- Rückgabe ist immer `proposed` oder `error`
- Der deterministische Scorer bleibt unverändert

**Ergebnis:**

- Ein falscher oder halluzinierter Vorschlag kann keinen Score verändern
- Selbst ein kompromittiertes Modell hat keinen Durchgriff
- Die bestehende Auditierbarkeit bleibt erhalten

---

# 11. Best Practice: Vollständiger Audit-Trail

**Jeder Agent-Call wird protokolliert – auch Fehler.**

`agent_log` enthält:

| Feld | Zweck |
|---|---|
| `agent_name`, `action` | Welcher Agent, welche Aufgabe? |
| `input_text` | System- + User-Prompt |
| `output_text` | Antwort oder Fehlermeldung |
| `provider`, `model` | Reproduzierbarkeit |
| `status` | `proposed` / `accepted` / `rejected` / `error` |
| `session_id`, `control_id` | fachlicher Kontext |
| `created_at`, `reviewed_at`, `reviewed_by` | Zeit und Verantwortung |

> Nachvollziehbarkeit ist keine Zusatzfunktion – sie ist fachliche Voraussetzung für ein Audit-Tool.

---

# 12. Best Practice: Fehler dürfen nicht unsichtbar sein

**Fehler werden geloggt, nicht verschluckt.**

- LLM-Aufrufe sind in `try/except` gekapselt
- Bei Provider-Fehler: `status='error'` + `FEHLER: …` im Log
- API liefert konsistente Statuscodes:
  - `200` Erfolg
  - `404` Session/Control nicht gefunden
  - `422` keine Daten / keine Notiz
  - `500` technischer Fehler
- Kein Retry-Sturm, keine stillen Fallbacks mit erfundenen Inhalten

> Ein Audit-Tool muss auch **Nicht-Ergebnisse** belegen können.

---

# 13. Best Practice: Keine erfundenen Fakten

**Der Agent ist Interpret, nicht Wissensquelle.**

- Nur der gelieferte Notiztext zählt
- Control-Name und Norm dienen **nicht** zum Auffüllen fehlender Inhalte
- Bei dünner Notizbasis: kurze Antwort + explizite Einschränkung
- Trennung von:
  - **belegten** Lücken/Widersprüchen
  - **nicht erwähnten** Themen (kein Fehler!)
- Keine generischen „offenen Punkte“, nur weil wenig Text vorhanden ist

**Zusätzlich:** Notiz-Abdeckung wird deterministisch berechnet und in den Prompt gegeben.

> So entsteht kein Scheinwissen – und keine falsche Sicherheit im Audit.

---

# 14. Best Practice: Security & Betrieb

- **Secrets:** nur in `.env`, per `.gitignore` ausgeschlossen
- **Provider-Wahl:** explizit über `AGENT_LLM_PROVIDER`, Default `mock`
- **Lazy Imports:** Provider-Pakete werden nur bei Aktivierung geladen
- **Keine Schreibrechte:** Agenten sind fachlich read-only
- **Idempotente Migration:** `ensure_agent_log_table()` / `ensure_rating_schema()`
- **Klare Verantwortungsrollen:**
  - Deterministischer Kern → Wahrheit
  - Agent → Vorschlag
  - Mensch → Entscheidung
  - Qualitätsaufsicht → Tests, Regeln, Protokolle

> ~80 % des Aufwands fließen in Security und Risk Mitigation – nicht in „Intelligenz“.

---

# 15. Teststruktur: Überblick

**Backend: pytest · Frontend: Karma/Jasmine**

```
Aktueller Stand: 72 Backend-Tests grün (1,5 s)

        ┌──────────────────────────┐
        │ Integration / API        │  Submit-Flow, Report
        ├──────────────────────────┤
        │ Agenten-Verhalten        │  15 Tests
        ├──────────────────────────┤
        │ Fachlogik                │  Scoring, MIL-Mapping
        ├──────────────────────────┤
        │ Renderer / Export        │  Markdown, JSON, PDF
        └──────────────────────────┘
```

| Testdatei | Tests | Fokus |
|---|---:|---|
| `test_ism_agents.py` | 15 | Agenten + LLM-Fakes + Mock |
| `test_mil_mapping.py` | 15 | MIL-Validierung und -Darstellung |
| `test_report.py` | 21 | Report-Inhalte und Exporte |
| `test_score_aggregation.py` | 11 | Aggregation, Priorisierung |
| `test_submit_flow.py` | 10 | Assessment-Workflow |

---

# 16. Test-Fixtures: Determinismus statt API

**Kein Test spricht mit einem echten LLM.**

**`conftest.py`:**

- In-Memory-SQLite (`:memory:`) mit vollständigem Schema
- `row_factory = sqlite3.Row`, Foreign Keys aktiv
- Seed-Daten: Controls, Metriken, Session, Ratings
- Jeder Test erhält eine frische, isolierte DB

**LLM-Testdoubles:**

| Double | Zweck |
|---|---|
| `FakeLLMClient` | deterministische Antwort, zeichnet Prompts auf |
| `RaisingLLMClient` | simuliert Provider-Ausfall |
| `MockLLMClient` | produktiver Offline-Provider, eigene Branch-Tests |

> Tests sind schnell, reproduzierbar und kostenlos – ohne API-Key.

---

# 17. Testmatrix der Agenten

**Für jeden Agenten dieselben Sicherheits- und Randfälle:**

| Testfall | NoteAnalyzer | IsmsAssessment | ImprovementAdvisor |
|---|---|---|---|
| Erfolg erzeugt `proposed`-Log | ✅ | ✅ | ✅ |
| Prompt enthält deterministischen Kontext | ✅ | ✅ | ✅ |
| Unbekannte Session/Control → `not_found` | ✅ | ✅ | ✅ |
| Keine Daten → `no_data` / `no_note` | ✅ | ✅ | ✅ |
| Provider-Fehler → `error` im Log, kein Raise | – | ✅ | – |
| Kein LLM-Call bei fehlenden Daten | ✅ | ✅ | ✅ |

**Zusätzlich geprüft:**

- Antwortstruktur und Mock-Branches
- Notiz-Abdeckung und „dünne Basis“ im Prompt
- Kandidaten-Ranking wird unverändert übergeben

---

# 18. Integrationstests & Sicherheitsinvarianten

**Nicht nur Agenten, sondern das Zusammenspiel:**

- **Submit-Flow:** unvollständige Controls, `missing_metrics`, `zero_reason`
- **Report:** Agent-Analysen nur bei `accepted`; `proposed` wird ignoriert
- **Priorität:** akzeptierte Analyse schlägt neueren Vorschlag
- **Exporte:** Markdown, JSON und PDF enthalten dieselben Inhalte
- **PDF:** valide Bytes, Sanitizing von Sonderzeichen

**Gelebte Invarianten:**

1. Agenten verändern keinen MIL-Score.
2. Agenten-Ausgaben sind ohne Review nicht berichtswirksam.
3. Jeder Call – Erfolg oder Fehler – ist im Audit-Trail.
4. Fehlende Daten führen zu keiner Halluzination, sondern zu `no_data`.

> Diese Invarianten sollten als explizite Regressionstests weiter ausgebaut werden.

---

# 19. Was wir bewusst nicht testen (und warum)

**Grenzen der aktuellen Teststrategie:**

- **Keine echten LLM-Aufrufe** in CI → keine Kosten, keine Flakiness
- **Keine semantische Qualitätsbewertung** der Antworten → subjektiv, schwer automatisierbar
- **Kein Prompt-Injection-Test** → nächster Ausbauschritt
- **Kein Last-/Kostentest** → aktuell Einzelnutzer-Prototyp
- **Kein AuthN/AuthZ-Test** → Feature noch nicht implementiert

**Geplante Ergänzungen:**

- Golden-Set mit Beispielnotizen und erwarteten Kerneigenschaften
- Explizite Regressionstests für „Score bleibt unverändert“
- Prompt-Injection- und Missbrauchsfälle
- Evaluierung mit echten Providern (Qualität, Latenz, Kosten)

---

# 20. Lessons Learned

**Was sich bewährt hat:**

1. **Autonomie begrenzen** – Level 2 reicht für den Nutzen
2. **Deterministischen Kern nicht antasten** – Agenten additiv ergänzen
3. **Kontext injizieren statt Tools geben** – weniger Angriffsfläche
4. **Proposal-Only + Review** – KI ohne Durchgriff
5. **Alles loggen** – Audit-Trail als fachliches Feature
6. **Mock-First** – Entwicklung und Tests ohne externe Abhängigkeit
7. **Provider abstrahieren** – Technologie bleibt austauschbar
8. **Fehler sichtbar machen** – kein stilles Scheitern

> **Agentic AI ist hier kein Ersatz für Entscheidungen, sondern ein Sprachverstärker für bereits belegte Fakten.**

---

# 21. Checkliste für eigene Agenten-Projekte

- [ ] Ist die Aufgabe wirklich eine Sprachaufgabe?
- [ ] Welche Entscheidung darf der Agent **nie** treffen?
- [ ] Bekommt der Agent fertige Fakten statt freier Tools?
- [ ] Gibt es einen expliziten Review-Workflow?
- [ ] Wird jeder Call vollständig protokolliert?
- [ ] Sind Fehler und „keine Daten“ eigene, sichtbare Zustände?
- [ ] Ist der Provider austauschbar und der Mock testbar?
- [ ] Sind Secrets aus dem Repository ausgeschlossen?
- [ ] Gibt es Tests für Erfolg, Grenzfälle und Provider-Ausfall?
- [ ] Ist der deterministische Kern unverändert die Wahrheit?

---

<!-- _class: lead -->

# Danke!

## Fragen & Diskussion

**V²ISMS-MS** · Agentic AI als kontrollierte Ergänzung
**Repository:** github.com/Ann-Jacqueline/Bachelorarbeit_V2ISMS-MS

> Der Agent erzeugt. Der Code entscheidet. Der Mensch gibt frei.
