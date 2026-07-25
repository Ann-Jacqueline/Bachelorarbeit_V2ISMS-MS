class Validierungsmetrik:
    def __init__(self, metric_id, control_id, metriken_name, formel, beschreibung):
        self.metric_id = metric_id
        self.control_id = control_id
        self.metriken_name = metriken_name
        self.formel = formel
        self.beschreibung = beschreibung

    @classmethod
    def from_db_row(cls, row):
        return cls(
            metric_id=row["metric_id"],
            control_id=row["control_id"],
            metriken_name=row["metriken_name"],
            formel=row["formel"],
            beschreibung=row["beschreibung"]
        )

    def to_dict(self):
        return {
            "metric_id": self.metric_id,
            "control_id": self.control_id,
            "metriken_name": self.metriken_name,
            "formel": self.formel,
            "beschreibung": self.beschreibung
        }