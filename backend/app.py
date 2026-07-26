from flask import Flask, jsonify
import sqlite3
from module_metric_view.MetricQueryService import MetricViewQueryService

app = Flask(__name__)

DATABASE_PATH = r"C:\Users\ann-jacqueline.kaldj\PyCharmProjects\Bachelorarbeit_Massnahmenbewertungshub\V2ISMS-MS.sqlite.sqlite"


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