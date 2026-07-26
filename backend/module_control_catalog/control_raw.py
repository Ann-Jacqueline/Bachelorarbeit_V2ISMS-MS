class ControlRaw:
    def __init__(self, control_id, name, beschreibung):
        self.control_id = control_id
        self.name = name
        self.beschreibung = beschreibung

    @classmethod
    def from_db_row(cls, row):
        return cls(
            control_id=row["control_id"],
            name=row["name"],
            beschreibung=row["beschreibung"]
        )


    def to_dict(self):
        return {
            "control_id": self.control_id,
            "name": self.name,
            "beschreibung": self.beschreibung
        }


