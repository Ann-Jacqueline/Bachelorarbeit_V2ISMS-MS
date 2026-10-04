import os
import sqlite3
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

# Lädt .env aus dem Projektroot (API-Keys, Provider-Konfiguration)
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from module_metric_view.MetricQueryService import MetricViewQueryService
from module_maturity_evaluation.MaturityService import MaturityService
from module_agents.AgentService import AgentService
from module_agents.NoteAnalyzerAgent import NoteAnalyzerAgent

app = Flask(__name__)
CORS(app)

# DB-Pfad: per Umgebungsvariable V2ISMS_DB_PATH überschreibbar,
# Default: V2ISMS-MS.sqlite.sqlite im Projektroot (ein Verzeichnis über backend/)
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATABASE_PATH = os.environ.get(
    "V2ISMS_DB_PATH",
    str(_PROJECT_ROOT / "V2ISMS-MS.sqlite.sqlite"),
)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Backend läuft.",
        "available_endpoints": [
            "/api/controls",
            "/api/metric-view/control/<control_id>",
            "/api/maturity/session",
            "/api/maturity/session/<session_id>/controls/<control_id>",
            "/api/maturity/session/<session_id>/controls/<control_id>/rating",
            "/api/maturity/session/<session_id>/summary",
            "/api/maturity/session/<session_id>/complete",
            "/api/maturity/session/<session_id>/submit"
        ]
    }, 200


def create_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

@app.get("/api/metric-view/control/<control_id>")
def get_metric_view_for_control(control_id):
    conn = create_connection()

    try:
        metric_query_service = MetricViewQueryService(conn)
        response = metric_query_service.get_metric_tree_response_for_control(control_id)

        if response["status"] == "success":
            return jsonify(response), 200

        return jsonify(response), 404

    except Exception:
        return jsonify({
            "status": "error",
            "control_id": control_id,
            "view_type": "metric_tree",
            "message": "Interner Fehler beim Laden der Metric View.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.get("/api/controls")
def get_controls():
    conn = create_connection()
    try:
        metric_query_service = MetricViewQueryService(conn)
        response = metric_query_service.get_all_controls_response()

        if response["status"] == "success":
            return jsonify(response), 200

        return jsonify(response), 500

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Laden der Controls.",
            "data": []
        }), 500

    finally:
        conn.close()


@app.post("/api/maturity/session")
def create_maturity_session():
    conn = create_connection()

    try:
        maturity_service = MaturityService(conn)
        response = maturity_service.create_session_response()
        return jsonify(response), 201

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Erstellen der Maturity-Session.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.get("/api/maturity/session/<session_id>/controls/<control_id>")
def get_maturity_control_view(session_id, control_id):
    conn = create_connection()
    try:
        maturity_service = MaturityService(conn)
        response = maturity_service.get_control_view_response(session_id, control_id)

        if response["status"] == "success":
            return jsonify(response), 200

        if response["status"] == "not_found":
            return jsonify(response), 404

        return jsonify(response), 400

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Laden der Maturity-Control-Ansicht.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.put("/api/maturity/session/<session_id>/controls/<control_id>/rating")
def save_maturity_rating(session_id, control_id):
    conn = create_connection()

    try:
        payload = request.get_json(silent=True) or {}
        mil_level = payload.get("mil_level")
        note = payload.get("note")

        maturity_service = MaturityService(conn)
        response = maturity_service.save_control_rating_response(
            session_id=session_id,
            control_id=control_id,
            mil_level=mil_level,
            note=note
        )

        if response["status"] == "success":
            return jsonify(response), 200

        if response["status"] == "not_found":
            return jsonify(response), 404

        return jsonify(response), 400

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Speichern der Maturity-Bewertung.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.get("/api/maturity/session/<session_id>/summary")
def get_maturity_session_summary(session_id):
    conn = create_connection()
    try:
        maturity_service = MaturityService(conn)
        response = maturity_service.get_session_summary_response(session_id)

        if response["status"] == "success":
            return jsonify(response), 200

        if response["status"] == "not_found":
            return jsonify(response), 404

        return jsonify(response), 400

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Laden der Maturity-Zusammenfassung.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.post("/api/maturity/session/<session_id>/complete")
def complete_maturity_session(session_id):
    conn = create_connection()

    try:
        maturity_service = MaturityService(conn)
        response = maturity_service.complete_session_response(session_id)

        if response["status"] == "success":
            return jsonify(response), 200

        if response["status"] == "not_found":
            return jsonify(response), 404

        return jsonify(response), 400

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Abschließen der Maturity-Session.",
            "data": None
        }), 500

    finally:
        conn.close()

@app.post("/api/maturity/session/<session_id>/submit")
def submit_maturity_session(session_id):
    conn = create_connection()

    try:
        payload = request.get_json(silent=True) or {}

        maturity_service = MaturityService(conn)
        response = maturity_service.submit_session_response(
            session_id=session_id,
            payload=payload
        )

        if response["status"] == "success":
            return jsonify(response), 200

        if response["status"] == "not_found":
            return jsonify(response), 404

        return jsonify(response), 400

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler beim Abschließen des Assessments.",
            "data": None
        }), 500

    finally:
        conn.close()

# --- Agent-Infrastruktur (Phase 0): Status, Audit-Trail, Freigabe-Workflow ---

@app.get("/api/agents/status")
def get_agent_status():
    """Zeigt, welcher LLM-Provider aktuell konfiguriert ist."""
    conn = create_connection()
    try:
        agent_service = AgentService(conn)
        return jsonify({
            "status": "success",
            "data": {
                "provider": agent_service.llm_client.provider_name,
                "note": (
                    "Mock-Provider aktiv – kein echtes LLM angebunden."
                    if agent_service.llm_client.provider_name == "mock"
                    else "Echter LLM-Provider aktiv."
                ),
            },
        }), 200
    finally:
        conn.close()


@app.post("/api/agents/test-call")
def agent_test_call():
    """Test-Endpoint: führt einen Agent-Call end-to-end aus (inkl. Logging)."""
    conn = create_connection()
    try:
        payload = request.get_json(silent=True) or {}
        agent_service = AgentService(conn)
        response = agent_service.run_agent_action(
            agent_name="test_agent",
            action="test_call",
            system_prompt=payload.get("system_prompt", "Du bist ein Test-Agent."),
            user_prompt=payload.get("user_prompt", "Ping."),
            session_id=payload.get("session_id"),
            control_id=payload.get("control_id"),
        )
        return jsonify(response), 200 if response["status"] == "success" else 500
    finally:
        conn.close()


@app.post("/api/agents/session/<session_id>/controls/<control_id>/analyze-note")
def analyze_control_note(session_id, control_id):
    """Phase 1 / Switch 2: analysiert die gespeicherte Audit-Notiz eines Controls.

    Ergebnis ist immer nur ein Vorschlag (agent_log, status='proposed') –
    Freigabe erfolgt über POST /api/agents/logs/<log_id>/review.
    """
    conn = create_connection()
    try:
        agent = NoteAnalyzerAgent(conn)
        response = agent.analyze_note_response(session_id, control_id)

        if response["status"] == "success":
            return jsonify(response), 200
        if response["status"] == "not_found":
            return jsonify(response), 404
        if response["status"] == "no_note":
            return jsonify(response), 422
        return jsonify(response), 500

    except Exception:
        return jsonify({
            "status": "error",
            "message": "Interner Fehler bei der Notiz-Analyse.",
            "data": None
        }), 500

    finally:
        conn.close()


@app.get("/api/agents/logs")
def get_agent_logs_endpoint():
    """Audit-Trail: alle Agent-Calls, optional gefiltert (?status=, ?session_id=)."""
    conn = create_connection()
    try:
        agent_service = AgentService(conn)
        response = agent_service.list_proposals(
            status=request.args.get("status"),
            session_id=request.args.get("session_id"),
        )
        return jsonify(response), 200
    finally:
        conn.close()


@app.post("/api/agents/logs/<int:log_id>/review")
def review_agent_proposal(log_id):
    """Menschliche Freigabe: {\"decision\": \"accepted\"|\"rejected\", \"reviewed_by\": \"...\"}."""
    conn = create_connection()
    try:
        payload = request.get_json(silent=True) or {}
        agent_service = AgentService(conn)
        response = agent_service.review_proposal(
            log_id=log_id,
            decision=payload.get("decision", ""),
            reviewed_by=payload.get("reviewed_by"),
        )
        if response["status"] == "success":
            return jsonify(response), 200
        if response["status"] == "not_found":
            return jsonify(response), 404
        return jsonify(response), 400
    finally:
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)