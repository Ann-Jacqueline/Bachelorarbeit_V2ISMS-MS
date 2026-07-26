from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS
from module_metric_view.MetricQueryService import MetricViewQueryService

app = Flask(__name__)
CORS(app)

DATABASE_PATH = r"C:\Users\Ann-Ja\PycharmProjects\Bachelorarbeit_V2ISMS-MS\V2ISMS-MS.sqlite.sqlite"

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Backend läuft.",
        "available_endpoint": "/api/metric-view/control/<control_id>"
    }, 200

@app.get("/api/metric-view/control/<control_id>")
def get_metric_view_for_control(control_id):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row

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