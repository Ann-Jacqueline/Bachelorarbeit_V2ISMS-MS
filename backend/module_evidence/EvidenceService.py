from module_evidence.evidenzen import Evidenz


class EvidenceService:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def get_all_evidenzen(self):
        query = """
            SELECT
                e.evidenz_id,
                e.metric_id,
                e.control_id,
                e.evidenzart_code,
                e.beschreibung,
                e.beispiel_asset
            FROM evidenzen e
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        return [Evidenz.from_db_row(row) for row in rows]

    def get_evidenz_by_id(self, evidenz_id):
        for evidenz in self.get_all_evidenzen():
            if evidenz.evidenz_id == evidenz_id:
                return evidenz
        return None

    def get_evidenzen_by_metric_id(self, metric_id):
        evidenzen = []

        for evidenz in self.get_all_evidenzen():
            if evidenz.metric_id == metric_id:
                evidenzen.append(evidenz)

        return evidenzen