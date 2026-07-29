def upsert_control_rating(conn, session_id, control_id, domain, mil_level, note):
    conn.execute(
        """
        insert into control_maturity_rating (
            session_id, control_id, domain, mil_level, note
        )
        values (?, ?, ?, ?, ?)
        on conflict(session_id, control_id)
        do update set
            domain = excluded.domain,
            mil_level = excluded.mil_level,
            note = excluded.note,
            updated_at = current_timestamp
        """,
        (session_id, control_id, domain, mil_level, note)
    )


def get_control_rating(conn, session_id, control_id):
    return conn.execute(
        """
        select
            session_id,
            control_id,
            domain,
            mil_level,
            note,
            created_at,
            updated_at
        from control_maturity_rating
        where session_id = ? and control_id = ?
        """,
        (session_id, control_id)
    ).fetchone()


def get_all_ratings_for_session(conn, session_id):
    return conn.execute(
        """
        select
            session_id,
            control_id,
            domain,
            mil_level,
            note,
            created_at,
            updated_at
        from control_maturity_rating
        where session_id = ?
        order by domain asc, control_id asc
        """,
        (session_id,)
    ).fetchall()