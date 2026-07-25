class ControlProfile:
    def __init__(
        self,
        control_id,
        name=None,
        domain=None,
        kritikalitaet=None,
        pruefbarkeit=None,
        aenderungsfrequenz=None,
        org_anteil=None,
        tech_anteil=None,
        requires_logs=0,
        requires_konfig=0,
        requires_policy_dokumente=0,
        requires_interviews=0,
        requires_beobachtung=0
    ):
        self.control_id = control_id
        self.name = name
        self.domain = domain
        self.kritikalitaet = kritikalitaet
        self.pruefbarkeit = pruefbarkeit
        self.aenderungsfrequenz = aenderungsfrequenz
        self.org_anteil = org_anteil
        self.tech_anteil = tech_anteil
        self.requires_logs = int(requires_logs)
        self.requires_konfig = int(requires_konfig)
        self.requires_policy_dokumente = int(requires_policy_dokumente)
        self.requires_interviews = int(requires_interviews)
        self.requires_beobachtung = int(requires_beobachtung)

    @classmethod
    def from_db_row(cls, row):
        row = dict(row)
        return cls(
            control_id=row.get("control_id"),
            name=row.get("name"),
            domain=row.get("domain"),
            kritikalitaet=row.get("kritikalitaet"),
            pruefbarkeit=row.get("pruefbarkeit"),
            aenderungsfrequenz=row.get("aenderungsfrequenz"),
            org_anteil=row.get("org_anteil"),
            tech_anteil=row.get("tech_anteil"),
            requires_logs=row.get("requires_logs", 0),
            requires_konfig=row.get("requires_konfig", 0),
            requires_policy_dokumente=row.get("requires_policy_dokumente", 0),
            requires_interviews=row.get("requires_interviews", 0),
            requires_beobachtung=row.get("requires_beobachtung", 0),
        )

    def to_dict(self):
        return {
            "control_id": self.control_id,
            "name": self.name,
            "domain": self.domain,
            "kritikalitaet": self.kritikalitaet,
            "pruefbarkeit": self.pruefbarkeit,
            "aenderungsfrequenz": self.aenderungsfrequenz,
            "org_anteil": self.org_anteil,
            "tech_anteil": self.tech_anteil,
            "requires_logs": self.requires_logs,
            "requires_konfig": self.requires_konfig,
            "requires_policy_dokumente": self.requires_policy_dokumente,
            "requires_interviews": self.requires_interviews,
            "requires_beobachtung": self.requires_beobachtung,
        }

    def get_ordinal_fields(self):
        return {
            "kritikalitaet": self.kritikalitaet,
            "pruefbarkeit": self.pruefbarkeit,
            "aenderungsfrequenz": self.aenderungsfrequenz,
        }

    def get_continuous_fields(self):
        return {
            "org_anteil": self.org_anteil,
            "tech_anteil": self.tech_anteil,
        }

    def get_evidence_fields(self):
        return {
            "requires_logs": self.requires_logs,
            "requires_konfig": self.requires_konfig,
            "requires_policy_dokumente": self.requires_policy_dokumente,
            "requires_interviews": self.requires_interviews,
            "requires_beobachtung": self.requires_beobachtung,
        }