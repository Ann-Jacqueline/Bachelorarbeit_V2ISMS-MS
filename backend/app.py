from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

from module_metric_view.MetricQueryService import MetricViewQueryService
from module_maturity_evaluation.MaturityService import MaturityService

app = Flask(__name__)
CORS(app)

DATABASE_PATH = r"C:\Users\Ann-Ja\PycharmProjects\Bachelorarbeit_V2ISMS-MS\V2ISMS-MS.sqlite.sqlite"


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
            "/api/maturity/session/<session_id>/complete"
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

if __name__ == "__main__":
    app.run(debug=True)