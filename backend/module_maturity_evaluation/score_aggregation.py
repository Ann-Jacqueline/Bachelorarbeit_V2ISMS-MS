from collections import defaultdict
import json

from module_maturity_evaluation.MIL_mapping import get_mil_display, get_mil_display_info
from module_maturity_evaluation.rating_state import resolve_rating_status, resolve_zero_reason


def _clean_note(note):
    if note is None:
        return None
    text = str(note).strip()
    return text if text else None


def _parse_metric_notes(raw_value):
    if not raw_value:
        return []
    try:
        entries = json.loads(raw_value)
    except (TypeError, ValueError):
        return []
    if not isinstance(entries, list):
        return []
    result = []
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        note = _clean_note(entry.get("note"))
        if note is None:
            continue
        result.append({
            "metric_id": entry.get("metric_id"),
            "metric_name": entry.get("metric_name"),
            "note": note
        })
    return sorted(result, key=lambda item: str(item["metric_id"] or ""))


def _parse_metric_refs(raw_value):
    """Liste nicht bewerteter Metriken [{metric_id, metric_name}] aus JSON."""
    if not raw_value:
        return []
    try:
        entries = json.loads(raw_value)
    except (TypeError, ValueError):
        return []
    if not isinstance(entries, list):
        return []
    result = []
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        metric_id = entry.get("metric_id")
        if not metric_id:
            continue
        result.append({
            "metric_id": metric_id,
            "metric_name": entry.get("metric_name")
        })
    return result


def _build_control_entry(control, rating_row):
    display = get_mil_display_info(
        rating_row["mil_level"] if rating_row is not None else None
    )
    note = _clean_note(rating_row["note"]) if rating_row is not None else None
    status = resolve_rating_status(rating_row)
    zero_reason = resolve_zero_reason(rating_row)

    answer_count = None
    expected_answer_count = None
    metric_notes = []
    missing_metrics = []
    if rating_row is not None:
        if "answer_count" in rating_row.keys():
            answer_count = rating_row["answer_count"]
            expected_answer_count = rating_row["expected_answer_count"]
        if "metric_notes" in rating_row.keys():
            metric_notes = _parse_metric_notes(rating_row["metric_notes"])
        if "missing_metrics" in rating_row.keys():
            missing_metrics = _parse_metric_refs(rating_row["missing_metrics"])

    return {
        "control_id": control["control_id"],
        "control_name": control["name"],
        "domain": control["domain"] or "Unbekannt",
        "mil_level": display["mil_level"],
        "mil_value_display": display["mil_value_display"],
        "mil_display": display["mil_display"],
        "mil_label": display["mil_label"],
        "mil_labels": display["mil_labels"],
        "mil_band": display["mil_band"],
        "status": status,
        "zero_reason": zero_reason,
        "note": note,
        "has_note": note is not None,
        "metric_notes": metric_notes,
        "missing_metrics": missing_metrics,
        "answer_count": answer_count,
        "expected_answer_count": expected_answer_count
    }


def _summarize_entries(entries):
    rated_entries = [entry for entry in entries if entry["mil_level"] is not None]
    mil_values = [float(entry["mil_level"]) for entry in rated_entries]

    total_controls = len(entries)
    rated_controls = len(rated_entries)
    unrated_controls = total_controls - rated_controls
    complete_controls = sum(1 for entry in rated_entries if entry["status"] == "complete")
    incomplete_controls = rated_controls - complete_controls

    achieved_points = round(sum(mil_values), 2)
    max_points = total_controls * 3
    avg_mil_level = round(achieved_points / rated_controls, 2) if rated_controls > 0 else None

    # Reifegrad: scope-basiert – nicht bewertete Controls zählen mit 0 Punkten.
    percentage = round((achieved_points / max_points) * 100, 1) if max_points > 0 else None
    # Nur bewertete Controls (Referenzwert für die Methodik).
    rated_max_points = rated_controls * 3
    rated_percentage = (
        round((achieved_points / rated_max_points) * 100, 1) if rated_max_points > 0 else None
    )
    coverage_percentage = (
        round((rated_controls / total_controls) * 100, 1) if total_controls > 0 else None
    )

    zero_not_implemented = sum(
        1 for entry in entries if entry["zero_reason"] == "not_implemented"
    )
    zero_not_rated = sum(
        1 for entry in entries if entry["zero_reason"] == "not_rated"
    )
    unanswered_questions = sum(
        len(entry.get("missing_metrics") or []) for entry in entries
    )

    return {
        "total_controls": total_controls,
        "rated_controls": rated_controls,
        "unrated_controls": unrated_controls,
        "complete_controls": complete_controls,
        "incomplete_controls": incomplete_controls,
        "avg_mil_level": avg_mil_level,
        "achieved_points": achieved_points,
        "max_points": max_points,
        "percentage": percentage,
        "rated_percentage": rated_percentage,
        "unanswered_questions": unanswered_questions,
        "coverage": {
            "total_controls": total_controls,
            "rated_controls": rated_controls,
            "complete_controls": complete_controls,
            "incomplete_controls": incomplete_controls,
            "unrated_controls": unrated_controls,
            "coverage_percentage": coverage_percentage,
            "zero_not_implemented": zero_not_implemented,
            "zero_not_rated": zero_not_rated,
            "unanswered_questions": unanswered_questions
        }
    }


def _catalog_groups(control_catalog, ratings):
    ratings_by_id = {row["control_id"]: row for row in ratings}

    controls_by_id = {}
    grouped = defaultdict(list)

    for control in control_catalog:
        controls_by_id[control["control_id"]] = control
        grouped[control["domain"] or "Unbekannt"].append(control)

    # Defensive: Ratings ohne Katalogeintrag trotzdem einblenden.
    for row in ratings:
        if row["control_id"] in controls_by_id:
            continue
        control = {
            "control_id": row["control_id"],
            "name": row["control_id"],
            "domain": row["domain"] or "Unbekannt"
        }
        controls_by_id[control["control_id"]] = control
        grouped[control["domain"]].append(control)

    return controls_by_id, grouped, ratings_by_id


def build_domain_summary(ratings, control_catalog=None):
    if control_catalog is None:
        control_catalog = [
            {
                "control_id": row["control_id"],
                "name": row["control_id"],
                "domain": row["domain"]
            }
            for row in ratings
        ]

    controls_by_id, grouped, ratings_by_id = _catalog_groups(control_catalog, ratings)

    result = []

    for domain, controls in grouped.items():
        entries = [
            _build_control_entry(control, ratings_by_id.get(control["control_id"]))
            for control in sorted(controls, key=lambda item: item["control_id"])
        ]

        summary = _summarize_entries(entries)
        summary["domain"] = domain
        summary["controls"] = entries
        result.append(summary)

    return sorted(result, key=lambda item: item["domain"])


def build_overall_summary(ratings, total_controls=None, control_catalog=None):
    if control_catalog is None and total_controls is None:
        control_catalog = [
            {
                "control_id": row["control_id"],
                "name": row["control_id"],
                "domain": row["domain"]
            }
            for row in ratings
        ]

    if control_catalog is not None:
        ratings_by_id = {row["control_id"]: row for row in ratings}
        entries = [
            _build_control_entry(control, ratings_by_id.get(control["control_id"]))
            for control in sorted(
                control_catalog, key=lambda item: item["control_id"]
            )
        ]
        summary = _summarize_entries(entries)
    else:
        entries = [
            _build_control_entry(
                {
                    "control_id": row["control_id"],
                    "name": row["control_id"],
                    "domain": row["domain"]
                },
                row
            )
            for row in ratings
        ]
        rated_entries = [entry for entry in entries if entry["mil_level"] is not None]
        rated_controls = len(rated_entries)
        summary = _summarize_entries(entries)

        # Legacy-Pfad: Scope kommt aus total_controls (Kataloggröße).
        scope_total = max(total_controls or 0, rated_controls)
        unrated = scope_total - rated_controls
        summary["total_controls"] = scope_total
        summary["unrated_controls"] = unrated
        summary["max_points"] = scope_total * 3
        summary["percentage"] = (
            round((summary["achieved_points"] / summary["max_points"]) * 100, 1)
            if summary["max_points"] > 0
            else None
        )
        summary["coverage"]["total_controls"] = scope_total
        summary["coverage"]["unrated_controls"] = unrated
        rated_not_rated = sum(
            1 for entry in entries if entry["zero_reason"] == "not_rated"
        )
        summary["coverage"]["zero_not_rated"] = rated_not_rated + unrated
        summary["coverage"]["coverage_percentage"] = (
            round((rated_controls / scope_total) * 100, 1) if scope_total > 0 else None
        )

    return summary


def format_mil_display(mil_level):
    """Kompatibilitätshilfe für alte Aufrufer."""
    return get_mil_display(mil_level)
