from tests.conftest import CONTROLS

import json

from module_agents.llm_client import LLMClient, LLMResponse, MockLLMClient
from module_agents.IsmsAssessmentAgent import IsmsAssessmentAgent
from module_agents.ImprovementAdvisorAgent import ImprovementAdvisorAgent
from module_agents.NoteAnalyzerAgent import NoteAnalyzerAgent
from module_agents.agent_log import get_agent_logs


class FakeLLMClient(LLMClient):
    """Deterministischer Test-Client – trifft niemals eine echte API."""

    provider_name = "fake"

    def __init__(self, text="**Gesamteinschätzung:** Testantwort des Agenten."):
        self._text = text
        self.last_system_prompt = None
        self.last_user_prompt = None
        self.calls = 0

    def complete(self, system_prompt, user_prompt):
        self.calls += 1
        self.last_system_prompt = system_prompt
        self.last_user_prompt = user_prompt
        return LLMResponse(text=self._text, model="fake-model", provider=self.provider_name)


class RaisingLLMClient(LLMClient):
    provider_name = "boom"

    def complete(self, system_prompt, user_prompt):
        raise RuntimeError("Provider nicht erreichbar")


def _seed_session(conn, session_id="sess_test", status="submitted"):
    conn.execute(
        "insert into maturity_assessment_session (session_id, status) values (?, ?)",
        (session_id, status),
    )
    conn.commit()


def _seed_ratings(conn, session_id="sess_test"):
    domain_by_control = {control[0]: control[2] for control in CONTROLS}
    rows = [
        ("5.12", 2.0, 4, 4, 1),
        ("6.3", 0.0, 8, 8, 1),
        ("8.3", 1.0, 6, 6, 1),
    ]
    conn.executemany(
        """
        insert into control_maturity_rating
            (session_id, control_id, domain, mil_level, answer_count,
             expected_answer_count, is_complete)
        values (?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (session_id, control_id, domain_by_control[control_id], mil,
             answers, expected, complete)
            for control_id, mil, answers, expected, complete in rows
        ],
    )
    conn.commit()


class TestIsmsAssessmentAgent:
    def test_success_creates_proposed_log(self, conn):
        _seed_session(conn)
        _seed_ratings(conn)
        fake = FakeLLMClient()

        result = IsmsAssessmentAgent(conn, llm_client=fake).assess_response("sess_test")

        assert result["status"] == "success"
        assert result["data"]["review_status"] == "proposed"
        assert result["data"]["proposal"] == fake._text
        assert result["data"]["overall_percentage"] is not None

        logs = get_agent_logs(conn, session_id="sess_test")
        assert len(logs) == 1
        assert logs[0]["agent_name"] == "isms_assessment"
        assert logs[0]["action"] == "assess_isms"
        assert logs[0]["status"] == "proposed"

    def test_prompt_carries_deterministic_context(self, conn):
        _seed_session(conn)
        _seed_ratings(conn)
        fake = FakeLLMClient()

        IsmsAssessmentAgent(conn, llm_client=fake).assess_response("sess_test")

        assert "ISMS-Reifegrad-Kontext" in fake.last_user_prompt
        assert "Gesamt-Reifegrad" in fake.last_user_prompt
        assert "nicht verändern" in fake.last_user_prompt

    def test_unknown_session_returns_not_found(self, conn):
        fake = FakeLLMClient()
        result = IsmsAssessmentAgent(conn, llm_client=fake).assess_response("missing")

        assert result["status"] == "not_found"
        assert fake.calls == 0

    def test_session_without_ratings_returns_no_data(self, conn):
        _seed_session(conn)
        fake = FakeLLMClient()
        result = IsmsAssessmentAgent(conn, llm_client=fake).assess_response("sess_test")

        assert result["status"] == "no_data"
        assert fake.calls == 0

    def test_provider_error_is_logged_not_raised(self, conn):
        _seed_session(conn)
        _seed_ratings(conn)

        result = IsmsAssessmentAgent(conn, llm_client=RaisingLLMClient()).assess_response(
            "sess_test"
        )

        assert result["status"] == "error"
        logs = get_agent_logs(conn, session_id="sess_test")
        assert len(logs) == 1
        assert logs[0]["status"] == "error"


class TestImprovementAdvisorAgent:
    def test_success_returns_candidates_and_log(self, conn):
        _seed_session(conn)
        _seed_ratings(conn)
        fake = FakeLLMClient()

        result = ImprovementAdvisorAgent(conn, llm_client=fake).suggest_response("sess_test")

        assert result["status"] == "success"
        candidates = result["data"]["candidates"]
        assert candidates
        assert result["data"]["review_status"] == "proposed"
        assert {"control_id", "priority_score", "reason"} <= set(candidates[0])

        logs = get_agent_logs(conn, session_id="sess_test")
        assert logs[0]["agent_name"] == "improvement_advisor"
        assert logs[0]["action"] == "suggest_improvements"

    def test_prompt_lists_prioritized_candidates(self, conn):
        _seed_session(conn)
        _seed_ratings(conn)
        fake = FakeLLMClient()

        ImprovementAdvisorAgent(conn, llm_client=fake).suggest_response("sess_test")

        assert "Priorisierte Verbesserungskandidaten" in fake.last_user_prompt
        assert "Priorität:" in fake.last_user_prompt

    def test_unknown_session_returns_not_found(self, conn):
        fake = FakeLLMClient()
        result = ImprovementAdvisorAgent(conn, llm_client=fake).suggest_response("missing")

        assert result["status"] == "not_found"
        assert fake.calls == 0

    def test_session_without_ratings_returns_no_data(self, conn):
        _seed_session(conn)
        fake = FakeLLMClient()
        result = ImprovementAdvisorAgent(conn, llm_client=fake).suggest_response("sess_test")

        assert result["status"] == "no_data"
        assert fake.calls == 0


class TestNoteAnalyzerAgent:
    def _seed_note_rating(self, conn, session_id="sess_test"):
        conn.execute(
            """
            insert into control_maturity_rating
                (session_id, control_id, domain, mil_level, note, metric_notes)
            values (?, '5.12', 'ARCHITECTURE', 2.0, ?, ?)
            """,
            (
                session_id,
                "MFA-Protokolle vorhanden",
                json.dumps(
                    [
                        {
                            "metric_id": "m_5_12_1",
                            "metric_name": "Risk Exposure Level",
                            "note": "MFA-Protokolle vorhanden",
                        }
                    ]
                ),
            ),
        )
        conn.commit()

    def test_success_creates_proposed_log(self, conn):
        self._seed_note_rating(conn)
        fake = FakeLLMClient()

        result = NoteAnalyzerAgent(conn, llm_client=fake).analyze_note_response(
            "sess_test", "5.12"
        )

        assert result["status"] == "success"
        assert result["data"]["review_status"] == "proposed"
        assert result["data"]["noted_metric_count"] == 1
        assert result["data"]["expected_metric_count"] == 4

        logs = get_agent_logs(conn, session_id="sess_test")
        assert len(logs) == 1
        assert logs[0]["agent_name"] == "note_analyzer"
        assert logs[0]["action"] == "analyze_note"

    def test_sparse_basis_in_prompt_and_system_prompt(self, conn):
        self._seed_note_rating(conn)
        fake = FakeLLMClient()

        NoteAnalyzerAgent(conn, llm_client=fake).analyze_note_response("sess_test", "5.12")

        assert "Notiz-Abdeckung: 1 von 4" in fake.last_user_prompt
        assert "dünn" in fake.last_user_prompt
        assert "Umgang mit wenig Information" in fake.last_system_prompt

    def test_missing_control_returns_not_found(self, conn):
        fake = FakeLLMClient()
        result = NoteAnalyzerAgent(conn, llm_client=fake).analyze_note_response(
            "sess_test", "999"
        )

        assert result["status"] == "not_found"
        assert fake.calls == 0

    def test_rating_without_note_returns_no_note(self, conn):
        conn.execute(
            """
            insert into control_maturity_rating
                (session_id, control_id, domain, mil_level, note)
            values ('sess_test', '5.12', 'ARCHITECTURE', 2.0, NULL)
            """
        )
        conn.commit()
        fake = FakeLLMClient()

        result = NoteAnalyzerAgent(conn, llm_client=fake).analyze_note_response(
            "sess_test", "5.12"
        )

        assert result["status"] == "no_note"
        assert fake.calls == 0


class TestMockLLMClientBranches:
    def test_isms_branch(self):
        text = MockLLMClient().complete("sys", "ISMS-Reifegrad-Kontext:\nGesamt-Reifegrad: 50.0%")
        assert "Gesamteinschätzung" in text.text
        assert "MOCK-Antwort" in text.text

    def test_improvement_branch(self):
        prompt = "Priorisierte Verbesserungskandidaten:\n1. 8.3 – Zugriff (ACCESS) | MIL 1.0 | Kritikalität: hoch | Priorität: 9.0"
        text = MockLLMClient().complete("sys", prompt)
        assert "Priorisierte Verbesserungsvorschläge" in text.text
        assert "8.3" in text.text
