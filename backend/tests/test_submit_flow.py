from module_maturity_evaluation.MaturityService import MaturityService
from module_report.ReportService import ReportService


def _new_session(svc):
    return svc.create_session_response()["data"]["session_id"]


def _answers(control_id, values):
    metric_ids = {
        "5.12": ["m_5_12_1", "m_5_12_2", "m_5_12_3", "m_5_12_4"],
        "6.3": [
            "m_6_3_1", "m_6_3_2", "m_6_3_3", "m_6_3_4",
            "m_6_3_5", "m_6_3_6", "m_6_3_7", "m_6_3_8",
        ],
        "8.3": ["m_8_3_1", "m_8_3_2", "m_8_3_3", "m_8_3_4", "m_8_3_5", "m_8_3_6"],
    }[control_id]
    return [
        {"metric_id": metric_id, "assessment_level": level, "notes": None}
        for metric_id, level in zip(metric_ids, values)
    ]


class TestSubmitSession:
    def test_incomplete_control_flagged(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": False,
                    "updated_at": "t",
                    "answers": _answers("5.12", [2]),
                }
            ],
            "fill_missing_with_zero": False,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        submitted = response["data"]["submitted_controls"][0]
        assert submitted["mil_level"] == 2.0
        assert submitted["status"] == "incomplete"
        assert submitted["answer_count"] == 1
        assert submitted["expected_answer_count"] == 4

        overall = response["data"]["overall"]
        assert overall["unrated_controls"] == 2
        assert overall["max_points"] == 9
        # 5.12 (unvollständig beantwortet) zählt jetzt ebenfalls als "not_rated".
        assert overall["coverage"]["zero_not_rated"] == 3

    def test_zero_fill_keeps_missing_metrics_visible(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": False,
                    "updated_at": "t",
                    "answers": _answers("5.12", [2]),
                }
            ],
            "fill_missing_with_zero": True,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        submitted = response["data"]["submitted_controls"][0]
        # Fehlende Fragen zählen 0 Punkte, bleiben aber als unbewertet sichtbar:
        # (2 + 0 + 0 + 0) / 4 = 0.5
        assert submitted["mil_level"] == 0.5
        assert submitted["status"] == "incomplete"
        assert submitted["zero_reason"] == "not_rated"
        assert submitted["answer_count"] == 1
        assert submitted["expected_answer_count"] == 4

    def test_explicit_zero_gives_not_implemented(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": True,
                    "updated_at": "t",
                    "answers": _answers("5.12", [0, 0, 0, 0]),
                }
            ],
            "fill_missing_with_zero": False,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        submitted = response["data"]["submitted_controls"][0]
        assert submitted["mil_level"] == 0.0
        assert submitted["zero_reason"] == "not_implemented"
        assert submitted["status"] == "complete"

        overall = response["data"]["overall"]
        assert overall["coverage"]["zero_not_implemented"] == 1

    def test_unrated_control_zero_reason_not_rated(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": True,
                    "updated_at": "t",
                    "answers": _answers("5.12", [2, 2, 2, 2]),
                }
            ],
            "fill_missing_with_zero": False,
        }
        response = svc.submit_session_response(sid, payload)

        domains = {d["domain"]: d for d in response["data"]["domains"]}
        access = domains["ACCESS"]["controls"][0]
        assert access["status"] == "unrated"
        assert access["zero_reason"] == "not_rated"
        assert access["mil_level"] is None
        assert access["mil_display"] is None

    def test_rejects_invalid_control_id(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        response = svc.submit_session_response(sid, {
            "controls": [
                {
                    "control_id": "999",
                    "answers": [{"assessment_level": 2}],
                }
            ]
        })
        assert response["status"] == "not_found"

    def test_summary_view_includes_catalog(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        response = svc.get_session_summary_response(sid)
        overall = response["data"]["overall"]
        assert overall["total_controls"] == 3
        assert overall["unrated_controls"] == 3
        assert overall["max_points"] == 9
        assert len(response["data"]["domains"]) == 3

    def test_metric_notes_stored_per_metric(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": True,
                    "answers": [
                        {"metric_id": "m_5_12_1", "assessment_level": 2,
                         "notes": "MFA-Protokolle vorhanden"},
                        {"metric_id": "m_5_12_2", "assessment_level": 1,
                         "notes": "Kostenbewertung offen"},
                        {"metric_id": "m_5_12_3", "assessment_level": 3,
                         "notes": None},
                        {"metric_id": "m_5_12_4", "assessment_level": 2,
                         "notes": "Inventar teilweise manuell gepflegt"},
                    ],
                }
            ],
            "fill_missing_with_zero": False,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        report = ReportService(conn).build_report_payload(sid)
        architecture = next(d for d in report["domains"] if d["domain"] == "ARCHITECTURE")
        entry = architecture["controls"][0]
        assert entry["control_id"] == "5.12"

        assert len(entry["metric_notes"]) == 3
        assert entry["metric_notes"][0]["metric_id"] == "m_5_12_1"
        assert entry["metric_notes"][0]["metric_name"] == "Risk Exposure Level"
        assert entry["metric_notes"][0]["note"] == "MFA-Protokolle vorhanden"

        assert entry["note"] is not None
        assert "MFA-Protokolle vorhanden" in entry["note"]

        assert report["executive"]["note_count"] == 3
        assert "3 Audit-Notizen" in report["executive"]["statement"]

    def test_missing_metrics_listed_per_control(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": False,
                    "answers": _answers("5.12", [2]),
                }
            ],
            "fill_missing_with_zero": False,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        submitted = response["data"]["submitted_controls"][0]
        assert submitted["status"] == "incomplete"
        assert submitted["missing_metrics"] == [
            {"metric_id": "m_5_12_2", "metric_name": "Costs from Lack of Information Security"},
            {"metric_id": "m_5_12_3", "metric_name": "Secure Configuration Compliance"},
            {"metric_id": "m_5_12_4", "metric_name": "Asset Inventory Completeness"},
        ]

        overall = response["data"]["overall"]
        assert overall["coverage"]["unanswered_questions"] == 3

        summary = svc.get_session_summary_response(sid)
        architecture = next(
            d for d in summary["data"]["domains"] if d["domain"] == "ARCHITECTURE"
        )
        entry = architecture["controls"][0]
        assert entry["missing_metrics"][0]["metric_id"] == "m_5_12_2"

    def test_fill_zero_marks_missing_as_unanswered(self, conn):
        svc = MaturityService(conn)
        sid = _new_session(svc)
        payload = {
            "controls": [
                {
                    "control_id": "5.12",
                    "completed": False,
                    "answers": _answers("5.12", [2]),
                }
            ],
            "fill_missing_with_zero": True,
        }
        response = svc.submit_session_response(sid, payload)
        assert response["status"] == "success"

        submitted = response["data"]["submitted_controls"][0]
        assert submitted["status"] == "incomplete"
        assert submitted["zero_reason"] == "not_rated"
        assert submitted["answer_count"] == 1
        # Fehlende Fragen bleiben sichtbar "nicht bewertet".
        assert [m["metric_id"] for m in submitted["missing_metrics"]] == [
            "m_5_12_2", "m_5_12_3", "m_5_12_4",
        ]
        assert response["data"]["overall"]["coverage"]["unanswered_questions"] == 3