from module_maturity_evaluation.MaturityService import MaturityService
from module_report.ReportService import ReportService
from module_report.json_exporter import render_json
from module_report.markdown_renderer import render_markdown
from module_report.pdf_renderer import render_pdf


def _complete_rating(conn, session_id, control_id, level, note=None):
    conn.execute(
        """
        insert into control_maturity_rating (
            session_id, control_id, domain, mil_level, note,
            answer_count, expected_answer_count, is_complete
        )
        values (?, ?, ?, ?, ?, 4, 4, 1)
        on conflict(session_id, control_id)
        do update set mil_level = excluded.mil_level, note = excluded.note,
                      answer_count = 4, expected_answer_count = 4, is_complete = 1
        """,
        (session_id, control_id, control_id[:3], level, note),
    )
    conn.commit()


def _insert_agent_log(conn, session_id):
    conn.execute(
        """
        insert into agent_log (
            agent_name, action, input_text, output_text, provider, model,
            status, session_id, control_id, created_at
        )
        values ('note_analyzer', 'analyze_note', '[system]x', 'Vorschlag: Risiko mittel.',
                'mock', 'mock-1', 'accepted', ?, '5.12', '2026-01-01T00:00:00+00:00')
        """,
        (session_id,),
    )
    conn.commit()


def _make_report(conn, session_id):
    return ReportService(conn).build_report_payload(session_id)


class TestReportPayload:
    def test_missing_session_returns_none(self, conn):
        assert _make_report(conn, "does-not-exist") is None

    def test_executive_summary_fields(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "5.12", 2.0, note="Visualisierung offen")

        report = _make_report(conn, sid)
        executive = report["executive"]
        assert executive["percentage"] == 22.2
        assert executive["achieved_points"] == 2.0
        assert executive["max_points"] == 9
        assert executive["avg_mil_display"] == "MIL 2.0 – Largely Implemented"
        assert "22.2%" in executive["statement"]
        assert "MIL 2.0" in executive["statement"]

    def test_zero_differenzierung_in_report(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "5.12", 0.0)

        report = _make_report(conn, sid)
        coverage = report["executive"]["coverage"]
        assert coverage["zero_not_implemented"] == 1
        assert coverage["zero_not_rated"] == 2

        access = next(d for d in report["domains"] if d["domain"] == "ACCESS")
        entry = access["controls"][0]
        assert entry["zero_reason"] == "not_rated"
        assert entry["status"] == "unrated"

    def test_agent_logs_and_notes_included(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "5.12", 2.0, note="Notiz zum Control")
        _insert_agent_log(conn, sid)

        report = _make_report(conn, sid)
        assert len(report["agent_logs"]) == 1
        log = report["agent_logs"][0]
        assert log["agent_name"] == "note_analyzer"
        assert log["status"] == "accepted"

        architecture = next(d for d in report["domains"] if d["domain"] == "ARCHITECTURE")
        control = architecture["controls"][0]
        assert control["note"] == "Notiz zum Control"
        assert control["has_note"] is True

    def test_methodology_present(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        report = _make_report(conn, sid)
        assert "reifegrad" in report["methodology"]
        assert "zero_differenzierung" in report["methodology"]


class TestRenderers:
    def test_markdown(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "6.3", 1.67)
        md = render_markdown(_make_report(conn, sid))
        assert md.startswith("# V2ISMS-MS Reifegrad-Report")
        assert "Reifegrad (gesamter Prüfumfang" in md
        assert "0-Punkte-Differenzierung" in md
        assert "AI-Analysen" in md
        assert "Berechnungsmethodik" in md

    def test_json(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "5.12", 2.0)
        js = render_json(_make_report(conn, sid))
        assert js.startswith("{")
        assert '"session_id"' in js

    def test_pdf_generates_valid_bytes(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _complete_rating(conn, sid, "5.12", 2.0)
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [{"metric_id": "m_5_12_1", "assessment_level": 2}],
                }
            ]
        })
        pdf = render_pdf(_make_report(conn, sid))
        assert pdf.startswith(b"%PDF")

    def test_pdf_sanitizes_non_winansi(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        _insert_agent_log(conn, sid)
        conn.execute(
            "update agent_log set output_text = 'Analyse ↔ zwischen den Bändern ✓' "
            "where session_id = ?",
            (sid,),
        )
        conn.commit()
        pdf = render_pdf(_make_report(conn, sid))
        assert pdf.startswith(b"%PDF")

    def test_metric_notes_in_markdown(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": "MFA-Protokolle vorhanden"},
                        {"metric_id": "m_5_12_2", "assessment_level": 1,
                         "notes": "Kostenbewertung offen"},
                        {"metric_id": "m_5_12_3", "assessment_level": 3,
                         "notes": "Konfig-Check automatisiert"},
                        {"metric_id": "m_5_12_4", "assessment_level": 2,
                         "notes": "Inventar gepflegt"},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        })
        md = render_markdown(_make_report(conn, sid))
        assert "Audit-Notizen (je Metrik)" in md
        assert "**Risk Exposure Level** (m_5_12_1): MFA-Protokolle vorhanden" in md
        assert "**Costs from Lack of Information Security**" in md
        assert "4 Audit-Notizen" in md

    def test_metric_notes_in_json(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": "MFA-Protokolle vorhanden"},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        })
        js = render_json(_make_report(conn, sid))
        assert '"metric_notes"' in js
        assert '"metric_name": "Risk Exposure Level"' in js
        assert '"MFA-Protokolle vorhanden"' in js

    def test_metric_notes_in_pdf(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": "MFA-Protokolle vorhanden und geprüft"},
                        {"metric_id": "m_5_12_2", "assessment_level": 1,
                         "notes": "Kostenbewertung offen"},
                        {"metric_id": "m_5_12_3", "assessment_level": 3,
                         "notes": "Konfig-Check automatisiert"},
                        {"metric_id": "m_5_12_4", "assessment_level": 2,
                         "notes": "Inventar gepflegt"},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        })
        pdf = render_pdf(_make_report(conn, sid))
        assert pdf.startswith(b"%PDF")

    def test_missing_metrics_in_markdown(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": None},
                        {"metric_id": "m_5_12_2", "assessment_level": 1,
                         "notes": None},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        })
        md = render_markdown(_make_report(conn, sid))
        assert "Nicht bewertete Fragen (Maturity Evaluator)" in md
        assert "**Secure Configuration Compliance** (m_5_12_3) – nicht bewertet" in md
        assert "**Asset Inventory Completeness** (m_5_12_4) – nicht bewertet" in md

    def test_missing_metrics_in_json(self, conn):
        svc = MaturityService(conn)
        sid = svc.create_session_response()["data"]["session_id"]
        svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "5.12",
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": None},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        })
        js = render_json(_make_report(conn, sid))
        assert '"missing_metrics"' in js
        assert '"metric_name": "Secure Configuration Compliance"' in js
        assert '"unanswered_questions": 3' in js