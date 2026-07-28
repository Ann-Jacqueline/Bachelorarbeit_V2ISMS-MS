MIL_LABELS = {
    0: "Not Implemented",
    1: "Partially Implemented",
    2: "Largely Implemented",
    3: "Fully Implemented"
}


def validate_mil_level(mil_level):
    if mil_level not in MIL_LABELS:
        raise ValueError("Ungültiger MIL-Level. Erlaubt sind nur 0, 1, 2 oder 3.")


def get_mil_label(mil_level):
    return MIL_LABELS.get(mil_level)