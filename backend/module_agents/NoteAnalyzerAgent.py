"""Phase 1 / Switch 2: Freitext-Interpretation von Audit-Notizen.

Der Agent analysiert die vom Auditor gespeicherte Freitext-Notiz zu einem
Control (control_maturity_rating.note) und liefert eine strukturierte
Interpretation als VORSCHLAG (status='proposed' im agent_log).

Design-Prinzipien (V2ISMS-MS_Agents.md):
- Der Agent bewertet NIE selbst einen Reifegrad und ändert NIE den MIL-Wert.
- Reine Zusatzinformation – kein Score-Risiko.
- Jeder Call wird vollständig im agent_log protokolliert.
"""

from module_agents.AgentService import AgentService
from module_maturity_evaluation.rating_state import get_control_rating

AGENT_NAME = "note_analyzer"
ACTION = "analyze_note"

SYSTEM_PROMPT = """Du bist ein Assistenz-Agent in einem ISO-27001-Audit-Tool (V²ISMS-MS).
Deine einzige Aufgabe: die Freitext-Notiz eines Auditors zu einem Sicherheits-Control inhaltlich auswerten.

Strikte Regeln:
- Du bewertest NIEMALS selbst einen Reifegrad (MIL) und schlägst NIEMALS einen MIL-Wert vor.
- Der bereits vom Menschen gewählte MIL-Wert ist reine Kontextinformation – kommentiere ihn nicht als richtig oder falsch.
- Du erfindest keine Fakten. Wenn die Notiz zu wenig Information enthält, sage das explizit.
- Antworte auf Deutsch.

Gib deine Analyse in genau dieser Struktur aus:

**Zusammenfassung:** (1–2 Sätze: Was sagt die Notiz aus?)
**Belegte Sicherheitsaspekte:** (Stichpunkte: Welche konkreten Maßnahmen/Fakten belegt die Notiz?)
**Offene Punkte:** (Stichpunkte: Welche Fragen oder Lücken lässt die Notiz erkennen? Falls keine: "Keine erkennbar.")
"""


class NoteAnalyzerAgent:
    """Analysiert die gespeicherte Audit-Notiz eines Controls in einer Session."""

    def __init__(self, conn):
        self.conn = conn
        self.agent_service = AgentService(conn)

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

        user_prompt = (
            f"Control: {control_id}"
            f"{' – ' + control_name if control_name else ''}\n"
            f"Domain: {rating['domain']}\n"
            f"Vom Auditor gewählter MIL-Wert (nur Kontext, nicht kommentieren): "
            f"{rating['mil_level']}\n\n"
            f"Audit-Notiz:\n{str(note).strip()}"
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

        return response

    def _get_control_name(self, control_id: str) -> str | None:
        row = self.conn.execute(
            "SELECT name FROM control_profil WHERE control_id = ?",
            (control_id,),
        ).fetchone()
        return row["name"] if row else None
