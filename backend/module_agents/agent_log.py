"""Audit-Trail für alle Agent-Aufrufe (Nachvollziehbarkeits-Infrastruktur).

Jeder Agent-Call wird vollständig protokolliert: Eingabe, Ausgabe, Modell,
Zeitstempel und Freigabe-Status. Damit ist jeder Vorschlag eines Agenten
jederzeit prüfbar – Grundvoraussetzung laut V2ISMS-MS_Agents.md.

Freigabe-Statusmodell (Mensch als letzte Instanz):
    proposed  – Agent hat einen Vorschlag erzeugt, wartet auf Freigabe
    accepted  – Mensch hat den Vorschlag freigegeben
    rejected  – Mensch hat den Vorschlag abgelehnt
    error     – Agent-Call ist technisch fehlgeschlagen
"""

from datetime import datetime, timezone

VALID_STATUSES = ("proposed", "accepted", "rejected", "error")

# Status, die ein Mensch per Review setzen darf:
REVIEWABLE_STATUSES = ("accepted", "rejected")

_CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS agent_log (
    log_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name   TEXT NOT NULL,
    action       TEXT NOT NULL,
    input_text   TEXT NOT NULL,
    output_text  TEXT,
    provider     TEXT NOT NULL,
    model        TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'proposed'
                 CHECK (status IN ('proposed', 'accepted', 'rejected', 'error')),
    session_id   TEXT,
    control_id   TEXT,
    created_at   TEXT NOT NULL,
    reviewed_at  TEXT,
    reviewed_by  TEXT
)
"""


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_agent_log_table(conn) -> None:
    """Legt die agent_log-Tabelle an, falls sie noch nicht existiert."""
    conn.execute(_CREATE_TABLE_SQL)
    conn.commit()


def insert_agent_log(
    conn,
    agent_name: str,
    action: str,
    input_text: str,
    output_text: str | None,
    provider: str,
    model: str,
    status: str = "proposed",
    session_id: str | None = None,
    control_id: str | None = None,
) -> int:
    """Protokolliert einen Agent-Call und gibt die log_id zurück."""
    if status not in VALID_STATUSES:
        raise ValueError(f"Ungültiger Status '{status}'. Erlaubt: {VALID_STATUSES}")

    cursor = conn.execute(
        """
        INSERT INTO agent_log
            (agent_name, action, input_text, output_text, provider, model,
             status, session_id, control_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            agent_name, action, input_text, output_text, provider, model,
            status, session_id, control_id, _utc_now(),
        ),
    )
    conn.commit()
    return cursor.lastrowid


def review_agent_log(conn, log_id: int, new_status: str, reviewed_by: str | None = None) -> bool:
    """Menschliche Freigabe/Ablehnung eines Vorschlags.

    Nur Einträge im Status 'proposed' können reviewt werden.
    Gibt True zurück, wenn ein Eintrag aktualisiert wurde.
    """
    if new_status not in REVIEWABLE_STATUSES:
        raise ValueError(
            f"Ungültiger Review-Status '{new_status}'. Erlaubt: {REVIEWABLE_STATUSES}"
        )

    cursor = conn.execute(
        """
        UPDATE agent_log
        SET status = ?, reviewed_at = ?, reviewed_by = ?
        WHERE log_id = ? AND status = 'proposed'
        """,
        (new_status, _utc_now(), reviewed_by, log_id),
    )
    conn.commit()
    return cursor.rowcount > 0


def get_agent_log(conn, log_id: int) -> dict | None:
    row = conn.execute(
        "SELECT * FROM agent_log WHERE log_id = ?", (log_id,)
    ).fetchone()
    return dict(row) if row else None


def get_agent_logs(
    conn,
    status: str | None = None,
    session_id: str | None = None,
    limit: int = 100,
) -> list[dict]:
    """Listet Agent-Logs, optional gefiltert nach Status und/oder Session."""
    query = "SELECT * FROM agent_log WHERE 1=1"
    params: list = []

    if status is not None:
        query += " AND status = ?"
        params.append(status)
    if session_id is not None:
        query += " AND session_id = ?"
        params.append(session_id)

    query += " ORDER BY log_id DESC LIMIT ?"
    params.append(limit)

    rows = conn.execute(query, params).fetchall()
    return [dict(row) for row in rows]
