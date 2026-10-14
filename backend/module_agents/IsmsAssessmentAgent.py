"""KI-Assessment des ISMS-Stands anhand der Control- und Domänen-Scores.

Der Agent interpretiert die bereits deterministisch berechneten MIL-Scores
("Übersetzungsgrad" pro Control) sowie die Domain- und Gesamtaggregate und
formuliert daraus eine nachvollziehbare Einschätzung des ISMS-Stands.

Design-Prinzipien (V2ISMS-MS_Agents.md):
- Der Agent setzt oder verändert NIEMALS einen MIL-Score.
- Er interpretiert ausschließlich die ihm vorgegebenen, deterministischen Zahlen.
- Ergebnis ist immer nur ein Vorschlag (status='proposed' im agent_log),
  Freigabe erfolgt durch einen Menschen.
- Jeder Call wird vollständig im agent_log protokolliert.
"""

from module_agents.AgentService import AgentService
from module_maturity_evaluation.rating_state import (
    get_all_ratings_for_session,
    get_control_catalog,
)
from module_maturity_evaluation.score_aggregation import (
    build_domain_summary,
    build_overall_summary,
)

AGENT_NAME = "isms_assessment"
ACTION = "assess_isms"

SYSTEM_PROMPT = """Du bist ein Assistenz-Agent in einem ISO-27001-Audit-Tool (V²ISMS-MS).
Deine Aufgabe: den Reifegrad-Status des ISMS anhand bereits berechneter Scores einschätzen.

Strikte Regeln:
- Du erhältst fertige, deterministisch berechnete Scores. Du erfindest KEINE neuen Zahlen,
  änderst KEINE Scores und lehnst keine eigenen Bewertungen an.
- Beziehe dich ausschließlich auf die vorgegebenen Werte (Reifegrad, Ø MIL, Abdeckung, Domänen).
- Kennzeichne Unsicherheiten, wenn die Abdeckung niedrig ist oder viele Controls unbewertet sind.
- Du erfindest keine Fakten, die nicht aus den Scores ableitbar sind.
- Antworte auf Deutsch.

Gib deine Einschätzung in genau dieser Struktur aus:

**Gesamteinschätzung:** (2–3 Sätze: Wie reif ist das ISMS insgesamt, mit Bezug auf die Kennzahlen?)
**Stärken:** (Stichpunkte: welche Domänen/Controls sind vergleichsweise gut umgesetzt?)
**Schwächen und Risiken:** (Stichpunkte: welche Domänen/Controls sind schwach oder unbewertet?)
**Dringendster Handlungsbedarf:** (Stichpunkte: wo zuerst ansetzen, mit Begründung aus den Scores?)
"""


class IsmsAssessmentAgent:
    """Erzeugt eine KI-Einschätzung des ISMS-Stands für eine Session."""

    def __init__(self, conn, llm_client=None):
        self.conn = conn
        self.agent_service = AgentService(conn, llm_client=llm_client)

    def assess_response(self, session_id: str) -> dict:
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
                    "es gibt keinen ISMS-Stand zu bewerten."
                ),
                "data": None,
            }

        overall = build_overall_summary(
            ratings,
            total_controls=len(control_catalog),
            control_catalog=control_catalog,
        )
        domains = build_domain_summary(ratings, control_catalog)

        user_prompt = self._build_context(overall, domains)

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
            response["data"]["overall_percentage"] = overall["percentage"]
            response["data"]["avg_mil_level"] = overall["avg_mil_level"]

        return response

    def _build_context(self, overall, domains) -> str:
        coverage = overall.get("coverage") or {}
        percentage = overall.get("percentage")
        percentage_text = f"{percentage:.1f}%" if percentage is not None else "n/a"
        avg = overall.get("avg_mil_level")
        avg_text = f"{round(float(avg), 2)}" if avg is not None else "n/a"
        coverage_pct = coverage.get("coverage_percentage")
        coverage_text = (
            f"{coverage_pct:.1f}%" if coverage_pct is not None else "n/a"
        )

        lines = [
            "ISMS-Reifegrad-Kontext (deterministisch berechnet, nicht verändern):",
            "",
            f"Gesamt-Reifegrad (gesamter Prüfumfang): {percentage_text}",
            f"Ø MIL-Level: {avg_text}",
            f"Abdeckung: {coverage_text} "
            f"({coverage.get('rated_controls')} von {coverage.get('total_controls')} "
            "Controls bewertet)",
            f"Punkte: {overall.get('achieved_points')} / {overall.get('max_points')}",
            f"Vollständig bewertet: {coverage.get('complete_controls')}; "
            f"unvollständig: {coverage.get('incomplete_controls')}; "
            f"nicht bewertet: {coverage.get('unrated_controls')}",
            f"Explizit MIL 0 (Not Implemented): {coverage.get('zero_not_implemented')}",
            f"Nicht bewertete Fragen: {coverage.get('unanswered_questions')}",
            "",
            "Domänen (Reifegrad / Ø MIL / Abdeckung / Controls):",
        ]

        for domain in domains:
            dom_pct = domain.get("percentage")
            dom_pct_text = f"{dom_pct:.1f}%" if dom_pct is not None else "n/a"
            dom_avg = domain.get("avg_mil_level")
            dom_avg_text = f"{round(float(dom_avg), 2)}" if dom_avg is not None else "n/a"
            dom_cov = (domain.get("coverage") or {}).get("coverage_percentage")
            dom_cov_text = f"{dom_cov:.1f}%" if dom_cov is not None else "n/a"
            lines.append(
                f"- {domain.get('domain')}: Reifegrad {dom_pct_text}, "
                f"Ø MIL {dom_avg_text}, Abdeckung {dom_cov_text}, "
                f"{len(domain.get('controls') or [])} Controls"
            )

        lines.append("")
        lines.append(
            "Aufgabe: Erstelle das ISMS-Assessment anhand dieser Werte in der "
            "vorgegebenen Struktur."
        )

        return "\n".join(lines)
