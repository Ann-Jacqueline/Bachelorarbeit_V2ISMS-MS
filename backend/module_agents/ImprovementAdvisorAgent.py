"""KI-Verbesserungsvorschläge anhand des Umsetzungsgrads (MIL) einzelner Controls.

Der Agent erhält ein deterministisch vorpriorisiertes Ranking der Controls mit
dem größten Verbesserungsbedarf (MIL-Lücke × Kritikalität) und formuliert daraus
konkrete, umsetzbare Maßnahmen.

Design-Prinzipien (V2ISMS-MS_Agents.md):
- Der Agent setzt oder verändert NIEMALS einen MIL-Score.
- Die Priorisierung ist deterministisch und reproduzierbar – der Agent formuliert nur aus.
- Ergebnis ist immer nur ein Vorschlag (status='proposed' im agent_log),
  Freigabe erfolgt durch einen Menschen.
- Jeder Call wird vollständig im agent_log protokolliert.
"""

from module_agents.AgentService import AgentService
from module_maturity_evaluation.rating_state import (
    get_all_ratings_for_session,
    get_control_catalog,
    get_control_metadata,
)
from module_maturity_evaluation.score_aggregation import (
    build_domain_summary,
    prioritize_improvement_candidates,
)

AGENT_NAME = "improvement_advisor"
ACTION = "suggest_improvements"

SYSTEM_PROMPT = """Du bist ein Assistenz-Agent in einem ISO-27001-Audit-Tool (V²ISMS-MS).
Deine Aufgabe: konkrete Verbesserungsvorschläge für ein ISMS formulieren.

Du erhältst eine deterministisch vorpriorisierte Liste von Controls mit dem größten
Verbesserungsbedarf. Jeder Eintrag enthält den erreichten Umsetzungsgrad (MIL), die
Kritikalität und einen berechneten Prioritätswert.

Strikte Regeln:
- Du setzt oder änderst NIEMALS einen MIL-Score und schlägst keinen neuen Score vor.
- Deine Vorschläge müssen sich auf die vorgegebenen Controls und Werte stützen.
- Erfinde keine Fakten über die Organisation, die nicht in den Eingaben stehen.
- Formuliere umsetzbare, konkrete Maßnahmen – keine Allgemeinplätze.
- Antworte auf Deutsch.

Gib deine Vorschläge in genau dieser Struktur aus:

**Zusammenfassung:** (1–2 Sätze: Wo liegt der größte Hebel insgesamt?)
**Priorisierte Verbesserungsvorschläge:** (je Control ein Block mit
  - **Control-ID – Name**: Maßnahme; Bezug zum Umsetzungsgrad; erwarteter Effekt)
**Hinweis:** (1 Satz: Die Priorisierung basiert auf MIL-Lücke und Kritikalität.)
"""


class ImprovementAdvisorAgent:
    """Erzeugt priorisierte Verbesserungsvorschläge für eine Session."""

    def __init__(self, conn, llm_client=None):
        self.conn = conn
        self.agent_service = AgentService(conn, llm_client=llm_client)

    def suggest_response(self, session_id: str) -> dict:
        session = self.conn.execute(
            "select session_id from maturity_assessment_session where session_id = ?",
            (session_id,),
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": f"Session {session_id} wurde nicht gefunden.",
                "data": None,
            }

        control_catalog = get_control_catalog(self.conn)
        ratings = get_all_ratings_for_session(self.conn, session_id)

        if not ratings:
            return {
                "status": "no_data",
                "message": (
                    f"Für Session {session_id} liegen keine Bewertungen vor – "
                    "es gibt keine Grundlage für Verbesserungsvorschläge."
                ),
                "data": None,
            }

        domains = build_domain_summary(ratings, control_catalog)
        control_metadata = get_control_metadata(self.conn)
        candidates = prioritize_improvement_candidates(
            domains, control_metadata=control_metadata, limit=10
        )

        user_prompt = self._build_context(candidates)

        response = self.agent_service.run_agent_action(
            agent_name=AGENT_NAME,
            action=ACTION,
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            session_id=session_id,
            control_id=None,
        )

        if response["status"] == "success":
            response["data"]["session_id"] = session_id
            response["data"]["candidates"] = candidates

        return response

    def _build_context(self, candidates) -> str:
        lines = [
            "Priorisierte Verbesserungskandidaten (deterministisch berechnet, "
            "nicht verändern):",
            "",
        ]
        for index, candidate in enumerate(candidates, start=1):
            lines.append(
                f"{index}. {candidate.get('control_id')} – "
                f"{candidate.get('control_name') or candidate.get('control_id')} "
                f"({candidate.get('domain')}) | "
                f"{candidate.get('mil_display') or candidate.get('mil_level') or 'nicht bewertet'} | "
                f"Kritikalität: {candidate.get('kritikalitaet') or 'unbekannt'} | "
                f"Priorität: {candidate.get('priority_score')}"
            )

        lines.append("")
        lines.append(
            "Aufgabe: Formuliere für diese Controls konkrete, priorisierte "
            "Verbesserungsvorschläge in der vorgegebenen Struktur."
        )
        return "\n".join(lines)
