from tests.conftest import make_rating

from module_maturity_evaluation.score_aggregation import (
    build_domain_summary,
    build_overall_summary,
)

CATALOG = [
    {"control_id": "5.12", "name": "Klassifizierung", "domain": "ARCHITECTURE"},
    {"control_id": "6.3", "name": "Bewusstsein", "domain": "WORKFORCE"},
    {"control_id": "8.3", "name": "Zugriffskontrolle", "domain": "ACCESS"},
]


class TestBuildOverallSummary:
    def test_all_rated(self):
        ratings = [
            make_rating("5.12", 2.0, answer_count=4, expected_answer_count=4, is_complete=1),
            make_rating("6.3", 2.0, answer_count=8, expected_answer_count=8, is_complete=1),
            make_rating("8.3", 1.67, answer_count=6, expected_answer_count=6, is_complete=1),
        ]
        overall = build_overall_summary(ratings, total_controls=3, control_catalog=CATALOG)

        assert overall["achieved_points"] == 5.67
        assert overall["max_points"] == 9
        assert overall["avg_mil_level"] == 1.89
        assert overall["percentage"] == 63.0
        assert overall["rated_controls"] == 3
        assert overall["unrated_controls"] == 0
        assert overall["coverage"]["coverage_percentage"] == 100.0

    def test_unrated_contributes_zero(self):
        ratings = [
            make_rating("5.12", 2.0, answer_count=4, expected_answer_count=4, is_complete=1),
        ]
        overall = build_overall_summary(ratings, total_controls=3, control_catalog=CATALOG)

        assert overall["max_points"] == 9
        assert overall["achieved_points"] == 2.0
        assert overall["percentage"] == 22.2
        assert overall["rated_percentage"] == 66.7
        assert overall["unrated_controls"] == 2
        assert overall["coverage"]["coverage_percentage"] == 33.3
        assert overall["coverage"]["zero_not_rated"] == 2
        assert overall["coverage"]["zero_not_implemented"] == 0

    def test_zero_reason_distinction(self):
        ratings = [
            # Explizit MIL 0 = not implemented
            make_rating("5.12", 0.0, answer_count=4, expected_answer_count=4, is_complete=1),
            # Nicht bewertet = not rated
            make_rating("6.3", None, answer_count=0, expected_answer_count=8, is_complete=0),
        ]
        overall = build_overall_summary(ratings, total_controls=3, control_catalog=CATALOG)

        assert overall["coverage"]["zero_not_implemented"] == 1
        # 6.3 (Rating-Row ohne MIL) + 8.3 (kein Rating-Row) = 2 nicht bewertet
        assert overall["coverage"]["zero_not_rated"] == 2
        assert overall["unrated_controls"] == 2
        assert overall["coverage"]["zero_not_rated"] == overall["unrated_controls"]

    def test_incomplete_status(self):
        ratings = [
            make_rating("5.12", 2.0, answer_count=1, expected_answer_count=4, is_complete=0),
        ]
        overall = build_overall_summary(ratings, total_controls=3, control_catalog=CATALOG)
        assert overall["complete_controls"] == 0
        assert overall["incomplete_controls"] == 1

    def test_legacy_row_without_flags_is_complete(self):
        ratings = [make_rating("5.12", 2.0)]
        overall = build_overall_summary(ratings, total_controls=3, control_catalog=CATALOG)
        assert overall["complete_controls"] == 1
        assert overall["incomplete_controls"] == 0


class TestBuildDomainSummary:
    def test_domains_include_unrated(self):
        ratings = [
            make_rating("5.12", 2.0, answer_count=4, expected_answer_count=4, is_complete=1),
            make_rating("8.3", None, answer_count=0, expected_answer_count=6, is_complete=0),
        ]
        domains = build_domain_summary(ratings, CATALOG)

        by_name = {d["domain"]: d for d in domains}
        assert set(by_name) == {"ARCHITECTURE", "WORKFORCE", "ACCESS"}

        access = by_name["ACCESS"]
        assert access["total_controls"] == 1
        assert access["rated_controls"] == 0
        assert access["achieved_points"] == 0.0
        assert access["max_points"] == 3
        assert access["percentage"] == 0.0
        assert access["coverage"]["zero_not_rated"] == 1
        assert access["controls"][0]["control_name"] == "Zugriffskontrolle"
        assert access["controls"][0]["status"] == "unrated"
        assert access["controls"][0]["zero_reason"] == "not_rated"

        workforce = by_name["WORKFORCE"]
        assert workforce["rated_controls"] == 0
        assert workforce["max_points"] == 3

    def test_control_entries_show_mil_display(self):
        ratings = [make_rating("8.3", 1.67, answer_count=6, expected_answer_count=6, is_complete=1)]
        domains = build_domain_summary(ratings, CATALOG)
        entry = domains[0]["controls"][0]
        assert entry["control_id"] == "8.3"
        assert entry["mil_value_display"] == 1.7
        assert entry["mil_display"] == (
            "MIL 1.7 – Partially Implemented ↔ Largely Implemented"
        )
        assert entry["mil_band"] == {"floor": 1, "ceiling": 2}
        assert entry["answer_count"] == 6
        assert entry["status"] == "complete"