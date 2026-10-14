"""Phase 1 / Switch 2: Freitext-Interpretation von Audit-Notizen.

Der Agent analysiert die vom Auditor gespeicherte Freitext-Notiz zu einem
Control (control_maturity_rating.note) und liefert eine strukturierte
Interpretation als VORSCHLAG (status='proposed' im agent_log).

Design-Prinzipien (V2ISMS-MS_Agents.md):
- Der Agent bewertet NIE selbst einen Reifegrad und ändert NIE den MIL-Wert.
- Reine Zusatzinformation – kein Score-Risiko.
- Jeder Call wird vollständig im agent_log protokolliert.
"""

import json

from module_agents.AgentService import AgentService
from module_maturity_evaluation.expected_metrics import get_expected_metric_ids
from module_maturity_evaluation.rating_state import get_control_rating

AGENT_NAME = "note_analyzer"
ACTION = "analyze_note"

SYSTEM_PROMPT = """Du bist ein Assistenz-Agent in einem ISO-27001-Audit-Tool (V²ISMS-MS).
Deine einzige Aufgabe: die vom Auditor gespeicherten Freitext-Notizen zu einem Sicherheits-Control inhaltlich auswerten.

Strikte Regeln:
- Du bewertest NIEMALS selbst einen Reifegrad (MIL) und schlägst NIEMALS einen MIL-Wert vor.
- Der bereits vom Menschen gewählte MIL-Wert ist reine Kontextinformation – kommentiere ihn nicht als richtig oder falsch.
- Du erfindest keine Fakten. Stütze dich ausschließlich auf den gelieferten Notiztext. Nutze den Control-Namen, die Domäne oder die ISO-Norm NICHT, um Inhalte zu ergänzen, die nicht in der Notiz stehen.
- Benenne eine inhaltliche Abweichung nur bei einem klaren Widerspruch – nicht schon bei bloßer Themenknappheit.
- Antworte auf Deutsch.

Umgang mit wenig Information (besonders wichtig):
- Prüfe zuerst die gelieferte Notiz-Abdeckung (wie viele der erwarteten Metriken haben überhaupt eine Notiz). Ist die Basis dünn (z. B. nur eine kurze Notiz), sage das zu Beginn klar und knapp.
- Halte deine Ausgabe dann KURZ. Erfinde keine generischen „offenen Punkte", nur weil die Notiz wenig hergibt.
- Unterscheide strikt zwischen:
  (a) Lücken oder Widersprüchen, die der Notiztext selbst erkennen lässt (belegt), und
  (b) Aspekten, die der Notiztext schlicht NICHT erwähnt (unbekannt, kein Fehler).
- Führe unter „Offene Punkte" nur Punkte auf, die durch fehlenden oder dünnen Notizinhalt begründet sind. Wenn nichts belegbar offen ist, schreibe „Keine erkennbar.".
- Ordne deine Einschätzung ausdrücklich als vorläufig ein, wenn die Notizbasis begrenzt ist.

Gib deine Analyse in genau dieser Struktur aus:

**Zusammenfassung:** (1–2 Sätze: Was sagen die Notizen aus? Bei dünner Basis die begrenzte Aussagekraft einordnen.)
**Belegte Sicherheitsaspekte:** (Stichpunkte: Welche konkreten Maßnahmen/Fakten belegt der Notiztext? Falls keine: „Keine belegt.")
**Offene Punkte:** (Stichpunkte: nur belegbare Lücken/Widersprüche plus ggf. „Nicht erwähnt: …" für fehlende Themen. Falls keine: „Keine erkennbar.")
"""


class NoteAnalyzerAgent:
    """Analysiert die gespeicherte Audit-Notiz eines Controls in einer Session."""

    def __init__(self, conn, llm_client=None):
        self.conn = conn
        self.agent_service = AgentService(conn, llm_client=llm_client)

    def analyze_note_response(self, session_id: str, control_id: str) -> dict:
        rating = get_control_rating(self.conn, session_id, control_id)

        if rating is None:
            return {
                "status": "not_found",
                "message": (
                    f"Keine Bewertung für Control {control_id} "
                    f"in Session {session_id} gefunden."
                ),
                "data": None,
            }

        note = rating["note"]
        if not note or not str(note).strip():
            return {
                "status": "no_note",
                "message": (
                    f"Für Control {control_id} in Session {session_id} "
                    "ist keine Notiz gespeichert – nichts zu analysieren."
                ),
                "data": None,
            }

        control_name = self._get_control_name(control_id)

        expected_count = len(get_expected_metric_ids(self.conn, control_id))
        noted_count = self._count_metric_notes(rating)
        coverage_hint = (
            f"Notiz-Abdeckung: {noted_count} von {expected_count} erwarteten "
            f"Metriken enthalten eine Audit-Notiz."
            if expected_count
            else f"Notiz-Abdeckung: {noted_count} Metrik-Notiz(en) vorhanden."
        )
        thin_basis = expected_count > 0 and noted_count <= max(1, expected_count // 3)

        user_prompt = (
            f"Control: {control_id}"
            f"{' – ' + control_name if control_name else ''}\n"
            f"Domain: {rating['domain']}\n"
            f"Vom Auditor gewählter MIL-Wert (nur Kontext, nicht kommentieren): "
            f"{rating['mil_level']}\n"
            f"{coverage_hint}\n"
            + (
                "Hinweis: Die Notizbasis ist dünn. Halte die Analyse kurz und "
                "ordne die begrenzte Aussagekraft ausdrücklich ein.\n"
                if thin_basis
                else ""
            )
            + f"\nAudit-Notiz:\n{str(note).strip()}"
        )

        response = self.agent_service.run_agent_action(
            agent_name=AGENT_NAME,
            action=ACTION,
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            session_id=session_id,
            control_id=control_id,
        )

        if response["status"] == "success":
            response["data"]["analyzed_note"] = str(note).strip()
            response["data"]["control_id"] = control_id
            response["data"]["session_id"] = session_id
            response["data"]["noted_metric_count"] = noted_count
            response["data"]["expected_metric_count"] = expected_count

        return response

    def _get_control_name(self, control_id: str) -> str | None:
        row = self.conn.execute(
            "SELECT name FROM control_profil WHERE control_id = ?",
            (control_id,),
        ).fetchone()
        return row["name"] if row else None

    @staticmethod
    def _count_metric_notes(rating) -> int:
        if rating is None or "metric_notes" not in rating.keys():
            return 0
        raw = rating["metric_notes"]
        if not raw:
            return 0
        try:
            entries = json.loads(raw)
        except (TypeError, ValueError):
            return 0
        if not isinstance(entries, list):
            return 0
        return sum(
            1
            for entry in entries
            if isinstance(entry, dict) and str(entry.get("note") or "").strip()
        )
