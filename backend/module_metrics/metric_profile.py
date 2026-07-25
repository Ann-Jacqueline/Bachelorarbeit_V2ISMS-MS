class MetricProfile:
    def __init__(
        self,
        metric_id,
        metric_typ,
        name=None,
        beschreibung=None,
        domain=None,
        kritikalitaet=None,
        pruefbarkeit=None,
        aenderungsfrequenz=None,
        org_anteil=None,
        tech_anteil=None,
        utilizes_logs=0,
        utilizes_konfig=0,
        utilizes_policy_dokumente=0,
        utilizes_interviews=0,
        utilizes_beobachtung=0
    ):
        self.metric_id = metric_id
        self.metric_typ = metric_typ
        self.name = name
        self.beschreibung = beschreibung
        self.domain = domain
        self.kritikalitaet = kritikalitaet
        self.pruefbarkeit = pruefbarkeit
        self.aenderungsfrequenz = aenderungsfrequenz
        self.org_anteil = org_anteil
        self.tech_anteil = tech_anteil
        self.utilizes_logs = int(utilizes_logs)
        self.utilizes_konfig = int(utilizes_konfig)
        self.utilizes_policy_dokumente = int(utilizes_policy_dokumente)
        self.utilizes_interviews = int(utilizes_interviews)
        self.utilizes_beobachtung = int(utilizes_beobachtung)

    @classmethod
    def from_db_row(cls, row):
        return cls(
            metric_id=row["metric_id"],
            metric_typ=row["metric_typ"],
            name=row.get("name"),
            beschreibung=row.get("beschreibung"),
            domain=row.get("domain"),
            kritikalitaet=row.get("kritikalitaet"),
            pruefbarkeit=row.get("pruefbarkeit"),
            aenderungsfrequenz=row.get("aenderungsfrequenz"),
            org_anteil=row.get("org_anteil"),
            tech_anteil=row.get("tech_anteil"),
            utilizes_logs=row.get("utilizes_logs", 0),
            utilizes_konfig=row.get("utilizes_konfig", 0),
            utilizes_policy_dokumente=row.get("utilizes_policy_dokumente", 0),
            utilizes_interviews=row.get("utilizes_interviews", 0),
            utilizes_beobachtung=row.get("utilizes_beobachtung", 0),
        )

    def to_dict(self):
        return {
            "metric_id": self.metric_id,
            "metric_typ": self.metric_typ,
            "name": self.name,
            "beschreibung": self.beschreibung,
            "domain": self.domain,
            "kritikalitaet": self.kritikalitaet,
            "pruefbarkeit": self.pruefbarkeit,
            "aenderungsfrequenz": self.aenderungsfrequenz,
            "org_anteil": self.org_anteil,
            "tech_anteil": self.tech_anteil,
            "utilizes_logs": self.utilizes_logs,
            "utilizes_konfig": self.utilizes_konfig,
            "utilizes_policy_dokumente": self.utilizes_policy_dokumente,
            "utilizes_interviews": self.utilizes_interviews,
            "utilizes_beobachtung": self.utilizes_beobachtung,
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
            "utilizes_logs": self.utilizes_logs,
            "utilizes_konfig": self.utilizes_konfig,
            "utilizes_policy_dokumente": self.utilizes_policy_dokumente,
            "utilizes_interviews": self.utilizes_interviews,
            "utilizes_beobachtung": self.utilizes_beobachtung,
        }

    def is_verification(self):
        return self.metric_typ == "verification"

    def is_validation(self):
        return self.metric_typ == "validation"