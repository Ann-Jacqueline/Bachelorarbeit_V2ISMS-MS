import sqlite3

_RATING_TABLE = "control_maturity_rating"
_NEW_COLUMNS = (
    ("answer_count", "integer"),
    ("expected_answer_count", "integer"),
    ("is_complete", "integer"),
    ("metric_notes", "text"),
    ("missing_metrics", "text")
)

_ensured_databases = set()

_RATING_COLUMNS = """
    session_id,
    control_id,
    domain,
    mil_level,
    note,
    answer_count,
    expected_answer_count,
    is_complete,
    metric_notes,
    missing_metrics,
    created_at,
    updated_at
"""


def ensure_rating_schema(conn):
    """Idempotente Migration: erweitert control_maturity_rating um die Spalten
    für Antworten-, Vollständigkeits- und Notizen-Tracking. Mehrfachaufrufe sind
    unproblematisch (Kachelspeicherung pro Datenbank)."""
    try:
        db_list = conn.execute("PRAGMA database_list").fetchone()
        db_file = (db_list[2] or ":memory:") if db_list else ":memory:"
    except sqlite3.Error:
        db_file = ":memory:"

    if db_file == ":memory:":
        cache_key = f"<mem:{id(conn)}>"
    else:
        cache_key = db_file

    if cache_key in _ensured_databases:
        return

    table_row = conn.execute(
        "select name from sqlite_master where type = 'table' and name = ?",
        (_RATING_TABLE,)
    ).fetchone()

    if not table_row:
        return

    existing = {
        row[1]
        for row in conn.execute(f"PRAGMA table_info({_RATING_TABLE})")
    }

    for column_name, column_type in _NEW_COLUMNS:
        if column_name not in existing:
            conn.execute(
                f"alter table {_RATING_TABLE} add column {column_name} {column_type}"
            )

    conn.commit()
    _ensured_databases.add(cache_key)


def resolve_rating_status(row):
    """Liefert den Bewertungsstatus eines Rating-Rows (oder None ohne Row).

    - "unrated":    keine Bewertung vorhanden (0 Punkte, Grund: nicht bewertet)
    - "incomplete": Bewertung vorhanden, aber nicht alle Metriken beantwortet
    - "complete":   vollständig bewertet
    """
    if row is None or row["mil_level"] is None:
        return "unrated"

    is_complete = row["is_complete"] if "is_complete" in row.keys() else None

    # Legacy-Zeilen ohne Flags: als vollständig behandeln.
    if is_complete is None:
        return "complete"

    return "complete" if is_complete else "incomplete"


def resolve_zero_reason(row):
    """Grund für 0 Punkte: "not_implemented" (explizit MIL 0) oder
    "not_rated" (keine Bewertung vorhanden bzw. nicht alle Fragen beantwortet).
    Sonst None."""
    status = resolve_rating_status(row)

    if status in ("unrated", "incomplete"):
        return "not_rated"

    if float(row["mil_level"]) == 0.0:
        return "not_implemented"

    return None


def upsert_control_rating(
    conn,
    session_id,
    control_id,
    domain,
    mil_level,
    note,
    answer_count=None,
    expected_answer_count=None,
    is_complete=None,
    metric_notes=None,
    missing_metrics=None
):
    conn.execute(
        """
        insert into control_maturity_rating (
            session_id, control_id, domain, mil_level, note,
            answer_count, expected_answer_count, is_complete, metric_notes,
            missing_metrics
        )
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        on conflict(session_id, control_id)
        do update set
            domain = excluded.domain,
            mil_level = excluded.mil_level,
            note = excluded.note,
            metric_notes = excluded.metric_notes,
            missing_metrics = excluded.missing_metrics,
            answer_count = coalesce(excluded.answer_count, control_maturity_rating.answer_count),
            expected_answer_count = coalesce(
                excluded.expected_answer_count,
                control_maturity_rating.expected_answer_count
            ),
            is_complete = coalesce(excluded.is_complete, control_maturity_rating.is_complete),
            updated_at = current_timestamp
        """,
        (session_id, control_id, domain, mil_level, note,
         answer_count, expected_answer_count, is_complete, metric_notes,
         missing_metrics)
    )


def get_control_rating(conn, session_id, control_id):
    return conn.execute(
        f"""
        select {_RATING_COLUMNS}
        from control_maturity_rating
        where session_id = ? and control_id = ?
        """,
        (session_id, control_id)
    ).fetchone()


def get_all_ratings_for_session(conn, session_id):
    return conn.execute(
        f"""
        select {_RATING_COLUMNS}
        from control_maturity_rating
        where session_id = ?
        order by domain asc, control_id asc
        """,
        (session_id,)
    ).fetchall()


def get_control_catalog(conn):
    """Alle Controls aus dem Katalog (Bewertungs-Scope inkl. unbewerteter Controls)."""
    return conn.execute(
        """
        select control_id, name, domain
        from control_profil
        order by control_id asc
        """
    ).fetchall()
