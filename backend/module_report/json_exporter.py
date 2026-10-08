import json


def render_json(report_payload):
    """Vollständiger Report als JSON-Dokument (UTF-8, eingerückt)."""
    return json.dumps(report_payload, ensure_ascii=False, indent=2)