MIL_LABELS = {
    0: "Not Implemented",
    1: "Partially Implemented",
    2: "Largely Implemented",
    3: "Fully Implemented"
}


def validate_mil_level(mil_level):
    if isinstance(mil_level, bool) or not isinstance(mil_level, (int, float)):
        raise ValueError("Ungültiger MIL-Level. Erlaubt sind nur 0, 1, 2 oder 3.")

    value = float(mil_level)

    if value not in MIL_LABELS:
        raise ValueError("Ungültiger MIL-Level. Erlaubt sind nur 0, 1, 2 oder 3.")


def get_mil_label(mil_level):
    if mil_level is None:
        return None

    try:
        value = float(mil_level)
    except (TypeError, ValueError):
        return None

    if value not in MIL_LABELS:
        return None

    return MIL_LABELS[int(value)]


def get_mil_value_display(mil_level):
    """Anzeigewert mit einer Nachkommastelle (ohne Staffelungs-Aufrundung)."""
    if mil_level is None:
        return None
    return round(float(mil_level), 1)


def get_mil_display(mil_level):
    """Anzeigestring für das Reporting.

    Ganzzahlige Werte:  "MIL 2.0 – Largely Implemented"
    Fraktionale Werte:  "MIL 1.7 – Partially Implemented ↔ Largely Implemented"
    Es wird nie auf das nächsthöhere Band aufgerundet.
    """
    if mil_level is None:
        return None

    value = round(float(mil_level), 1)

    if value in MIL_LABELS:
        return f"MIL {value:.1f} – {MIL_LABELS[int(value)]}"

    floor_band = int(value)
    ceil_band = floor_band + 1
    floor_label = MIL_LABELS.get(floor_band, "")
    ceil_label = MIL_LABELS.get(ceil_band, "")
    return f"MIL {value:.1f} – {floor_label} ↔ {ceil_label}"


def get_mil_display_info(mil_level):
    """Strukturierte Anzeigeinformationen für API/Payloads."""
    if mil_level is None:
        return {
            "mil_level": None,
            "mil_value_display": None,
            "mil_display": None,
            "mil_label": None,
            "mil_labels": [],
            "mil_band": None
        }

    raw_value = float(mil_level)
    value = round(raw_value, 1)

    if value in MIL_LABELS:
        labels = [MIL_LABELS[int(value)]]
        band = None
        label = MIL_LABELS[int(value)]
    else:
        floor_band = int(value)
        labels = [
            MIL_LABELS[floor_band],
            MIL_LABELS[floor_band + 1]
        ]
        band = {"floor": floor_band, "ceiling": floor_band + 1}
        label = MIL_LABELS[floor_band]

    return {
        "mil_level": raw_value,
        "mil_value_display": value,
        "mil_display": get_mil_display(raw_value),
        "mil_label": label,
        "mil_labels": labels,
        "mil_band": band
    }
