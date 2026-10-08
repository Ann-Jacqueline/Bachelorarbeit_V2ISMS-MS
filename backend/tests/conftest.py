import sqlite3
import sys
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

SCHEMA = """
CREATE TABLE control_profil (
    control_id TEXT PRIMARY KEY,
    name TEXT,
    domain TEXT
);

CREATE TABLE maturity_assessment_session (
    session_id TEXT PRIMARY KEY,
    created_at TEXT DEFAULT '2026-01-01 00:00:00',
    updated_at TEXT,
    status TEXT
);

CREATE TABLE control_maturity_rating (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    control_id TEXT,
    domain TEXT,
    mil_level REAL,
    note TEXT,
    answer_count INTEGER,
    expected_answer_count INTEGER,
    is_complete INTEGER,
    metric_notes TEXT,
    missing_metrics TEXT,
    created_at TEXT DEFAULT '2026-01-01 00:00:00',
    updated_at TEXT DEFAULT '2026-01-01 00:00:00',
    UNIQUE (session_id, control_id)
);

CREATE TABLE metric_profile (
    metric_id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE agent_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name TEXT,
    action TEXT,
    input_text TEXT,
    output_text TEXT,
    provider TEXT,
    model TEXT,
    status TEXT,
    session_id TEXT,
    control_id TEXT,
    created_at TEXT,
    reviewed_at TEXT,
    reviewed_by TEXT
);
"""

CONTROLS = [
    ("5.12", "Klassifizierung von Informationen", "ARCHITECTURE"),
    ("6.3", "IS-Bewusstsein, -ausbildung und -schulung", "WORKFORCE"),
    ("8.3", "Zugriffskontrolle", "ACCESS"),
]

METRICS_BY_CONTROL = {
    "5.12": ["m_5_12_1", "m_5_12_2", "m_5_12_3", "m_5_12_4"],
    "6.3": ["m_6_3_1", "m_6_3_2", "m_6_3_3", "m_6_3_4",
            "m_6_3_5", "m_6_3_6", "m_6_3_7", "m_6_3_8"],
    "8.3": ["m_8_3_1", "m_8_3_2", "m_8_3_3", "m_8_3_4",
            "m_8_3_5", "m_8_3_6"],
}

METRIC_NAMES = {
    "m_5_12_1": "Risk Exposure Level",
    "m_5_12_2": "Costs from Lack of Information Security",
    "m_5_12_3": "Secure Configuration Compliance",
    "m_5_12_4": "Asset Inventory Completeness",
    "m_6_3_1": "Security Training Coverage",
    "m_6_3_2": "Awareness Training Effectiveness",
    "m_8_3_1": "Physical Entry Controls Effectiveness Ratio",
    "m_8_3_2": "Scenario-based Access Tests",
}


@pytest.fixture
def conn():
    connection = sqlite3.connect(":memory:")
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.executescript(SCHEMA)
    connection.executemany(
        "insert into control_profil (control_id, name, domain) values (?, ?, ?)",
        CONTROLS,
    )
    for metric_ids in METRICS_BY_CONTROL.values():
        connection.executemany(
            "insert into metric_profile (metric_id, name) values (?, ?)",
            [(metric_id, METRIC_NAMES.get(metric_id)) for metric_id in metric_ids],
        )
    connection.commit()
    return connection


def make_rating(control_id, mil_level, note=None, answer_count=None,
                expected_answer_count=None, is_complete=None):
    domain_by_control = {control[0]: control[2] for control in CONTROLS}
    return {
        "session_id": "sess_test",
        "control_id": control_id,
        "domain": domain_by_control.get(control_id),
        "mil_level": mil_level,
        "note": note,
        "answer_count": answer_count,
        "expected_answer_count": expected_answer_count,
        "is_complete": is_complete,
    }