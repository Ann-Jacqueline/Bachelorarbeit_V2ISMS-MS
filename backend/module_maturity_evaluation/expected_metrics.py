from collections import namedtuple

import module_decision_engine.MatchingRules as MatchingRules

_ControlRef = namedtuple("_ControlRef", ["control_id"])
_MetricRef = namedtuple("_MetricRef", ["metric_id"])


def get_expected_metric_ids(conn, control_id):
    """Liefert die sortierte Liste der Metrik-IDs, die das Decision-Engine-
    Matching für dieses Control bestimmt (identische Logik wie die
    Metric-View: MatchingRules.metric_belongs_to_control)."""
    rows = conn.execute("select metric_id from metric_profile").fetchall()
    control_ref = _ControlRef(control_id)

    metric_ids = []
    for row in rows:
        metric_id = row[0]
        if MatchingRules.metric_belongs_to_control(control_ref, _MetricRef(metric_id)):
            metric_ids.append(metric_id)

    return sorted(metric_ids)


def get_metric_counts(conn):
    """Liefert {control_id: erwartete Metrikanzahl} für alle Controls,
    mit identischer Matching-Logik wie die Metric-View."""
    control_ids = [row[0] for row in conn.execute(
        "select control_id from control_profil order by control_id"
    ).fetchall()]

    metric_ids = [row[0] for row in conn.execute(
        "select metric_id from metric_profile"
    ).fetchall()]

    counts = {}
    for control_id in control_ids:
        control_ref = _ControlRef(control_id)
        counts[control_id] = sum(
            1
            for metric_id in metric_ids
            if MatchingRules.metric_belongs_to_control(control_ref, _MetricRef(metric_id))
        )

    return counts
