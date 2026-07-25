from module_control_catalog.control_profil import ControlProfile

class ControlService:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def get_all_control_profiles(self):
        query = """
            SELECT
                cp.control_id,
                cp.name,
                cp.domain,
                cp.kritikalitaet,
                cp.pruefbarkeit,
                cp.aenderungsfrequenz,
                cp.org_anteil,
                cp.tech_anteil,
                cp.requires_logs,
                cp.requires_konfig,
                cp.requires_policy_dokumente,
                cp.requires_interviews,
                cp.requires_beobachtung
            FROM control_profil cp
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        return [ControlProfile.from_db_row(row) for row in rows]

    def get_control_profile_by_id(self, control_id):
        normalized_id = control_id.removeprefix("A.")
        for profile in self.get_all_control_profiles():
            if profile.control_id == normalized_id:
                return profile
        return None