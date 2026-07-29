from collections import defaultdict

from module_maturity_evaluation.MIL_mapping import get_mil_label


def build_domain_summary(ratings):
    grouped = defaultdict(list)

    for row in ratings:
        domain = row["domain"] or "Unbekannt"
        grouped[domain].append(row)

    result = []

    for domain, rows in grouped.items():
        rated_rows = [row for row in rows if row["mil_level"] is not None]
        mil_values = [float(row["mil_level"]) for row in rated_rows]

        rated_controls = len(rated_rows)
        achieved_points = round(sum(mil_values), 2)
        max_points = rated_controls * 3
        avg_mil_level = round(achieved_points / rated_controls, 2) if rated_controls > 0 else None
        percentage = round((achieved_points / max_points) * 100, 1) if max_points > 0 else None

        controls = [
            {
                "control_id": row["control_id"],
                "mil_level": row["mil_level"],
                "mil_label": get_mil_label(row["mil_level"]) if row["mil_level"] is not None else None
            }
            for row in sorted(rows, key=lambda item: item["control_id"])
        ]

        result.append({
            "domain": domain,
            "rated_controls": rated_controls,
            "avg_mil_level": avg_mil_level,
            "achieved_points": achieved_points,
            "max_points": max_points,
            "percentage": percentage,
            "controls": controls
        })

    return sorted(result, key=lambda item: item["domain"])


def build_overall_summary(ratings, total_controls):
    rated_rows = [row for row in ratings if row["mil_level"] is not None]
    mil_values = [float(row["mil_level"]) for row in rated_rows]

    rated_controls = len(rated_rows)
    unrated_controls = max(total_controls - rated_controls, 0)

    achieved_points = round(sum(mil_values), 2)
    max_points = rated_controls * 3
    avg_mil_level = round(achieved_points / rated_controls, 2) if rated_controls > 0 else None
    percentage = round((achieved_points / max_points) * 100, 1) if max_points > 0 else None

    return {
        "rated_controls": rated_controls,
        "unrated_controls": unrated_controls,
        "avg_mil_level": avg_mil_level,
        "achieved_points": achieved_points,
        "max_points": max_points,
        "percentage": percentage
    }