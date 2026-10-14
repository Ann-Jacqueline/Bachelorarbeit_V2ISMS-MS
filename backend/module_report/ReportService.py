from datetime import datetime, timezone

from module_maturity_evaluation.MIL_mapping import get_mil_display_info
from module_maturity_evaluation.rating_state import (
    get_all_ratings_for_session,
    get_control_catalog,
    get_control_metadata,
)
from module_maturity_evaluation.score_aggregation import (
    build_domain_summary,
    build_overall_summary,
    prioritize_improvement_candidates,
)


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class ReportService:

    def __init__(self, conn):
        self.conn = conn

    def build_report_payload(self, session_id):
        session = self.conn.execute(
            """
            select session_id, status, created_at, updated_at
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return None

        control_catalog = get_control_catalog(self.conn)
        ratings = get_all_ratings_for_session(self.conn, session_id)
        overall = build_overall_summary(
            ratings,
            total_controls=len(control_catalog),
            control_catalog=control_catalog
        )
        domains = build_domain_summary(ratings, control_catalog)
        note_count = sum(
            len(control.get("metric_notes") or [])
            for domain in domains
            for control in domain.get("controls") or []
        )

        agent_logs = self.conn.execute(
            """
            select
                log_id,
                agent_name,
                action,
                output_text,
                status,
                session_id,
                control_id,
                created_at,
                reviewed_at,
                reviewed_by,
                provider,
                model
            from agent_log
            where session_id = ?
            order by log_id desc
            """,
            (session_id,)
        ).fetchall()

        agent_log_entries = [
            {
                "log_id": row["log_id"],
                "agent_name": row["agent_name"],
                "action": row["action"],
                "output_text": row["output_text"],
                "control_id": row["control_id"],
                "status": row["status"],
                "reviewed_by": row["reviewed_by"],
                "reviewed_at": row["reviewed_at"],
                "created_at": row["created_at"],
                "provider": row["provider"],
                "model": row["model"]
            }
            for row in agent_logs
        ]

        improvement_candidates = prioritize_improvement_candidates(
            domains, control_metadata=get_control_metadata(self.conn), limit=10
        )

        return {
            "session_id": session["session_id"],
            "status": session["status"],
            "created_at": session["created_at"],
            "updated_at": session["updated_at"],
            "generated_at": _utc_now(),
            "executive": self._build_executive(overall, note_count),
            "overall": overall,
            "domains": domains,
            "isms_assessment": self._build_agent_section(
                agent_log_entries, "assess_isms"
            ),
            "improvement_suggestions": self._build_agent_section(
                agent_log_entries, "suggest_improvements",
                candidates=improvement_candidates,
            ),
            "agent_logs": agent_log_entries,
            "methodology": self._build_methodology(),
            "generated_with": "V2ISMS-MS Reifegrad-Assessment"
        }

    def _build_agent_section(self, agent_log_entries, action, candidates=None):
        """Neueste (bevorzugt freigegebene) KI-Analyse zu einer Agent-Action."""
        matching = [log for log in agent_log_entries if log["action"] == action]
        if not matching:
            return None

        selected = matching[0]
        for log in matching:
            if log["status"] == "accepted":
                selected = log
                break

        section = {
            "action": selected["action"],
            "agent_name": selected["agent_name"],
            "status": selected["status"],
            "output_text": selected["output_text"],
            "reviewed_by": selected["reviewed_by"],
            "reviewed_at": selected["reviewed_at"],
            "created_at": selected["created_at"],
            "provider": selected["provider"],
            "model": selected["model"],
        }
        if candidates is not None:
            section["candidates"] = candidates
        return section

    def _build_executive(self, overall, note_count=0):
        coverage = overall["coverage"]
        display = get_mil_display_info(overall["avg_mil_level"])

        percentage = overall["percentage"]
        percentage_text = f"{percentage:.1f}%" if percentage is not None else "n/a"

        statement = (
            f"Das Reifegrad-Assessment ergibt eine Umsetzung von {percentage_text} "
            f"über den gesamten Prüfumfang (Ø {display['mil_display']}). "
            f"Von {coverage['total_controls']} Controls im Prüfumfang wurden "
            f"{coverage['rated_controls']} bewertet (Abdeckung "
            f"{coverage['coverage_percentage']:.1f}%). "
            f"Davon sind {coverage['complete_controls']} vollständig und "
            f"{coverage['incomplete_controls']} nicht vollständig bewertet. "
            f"{coverage['zero_not_implemented']} Controls sind explizit mit MIL 0 "
            f"(Not Implemented) bewertet, {coverage['zero_not_rated']} Controls wurden "
            f"nicht (vollständig) bewertet und zählen mit 0 Punkten."
        )
        if note_count > 0:
            statement += (
                f" Es wurden {note_count} Audit-Notizen "
                f"(je Metrik) erfasst und dokumentiert."
            )
        unanswered = coverage.get("unanswered_questions") or 0
        if unanswered > 0:
            statement += (
                f" {unanswered} Fragen sind nicht bewertet und werden im "
                f"Report je Control als 'nicht bewertet' ausgewiesen."
            )

        return {
            "percentage": percentage,
            "rated_percentage": overall["rated_percentage"],
            "avg_mil_level": overall["avg_mil_level"],
            "avg_mil_display": display["mil_display"],
            "achieved_points": overall["achieved_points"],
            "max_points": overall["max_points"],
            "coverage": coverage,
            "note_count": note_count,
            "statement": statement
        }

    def _build_methodology(self):
        return {
            "reifegrad": (
                "Reifegrad % = erreichte Punkte / (Anzahl Controls im Prüfumfang × 3) × 100. "
                "Nicht bewertete Controls zählen mit 0 Punkten."
            ),
            "abdeckung": "Abdeckung % = bewertete Controls / Controls im Prüfumfang × 100.",
            "mil_level": (
                "Pro Control wird der Mittelwert der Metrik-Bewertungen (0–3) gebildet "
                "(2 Nachkommastellen). Angezeigt wird 1 Nachkommastelle ohne "
                "Aufrundung auf das nächsthöhere Reifegradband."
            ),
            "zero_differenzierung": (
                "0 Punkte = „Not Implemented“ (explizit mit MIL 0 bewertet) oder "
                "„nicht bewertet“ (keine Reifegrad-Bewertung abgegeben). Beide Fälle "
                "werden im Report getrennt ausgewiesen."
            ),
            "maturity_bands": [
                {"mil": 0, "label": "Not Implemented"},
                {"mil": 1, "label": "Partially Implemented"},
                {"mil": 2, "label": "Largely Implemented"},
                {"mil": 3, "label": "Fully Implemented"}
            ]
        }

    def to_dict(self, session_id):
        """Allgemeine API: dict des Payloads oder None, wenn die Session fehlt."""
        return self.build_report_payload(session_id)