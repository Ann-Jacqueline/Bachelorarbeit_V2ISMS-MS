from collections import defaultdict


def build_domain_summary(ratings):
    grouped = defaultdict(list)

    for row in ratings:
        if row["mil_level"] is not None:
            grouped[row["domain"]].append(row["mil_level"])

    result = []
    for domain, mil_values in grouped.items():
        achieved_points = sum(mil_values)
        max_points = len(mil_values) * 3
        score = achieved_points / max_points if max_points > 0 else None

        result.append({
            "domain": domain,
            "rated_controls": len(mil_values),
            "achieved_points": achieved_points,
            "max_points": max_points,
            "score": score,
            "percentage": round(score * 100, 1) if score is not None else None
        })

    return sorted(result, key=lambda x: x["domain"])


def build_overall_summary(ratings):
    mil_values = [row["mil_level"] for row in ratings if row["mil_level"] is not None]

    if not mil_values:
        return {
            "rated_controls": 0,
            "achieved_points": 0,
            "max_points": 0,
            "score": None,
            "percentage": None
        }

    achieved_points = sum(mil_values)
    max_points = len(mil_values) * 3
    score = achieved_points / max_points

    return {
        "rated_controls": len(mil_values),
        "achieved_points": achieved_points,
        "max_points": max_points,
        "score": score,
        "percentage": round(score * 100, 1)
    }