# Transformation to Multi Agents
Github:
https://github.com/Ann-Jacqueline/Bachelorarbeit_V2ISMS-MS

## Was ist V²ISMS-MS

V²ISMS-MS ist eine selbst entwickelte Web-Anwendung (Backend: Python/Flask/SQLite, Frontend: Angular), die im Rahmen einer Bachelorarbeit entstanden ist. Sie unterstützt **Informationssicherheits-Audits nach ISO 27001** – konkret die Frage: *„Wie reif (mature) ist die Umsetzung eines bestimmten Sicherheits-Controls in einer Organisation  und welche Metriken helfen konkret bei der  Implementierung der Control?"*

## Welches Problem sie löst

Heute passiert ISMS-Reifegradbewertung in der Praxis meist subjektiv – ein Auditor schätzt „gut/mittel/schlecht" ohne einheitliche, wiederholbare Metrik. V²ISMS-MS ersetzt dieses Bauchgefühl durch ein **standardisiertes Metrik-Modell**: jedes Control wird mit konkreten, messbaren Metriken verknüpft, aus denen sich ein reproduzierbarer Reifegrad-Score (MIL – Maturity Indicator Level) ableitet.

## Wie V²ISMS-MS das heute löst – fünf Bausteine

1. **Control-/Metric-Katalog** – die Wissensbasis: welche ISO-27001-Controls existieren, welche Metriken passen zu welchem Control.
2. **Decision Engine** – ordnet automatisch Metriken zu Controls zu (per Namenskonvention/Regelwerk) und berechnet einen Fit-Score.
3. **Metric View** – zeigt Auditor:innen die passenden Metriken samt Nachweisen (Evidenzen) transparent an.
4. **Maturity Evaluator** – sammelt die Auditor-Antworten pro Control und berechnet daraus den finalen MIL-Score.
5. **Summary View** – aggregiert alle MIL-Antworten zu einem Gesamtbericht: Gesamt-Score des ISMS sowie Gesamt-Score je Control-Domain.

Alle fünf Bausteine sind heute **komplett regelbasiert/deterministisch**: feste Formeln, feste Zuordnungsregeln, kein KI-Anteil.

## Wie der MIL-Score entsteht

**Das System bewertet nicht selbst.** Es ist bewusst ein **Selbstauskunfts-Interface**, kein Auditor: Jede Metrik = eine Frage, der Mensch beantwortet sie mit seiner eigenen Einschätzung (MIL0–MIL3), das System aggregiert diese Antworten nur deterministisch zu Domain- und Gesamt-Scores (Summary View). **Das soll so bleiben** – das ist keine Lücke, sondern ein Design-Prinzip.

## Was das System heute deterministisch schon leistet

- Zuverlässige, jederzeit reproduzierbare MIL-Score-Berechnung aus vordefinierten Metriken.
- Automatische Vorfilterung, welche Metriken zu welchem Control gehören (per Namensmuster).
- Liefert das Fragebogen-Interface für die MIL-Selbstauskunft pro Metrik.
- Aggregiert die Nutzerantworten zu einem reproduzierbaren Gesamt-Score und Domain-Scores (Summary View).
- Nachvollziehbare, prüfbare Aggregationslogik – jeder Score lässt sich exakt zurückrechnen.
- Persistente Verwaltung von Controls, Metriken, Evidenzen, Sessions in einer strukturierten Datenbank.

## Was das System heute NICHT leistet

- **Kein Verständnis von unstrukturiertem Text** – Freitext-Audit-Notizen werden gespeichert, aber nie inhaltlich ausgewertet.
- **Keine Begründungstexte** – *warum* der Nutzer einen bestimmten MIL-Wert gewählt hat.
- **Keine Flexibilität bei neuen/unüblich benannten Metriken** – die Zuordnung basiert auf starrem Namensmuster; passt der Name nicht exakt, wird die Metrik schlicht nicht gefunden, auch wenn sie inhaltlich passen würde.

**Genau an diesen drei Lücken setzt die Frage „deterministisch → agentisch" an** – nicht am Kern, der bereits funktioniert.

## Warum überhaupt agentisch werden

Nicht als Selbstzweck, sondern weil genau die  oben genannten Lücken **prinzipiell nicht mit weiteren Regeln schließbar sind** – sie brauchen Sprachverständnis und Interpretation, nicht mehr If-Else. Zusatznutzen: die für Agenten nötige Nachvollziehbarkeits-Infrastruktur (Logging jedes Bewertungsschritts) ist ohnehin etwas, das ein Audit-Tool fachlich braucht.

**Gegenrechnung:** ~80 % des Aufwands einer Agenten-Einführung fließt laut Referenzmaterial (google Whitepaper zu Agents) in Security und Risk Mitigation , nicht in die „Intelligenz" selbst. Bei einem Audit-Tool ist ein falscher, unbelegter Score ein größeres Risiko als bei einem gewöhnlichen Chatbot – deshalb **nie ohne Sicherheitsnetz einführen**.

## Wo agentisch – Wo genau der Switch deterministisch → agentisch passiert (und warum) zu welchem Grad

Drei konkrete Übergangspunkte, sonst keine:

- **Switch 1 – Kandidatensuche statt Namenskonvention:** Heute filtert `metric_belongs_to_control()` nur nach Substring-Muster im ID-Namen. Ein Agent schlägt stattdessen semantisch passende Metriken vor. **Sinnvoll, weil:**Vorschlagen ist schwer (Kreativität nötig), Prüfen ist leicht – die bestehende deterministische Scoring-Funktion verifiziert den Vorschlag sofort. Der Agent erzeugt, der Code entscheidet.
- **Switch 2 – Freitext-Interpretation:** Audit-Notizen sind unstrukturierte Sprache – dafür gibt es keine deterministische Lösung, nur Fließtext-Speicherung. **Sinnvoll, weil:** Es ist reine Zusatzinformation (kein Score-Risiko), aktuell komplett brachliegender Wert.
- **Switch 3 – Begründungstext & Analyse zu einer bereits vom Nutzer gewählten MIL-Antwort:** Der MIL-Wert selbst kommt und bleibt ausschließlich Selbstauskunft des Nutzers (Frage beantwortet → MIL0–MIL3 gewählt). **Erst danach** setzt der Agent an: Er formuliert eine nachvollziehbare Begründung, *warum* diese Antwort zur gewählten MIL-Stufe passt, und prüft diese Begründung gegen die Normanforderung – bevor ein Mensch sie final freigibt. **Sinnvoll, weil:** Compliance-Begründung erfordert Sprachverständnis, das heute komplett fehlt (nackte Zahl ohne Kontext) – aber der Agent bewertet nie selbst, er erklärt nur eine bereits getroffene menschliche Entscheidung nachvollziehbar.

**Nirgends verschoben wird die Verantwortung für den eigentlichen MIL-Score – weder an den Agenten noch an den deterministischen Code.** Der Score ist und bleibt Selbstauskunft des Menschen. Das ist der entscheidende Unterschied zu einem „normalen" KI-Projekt: Agentic AI übernimmt hier ausschließlich Zusatzarbeit, Interpretation und nachträgliche Erklärung – niemals die Entscheidung selbst, und niemals die Rolle des Auditors.

| Ort im System | Agentisch? | Grad | Begründung |
| --- | --- | --- | --- |
| Scoring-Kern (Formeln, Aggregation, MIL-Mapping) | **Nein, nie** | Level 0 | Aufgabe ist bereits vollständig algorithmisch gelöst – kein Interpretationsbedarf. |
| Control-/Metric-Katalog (Onboarding neuer Normtexte) | Ja, punktuell | Level 1 (Berater) | Klassifikation von Fließtext ist Sprachaufgabe, heute manuell. |
| Decision Engine (neue Kandidatensuche) | Ja, ergänzend | Level 2 (Reasoning + Tools) | Nur die Suche nach *neuen* Zuordnungen wird agentisch; die Bewertung bleibt deterministisch. |
| Metric View (Evidenz-Auskunft) | Ja, begrenzt | Level 1 (Info-Abfrage) | Kein Entscheidungsrisiko, reine Auskunft. |
| Maturity Evaluator (Freitext & Begründung) | Ja, größtes Potenzial | Level 2, mehrstufig | Größte ungenutzte Datenquelle, höchster Interpretationsbedarf. |
| Übergreifende Steuerung mehrerer Normen | Noch nicht | Level 2 – erst bei Bedarf | Lohnt sich erst ab zweitem Framework, vorher Overengineering. |

**Wichtigster Punkt:** Der höchste jemals angestrebte Grad ist **Level 2** (Agent mit Tools, Vorschlagsrecht, kein Durchgriff). **Level 4 (voll autonom) ist für dieses System nirgends vorgesehen** – ein Audit-Tool ohne menschliche Letztentscheidung wäre nicht vertretbar.

## Wo es sich lohnt – wo nicht

**Lohnt sich:**

- Freitext-Interpretation (größter ungenutzter Datenschatz, additiv, kein Score-Risiko) → bester erster Pilot.
- Neue/unüblich benannte Metrik-Kandidaten vorschlagen (Agent schlägt vor, bestehender Code prüft – Vorschlagen ist schwer, Prüfen ist leicht).
- Automatisch generierte Begründungstexte oder Auswirkungstexte zu einem Score (heute: nur nackte Zahl).

**Lohnt sich nicht (aktuell):**

- Vollautonome ****MIL-Vergabe ohne Nutzereingabe – **lohnt sich nicht, ist explizit ausgeschlossen.** Ein Agent darf beim Formulieren einer Begründung zu einer *bereits vom Menschen getroffenen* Antwort helfen, aber niemals die Selbstauskunft-Antwort selbst setzen oder vorschlagen, bevor der Mensch geantwortet hat. Das würde das Grundprinzip des Tools (Selbstauskunft statt Fremdbewertung) verletzen.
- Den Scoring-Kern selbst durch ein Modell zu ersetzen – bereits gelöst, würde nur Risiko ohne Zusatznutzen bringen.
- Multi-Agenten-Orchestrierung über mehrere Normen – es gibt aktuell nur ein Framework.

## Wer trägt welche Verantwortung

| Rolle | Verantwortung |
| --- | --- |
| **Deterministischer Kern** | Bleibt einzige Quelle der Wahrheit für den finalen MIL-Score – unverändert, auditierbar. |
| **Agent** | Nur Vorschlag/Beratung (Kandidaten, Begründungstext, Freitext-Auswertung) – kein Schreibzugriff ohne Freigabe. |
| **Mensch (Auditor)** | Die Verantwortung für die **eigentliche MIL-Antwort pro Metrik** liegt und bleibt vollständig beim Menschen – ein Agent kommt hier frühestens *nach* der Eingabe ins Spiel (z. B. um die gewählte Antwort mit einer Begründung zu unterlegen oder mit Freitext-Notizen zu verknüpfen), nie davor oder anstelle davon. |
| **Neue Rolle: Qualitätsaufsicht** | Akteur muss Testfälle, Absicherungsregeln und Protokolle pflegen - Prio 1 ist immer Sicherheit |

## Fazit

V²ISMS-MS funktioniert heute wie ein zuverlässiger Taschenrechner mit festen Formeln – gut für das, wofür er gebaut wurde, aber blind für alles außerhalb starrer Namensmuster und Zahlen. Agentic AI wird **nicht** eingeführt, um den Taschenrechner zu ersetzen, sondern um ihm an drei klar begrenzten Stellen (Freitext, neue Kandidaten, Begründungstext) ein Sprachverständnis zur Seite zu stellen – immer mit Mensch als letzter Instanz.

#