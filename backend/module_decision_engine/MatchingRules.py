ORDINAL_MAP = {
    "niedrig": 1,
    "mittel": 2,
    "hoch": 3,
}

PRUEFBARKEIT_MAP = {
    "manuell": 1,
    "teilweise_automatisiert": 2,
    "automatisierbar": 3,
}

AENDERUNGSFREQUENZ_MAP = {
    "stabil": 1,
    "periodisch": 2,
    "ereignisgesteuert": 3,
}

def map_ordinal_value(value, mapping):
    if value is None:
        return None
    return mapping.get(value)

def score_ordinal_match(control_value, metric_value, mapping):
    control_num = map_ordinal_value(control_value, mapping)
    metric_num = map_ordinal_value(metric_value, mapping)

    if control_num is None or metric_num is None:
        return 0.0

    diff = abs(control_num - metric_num)

    if diff == 0:
        return 1.0
    elif diff == 1:
        return 0.5
    else:
        return 0.0

def score_ordinal_fields(control_profile, metric_profile):
    krit_score = score_ordinal_match(
        control_profile.kritikalitaet,
        metric_profile.kritikalitaet,
        ORDINAL_MAP
    )

    pruef_score = score_ordinal_match(
        control_profile.pruefbarkeit,
        metric_profile.pruefbarkeit,
        PRUEFBARKEIT_MAP
    )

    freq_score = score_ordinal_match(
        control_profile.aenderungsfrequenz,
        metric_profile.aenderungsfrequenz,
        AENDERUNGSFREQUENZ_MAP
    )

    total = (krit_score + pruef_score + freq_score) / 3

    return {
        "kritikalitaet_score": krit_score,
        "pruefbarkeit_score": pruef_score,
        "aenderungsfrequenz_score": freq_score,
        "ordinal_total_score": total
    }

def score_continuous_match(control_value, metric_value):
    if control_value is None or metric_value is None:
        return 0.0

    control_value = float(control_value)
    metric_value = float(metric_value)

    diff = abs(control_value - metric_value)
    score = 1 - (diff / 100)

    return max(0.0, score)

def score_continuous_fields(control_profile, metric_profile):
    org_score = score_continuous_match(
        control_profile.org_anteil,
        metric_profile.org_anteil
    )

    tech_score = score_continuous_match(
        control_profile.tech_anteil,
        metric_profile.tech_anteil
    )

    total = (org_score + tech_score) / 2

    return {
        "org_anteil_score": org_score,
        "tech_anteil_score": tech_score,
        "continuous_total_score": total
    }

def score_boolean_match(control_value, metric_value):
    if control_value is None or metric_value is None:
        return 0.0

    control_value = int(control_value)
    metric_value = int(metric_value)

    if control_value == metric_value:
        return 1.0
    return 0.0


def score_boolean_fields(control_profile, metric_profile):
    logs_score = score_boolean_match(
        control_profile.requires_logs,
        metric_profile.utilizes_logs
    )

    konfig_score = score_boolean_match(
        control_profile.requires_konfig,
        metric_profile.utilizes_konfig
    )

    policy_score = score_boolean_match(
        control_profile.requires_policy_dokumente,
        metric_profile.utilizes_policy_dokumente
    )

    interviews_score = score_boolean_match(
        control_profile.requires_interviews,
        metric_profile.utilizes_interviews
    )

    beobachtung_score = score_boolean_match(
        control_profile.requires_beobachtung,
        metric_profile.utilizes_beobachtung
    )

    total = (
        logs_score
        + konfig_score
        + policy_score
        + interviews_score
        + beobachtung_score
    ) / 5

    return {
        "requires_logs_score": logs_score,
        "requires_konfig_score": konfig_score,
        "requires_policy_dokumente_score": policy_score,
        "requires_interviews_score": interviews_score,
        "requires_beobachtung_score": beobachtung_score,
        "boolean_total_score": total
    }

def score_metric_for_control(control_profile, metric_profile):
    ordinal_result = score_ordinal_fields(control_profile, metric_profile)
    continuous_result = score_continuous_fields(control_profile, metric_profile)
    boolean_result = score_boolean_fields(control_profile, metric_profile)

    total_score = (
        ordinal_result["ordinal_total_score"]
        + continuous_result["continuous_total_score"]
        + boolean_result["boolean_total_score"]
    ) / 3

    return {
        "control_id": control_profile.control_id,
        "metric_id": metric_profile.metric_id,
        "metric_typ": metric_profile.metric_typ,
        "ordinal": ordinal_result,
        "continuous": continuous_result,
        "boolean": boolean_result,
        "total_score": total_score
    }

def metric_belongs_to_control(control_profile, metric_profile):
    control_token = control_profile.control_id.replace(".", "_")
    return f"_{control_token}_" in metric_profile.metric_id

def rank_metrics_for_control(control_profile, metric_profiles):
    results = []

    for metric_profile in metric_profiles:
        if not metric_belongs_to_control(control_profile, metric_profile):
            continue

        result = score_metric_for_control(control_profile, metric_profile)
        results.append(result)

    results.sort(key=lambda x: x["total_score"], reverse=True)
    return results

def split_ranked_metrics_by_type(ranked_results):
    verification_results = []
    validation_results = []

    for result in ranked_results:
        if result["metric_typ"] == "verification":
            verification_results.append(result)
        elif result["metric_typ"] == "validation":
            validation_results.append(result)

    return {
        "verification_results": verification_results,
        "validation_results": validation_results
    }

def get_ranked_metrics_for_control(control_profile, metric_profiles):
    ranked_results = rank_metrics_for_control(control_profile, metric_profiles)
    split_results = split_ranked_metrics_by_type(ranked_results)

    return {
        "control_id": control_profile.control_id,
        "verification_results": split_results["verification_results"],
        "validation_results": split_results["validation_results"]
    }

def split_ranked_metrics_by_type(ranked_results):
    verification_results = []
    validation_results = []

    for result in ranked_results:
        if result["metric_typ"] == "verification":
            verification_results.append(result)
        elif result["metric_typ"] == "validation":
            validation_results.append(result)

    return {
        "verification_results": verification_results,
        "validation_results": validation_results
    }

def get_ranked_metrics_for_control(control_profile, metric_profiles):
    ranked_results = rank_metrics_for_control(control_profile, metric_profiles)
    split_results = split_ranked_metrics_by_type(ranked_results)

    return {
        "control_id": control_profile.control_id,
        "verification_results": split_results["verification_results"],
        "validation_results": split_results["validation_results"]
    }