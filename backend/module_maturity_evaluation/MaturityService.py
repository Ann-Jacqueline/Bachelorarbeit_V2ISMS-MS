import json
import uuid

from module_maturity_evaluation.expected_metrics import get_expected_metric_ids
from module_maturity_evaluation.MIL_mapping import (
    get_mil_display_info,
    validate_mil_level
)
from module_maturity_evaluation.rating_state import (
    ensure_rating_schema,
    get_all_ratings_for_session,
    get_control_catalog,
    get_control_rating,
    resolve_rating_status,
    resolve_zero_reason,
    upsert_control_rating
)
from module_maturity_evaluation.score_aggregation import (
    build_domain_summary,
    build_overall_summary
)


class MaturityService:
    def __init__(self, conn):
        self.conn = conn
        ensure_rating_schema(conn)

    def create_session_response(self):
        session_id = f"sess_{uuid.uuid4().hex[:12]}"

        self.conn.execute(
            """
            insert into maturity_assessment_session (session_id, status)
            values (?, 'active')
            """,
            (session_id,)
        )
        self.conn.commit()

        return {
            "status": "success",
            "message": "Maturity-Session erfolgreich erstellt.",
            "data": {
                "session_id": session_id,
                "status": "active"
            }
        }

    def get_control_view_response(self, session_id, control_id):
        session = self.conn.execute(
            """
            select session_id, status
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": "Session wurde nicht gefunden.",
                "data": None
            }

        control = self.conn.execute(
            """
            select
                cp.control_id,
                cp.name,
                cp.domain,
                cp.kritikalitaet,
                cp.pruefbarkeit,
                cp.org_anteil,
                cp.tech_anteil,
                cp.aenderungsfrequenz,
                cp.requires_logs,
                cp.requires_konfig,
                cp.requires_policy_dokumente,
                cp.requires_interviews,
                cp.requires_beobachtung
            from control_profil cp
            where cp.control_id = ?
            """,
            (control_id,)
        ).fetchone()

        if not control:
            return {
                "status": "not_found",
                "message": "Control wurde nicht gefunden.",
                "data": None
            }

        questions = self.conn.execute(
            """
            select question_no, question, help_text
            from control_maturity_question
            where control_id = ?
            order by question_no asc
            """,
            (control_id,)
        ).fetchall()

        rating = get_control_rating(self.conn, session_id, control_id)

        mil_level = rating["mil_level"] if rating else None
        note = rating["note"] if rating else None
        rating_status = resolve_rating_status(rating)
        display_info = get_mil_display_info(mil_level)

        return {
            "status": "success",
            "message": "Maturity-Control-Ansicht erfolgreich geladen.",
            "data": {
                "session_id": session_id,
                "session_status": session["status"],
                "question_count": len(questions),
                "control": {
                    "control_id": control["control_id"],
                    "name": control["name"],
                    "domain": control["domain"],
                    "kritikalitaet": control["kritikalitaet"],
                    "pruefbarkeit": control["pruefbarkeit"],
                    "org_anteil": control["org_anteil"],
                    "tech_anteil": control["tech_anteil"],
                    "aenderungsfrequenz": control["aenderungsfrequenz"],
                    "requires_logs": bool(control["requires_logs"]),
                    "requires_konfig": bool(control["requires_konfig"]),
                    "requires_policy_dokumente": bool(control["requires_policy_dokumente"]),
                    "requires_interviews": bool(control["requires_interviews"]),
                    "requires_beobachtung": bool(control["requires_beobachtung"])
                },
                "questions": [
                    {
                        "question_no": row["question_no"],
                        "question": row["question"],
                        "help_text": row["help_text"]
                    }
                    for row in questions
                ],
                "rating": {
                    "mil_level": mil_level,
                    "mil_label": display_info["mil_label"],
                    "mil_display": display_info["mil_display"],
                    "mil_labels": display_info["mil_labels"],
                    "mil_band": display_info["mil_band"],
                    "status": rating_status,
                    "zero_reason": resolve_zero_reason(rating),
                    "answer_count": rating["answer_count"] if rating else None,
                    "expected_answer_count": rating["expected_answer_count"] if rating else None,
                    "note": note
                }
            }
        }

    def save_control_rating_response(self, session_id, control_id, mil_level, note=None):
        session = self.conn.execute(
            """
            select session_id, status
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": "Session wurde nicht gefunden.",
                "data": None
            }

        if session["status"] != "active":
            return {
                "status": "error",
                "message": "Session ist nicht aktiv und kann nicht mehr bewertet werden.",
                "data": None
            }

        control = self.conn.execute(
            """
            select control_id, domain, name
            from control_profil
            where control_id = ?
            """,
            (control_id,)
        ).fetchone()

        if not control:
            return {
                "status": "not_found",
                "message": "Control wurde nicht gefunden.",
                "data": None
            }

        if note is not None and not isinstance(note, str):
            return {
                "status": "error",
                "message": "Die Notiz muss ein Textwert sein.",
                "data": None
            }

        if isinstance(note, str):
            note = note.strip()
            if note == "":
                note = None

        try:
            if mil_level is not None:
                if isinstance(mil_level, bool):
                    raise ValueError("Ungültiger MIL-Level. Erlaubt sind nur 0, 1, 2 oder 3.")
                mil_level = float(mil_level)
                validate_mil_level(mil_level)
        except (TypeError, ValueError) as exc:
            return {
                "status": "error",
                "message": str(exc),
                "data": None
            }

        upsert_control_rating(
            conn=self.conn,
            session_id=session_id,
            control_id=control_id,
            domain=control["domain"],
            mil_level=mil_level,
            note=note
        )

        self.conn.execute(
            """
            update maturity_assessment_session
            set updated_at = current_timestamp
            where session_id = ?
            """,
            (session_id,)
        )
        self.conn.commit()

        saved = get_control_rating(self.conn, session_id, control_id)
        saved_display = get_mil_display_info(saved["mil_level"] if saved else None)

        return {
            "status": "success",
            "message": "Maturity-Bewertung erfolgreich gespeichert.",
            "data": {
                "session_id": session_id,
                "control_id": control_id,
                "control_name": control["name"],
                "domain": control["domain"],
                "mil_level": saved["mil_level"] if saved else None,
                "mil_label": saved_display["mil_label"],
                "mil_display": saved_display["mil_display"],
                "note": saved["note"] if saved else None
            }
        }

    def get_session_summary_response(self, session_id):
        session = self.conn.execute(
            """
            select session_id, status, created_at, updated_at
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": "Session wurde nicht gefunden.",
                "data": None
            }

        control_catalog = get_control_catalog(self.conn)
        ratings = get_all_ratings_for_session(self.conn, session_id)
        domain_summary = build_domain_summary(ratings, control_catalog)
        overall_summary = build_overall_summary(
            ratings,
            total_controls=len(control_catalog),
            control_catalog=control_catalog
        )

        return {
            "status": "success",
            "message": "Maturity-Zusammenfassung erfolgreich geladen.",
            "data": {
                "session_id": session["session_id"],
                "status": session["status"],
                "created_at": session["created_at"],
                "updated_at": session["updated_at"],
                "overall": overall_summary,
                "domains": domain_summary
            }
        }

    def complete_session_response(self, session_id):
        session = self.conn.execute(
            """
            select session_id, status
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": "Session wurde nicht gefunden.",
                "data": None
            }

        if session["status"] == "completed":
            return {
                "status": "error",
                "message": "Session ist bereits abgeschlossen.",
                "data": {
                    "session_id": session_id,
                    "status": "completed"
                }
            }

        self.conn.execute(
            """
            update maturity_assessment_session
            set status     = 'completed',
                updated_at = current_timestamp
            where session_id = ?
            """,
            (session_id,)
        )
        self.conn.commit()

        return {
            "status": "success",
            "message": "Session erfolgreich abgeschlossen.",
            "data": {
                "session_id": session_id,
                "status": "completed"
            }
        }

    def submit_session_response(self, session_id, payload):
        session = self.conn.execute(
            """
            select session_id, status
            from maturity_assessment_session
            where session_id = ?
            """,
            (session_id,)
        ).fetchone()

        if not session:
            return {
                "status": "not_found",
                "message": "Session wurde nicht gefunden.",
                "data": None
            }

        if session["status"] != "active":
            return {
                "status": "error",
                "message": "Session ist nicht aktiv und kann nicht mehr abgeschlossen werden.",
                "data": None
            }

        if not isinstance(payload, dict):
            return {
                "status": "error",
                "message": "Ungültiges Request-Format.",
                "data": None
            }

        controls = payload.get("controls")
        fill_missing_with_zero = bool(payload.get("fill_missing_with_zero", False))

        if not isinstance(controls, list) or not controls:
            return {
                "status": "error",
                "message": "Es wurden keine Control-Pakete übermittelt.",
                "data": None
            }

        processed_controls = []
        processed_answers = 0

        metric_names = {
            row["metric_id"]: row["name"]
            for row in self.conn.execute(
                "select metric_id, name from metric_profile"
            )
        }

        for control_packet in controls:
            if not isinstance(control_packet, dict):
                return {
                    "status": "error",
                    "message": "Ein Control-Paket ist ungültig formatiert.",
                    "data": None
                }

            control_id = control_packet.get("control_id")
            answers = control_packet.get("answers", [])

            if not control_id or not isinstance(control_id, str):
                return {
                    "status": "error",
                    "message": "Ein Control-Paket enthält keine gültige control_id.",
                    "data": None
                }

            if not isinstance(answers, list):
                return {
                    "status": "error",
                    "message": f"Die Antworten für Control {control_id} sind ungültig formatiert.",
                    "data": None
                }

            control = self.conn.execute(
                """
                select control_id, domain, name
                from control_profil
                where control_id = ?
                """,
                (control_id,)
            ).fetchone()

            if not control:
                return {
                    "status": "not_found",
                    "message": f"Control {control_id} wurde nicht gefunden.",
                    "data": None
                }

            expected_metric_ids = get_expected_metric_ids(self.conn, control_id)

            answered_metric_ids = {
                answer.get("metric_id")
                for answer in answers
                if isinstance(answer, dict) and answer.get("metric_id")
            }

            fill_count = 0
            if fill_missing_with_zero and expected_metric_ids:
                for metric_id in expected_metric_ids:
                    if metric_id not in answered_metric_ids:
                        answers.append({
                            "metric_id": metric_id,
                            "assessment_level": 0,
                            "notes": None
                        })
                        fill_count += 1

            normalized_levels = []
            final_note_parts = []
            metric_notes = []

            for answer in answers:
                if not isinstance(answer, dict):
                    return {
                        "status": "error",
                        "message": f"Eine Antwort in Control {control_id} ist ungültig formatiert.",
                        "data": None
                    }

                metric_id = answer.get("metric_id")
                assessment_level = answer.get("assessment_level", 0)
                note = answer.get("notes")

                try:
                    if assessment_level is None:
                        assessment_level = 0

                    if isinstance(assessment_level, bool):
                        raise ValueError("Ungültiger MIL-Level. Erlaubt sind nur 0, 1, 2 oder 3.")

                    assessment_level = int(assessment_level)
                    validate_mil_level(assessment_level)
                except (TypeError, ValueError) as exc:
                    return {
                        "status": "error",
                        "message": f"Ungültige Bewertung in Control {control_id}: {str(exc)}",
                        "data": None
                    }

                if note is not None and not isinstance(note, str):
                    return {
                        "status": "error",
                        "message": f"Die Notiz in Control {control_id} muss ein Textwert sein.",
                        "data": None
                    }

                if isinstance(note, str):
                    note = note.strip()
                    if note:
                        final_note_parts.append(note)
                        if metric_id:
                            metric_notes.append({
                                "metric_id": str(metric_id),
                                "metric_name": metric_names.get(str(metric_id)),
                                "note": note
                            })

                normalized_levels.append(assessment_level)
                processed_answers += 1

            final_mil_level = (
                round(sum(normalized_levels) / len(normalized_levels), 2)
                if normalized_levels
                else None
            )

            final_note = "\n\n".join(final_note_parts) if final_note_parts else None
            metric_notes_json = (
                json.dumps(metric_notes, ensure_ascii=False)
                if metric_notes
                else None
            )

            missing_metrics = [
                {
                    "metric_id": metric_id,
                    "metric_name": metric_names.get(metric_id)
                }
                for metric_id in expected_metric_ids
                if metric_id not in answered_metric_ids
            ]
            missing_metrics_json = (
                json.dumps(missing_metrics, ensure_ascii=False)
                if missing_metrics
                else None
            )

            answer_count = len(normalized_levels) - fill_count
            expected_count = len(expected_metric_ids)
            if expected_count > 0:
                is_complete = answer_count >= expected_count
            else:
                is_complete = True

            upsert_control_rating(
                conn=self.conn,
                session_id=session_id,
                control_id=control_id,
                domain=control["domain"],
                mil_level=final_mil_level,
                note=final_note,
                answer_count=answer_count,
                expected_answer_count=expected_count,
                is_complete=1 if is_complete else 0,
                metric_notes=metric_notes_json,
                missing_metrics=missing_metrics_json
            )

            rating_row = get_control_rating(self.conn, session_id, control_id)
            display_info = get_mil_display_info(final_mil_level)

            processed_controls.append({
                "control_id": control_id,
                "control_name": control["name"],
                "domain": control["domain"],
                "mil_level": final_mil_level,
                "mil_label": display_info["mil_label"],
                "mil_display": display_info["mil_display"],
                "status": resolve_rating_status(rating_row),
                "zero_reason": resolve_zero_reason(rating_row),
                "answer_count": answer_count,
                "expected_answer_count": expected_count,
                "missing_metrics": missing_metrics
            })

        self.conn.execute(
            """
            update maturity_assessment_session
            set status = 'completed',
                updated_at = current_timestamp
            where session_id = ?
            """,
            (session_id,)
        )
        self.conn.commit()

        control_catalog = get_control_catalog(self.conn)
        ratings = get_all_ratings_for_session(self.conn, session_id)
        domain_summary = build_domain_summary(ratings, control_catalog)
        overall_summary = build_overall_summary(
            ratings,
            total_controls=len(control_catalog),
            control_catalog=control_catalog
        )

        return {
            "status": "success",
            "message": "Assessment erfolgreich übermittelt und abgeschlossen.",
            "data": {
                "session_id": session_id,
                "status": "completed",
                "submitted_controls": processed_controls,
                "processed_control_count": len(processed_controls),
                "processed_answer_count": processed_answers,
                "overall": overall_summary,
                "domains": domain_summary
            }
        }