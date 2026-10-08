import pytest

from module_maturity_evaluation.MIL_mapping import (
    get_mil_display,
    get_mil_display_info,
    get_mil_label,
    validate_mil_level,
)


class TestGetMilDisplay:
    def test_none(self):
        assert get_mil_display(None) is None

    def test_integer_bands(self):
        assert get_mil_display(0) == "MIL 0.0 – Not Implemented"
        assert get_mil_display(1) == "MIL 1.0 – Partially Implemented"
        assert get_mil_display(2) == "MIL 2.0 – Largely Implemented"
        assert get_mil_display(3) == "MIL 3.0 – Fully Implemented"

    def test_fractional_shows_both_bands(self):
        assert get_mil_display(1.67) == (
            "MIL 1.7 – Partially Implemented ↔ Largely Implemented"
        )

    def test_one_decimal_no_rounding(self):
        assert get_mil_display(0.33) == (
            "MIL 0.3 – Not Implemented ↔ Partially Implemented"
        )

    def test_value_rounding_to_full_band(self):
        # 2.95 → 3.0 an einer Nachkommastelle → volles Band, kein Zwischenband.
        assert get_mil_display(2.95) == "MIL 3.0 – Fully Implemented"


class TestGetMilDisplayInfo:
    def test_none(self):
        info = get_mil_display_info(None)
        assert info["mil_display"] is None
        assert info["mil_labels"] == []
        assert info["mil_band"] is None

    def test_fractional_band(self):
        info = get_mil_display_info(1.67)
        assert info["mil_value_display"] == 1.7
        assert info["mil_label"] == "Partially Implemented"
        assert info["mil_labels"] == ["Partially Implemented", "Largely Implemented"]
        assert info["mil_band"] == {"floor": 1, "ceiling": 2}

    def test_integer_band(self):
        info = get_mil_display_info(2.0)
        assert info["mil_band"] is None
        assert info["mil_labels"] == ["Largely Implemented"]


class TestValidateMilLevel:
    def test_valid_integer_and_float_values(self):
        for value in (0, 1, 2, 3, 0.0, 1.0, 2.0, 3.0):
            validate_mil_level(value)

    def test_rejects_fractional(self):
        with pytest.raises(ValueError):
            validate_mil_level(1.5)

    def test_rejects_out_of_range(self):
        with pytest.raises(ValueError):
            validate_mil_level(4)
        with pytest.raises(ValueError):
            validate_mil_level(-1)

    def test_rejects_bool_and_strings(self):
        with pytest.raises(ValueError):
            validate_mil_level(True)
        with pytest.raises(ValueError):
            validate_mil_level("2")


class TestGetMilLabel:
    def test_int(self):
        assert get_mil_label(2) == "Largely Implemented"

    def test_fractional_returns_none(self):
        # Kein Auf-/Abrunden auf ein Band – nur definierte Werte.
        assert get_mil_label(1.67) is None

    def test_none(self):
        assert get_mil_label(None) is None