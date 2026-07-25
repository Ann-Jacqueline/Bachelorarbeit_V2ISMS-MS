class Evidenz:
    def __init__(
        self,
        evidenz_id,
        metric_id=None,
        control_id=None,
        evidenzart_code=None,
        beschreibung=None,
        beispiel_asset=None
    ):
        self.evidenz_id = evidenz_id
        self.metric_id = metric_id
        self.control_id = control_id
        self.evidenzart_code = evidenzart_code
        self.beschreibung = beschreibung
        self.beispiel_asset = beispiel_asset

    @classmethod
    def from_db_row(cls, row):
        row = dict(row)
        return cls(
            evidenz_id=row.get("evidenz_id"),
            metric_id=row.get("metric_id"),
            control_id=row.get("control_id"),
            evidenzart_code=row.get("evidenzart_code"),
            beschreibung=row.get("beschreibung"),
            beispiel_asset=row.get("beispiel_asset"),
        )

    def to_dict(self):
        return {
            "evidenz_id": self.evidenz_id,
            "metric_id": self.metric_id,
            "control_id": self.control_id,
            "evidenzart_code": self.evidenzart_code,
            "beschreibung": self.beschreibung,
            "beispiel_asset": self.beispiel_asset,
        }