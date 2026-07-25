from module_metrics.metric_profile import MetricProfile
from module_metrics.validierungsmetriken import Validierungsmetrik
from module_metrics.verifikationsmetriken import Verifikationsmetrik


class MetricService:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def get_verification_metric_profiles(self):
        query = """
            SELECT
                mp.metric_id,
                mp.metric_typ,
                vm.metriken_name AS name,
                vm.beschreibung,
                mp.domain,
                mp.kritikalitaet,
                mp.pruefbarkeit,
                mp.aenderungsfrequenz,
                mp.org_anteil,
                mp.tech_anteil,
                mp.utilizes_logs,
                mp.utilizes_konfig,
                mp.utilizes_policy_dokumente,
                mp.utilizes_interviews,
                mp.utilizes_beobachtung
            FROM metric_profile mp
            INNER JOIN verifikationsmetriken vm
                ON mp.metric_id = vm.metric_id
            WHERE mp.metric_typ = 'verification'
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        return [MetricProfile.from_db_row(row) for row in rows]

    def get_validation_metric_profiles(self):
        query = """
            SELECT
                mp.metric_id,
                mp.metric_typ,
                valm.metriken_name AS name,
                valm.beschreibung,
                mp.domain,
                mp.kritikalitaet,
                mp.pruefbarkeit,
                mp.aenderungsfrequenz,
                mp.org_anteil,
                mp.tech_anteil,
                mp.utilizes_logs,
                mp.utilizes_konfig,
                mp.utilizes_policy_dokumente,
                mp.utilizes_interviews,
                mp.utilizes_beobachtung
            FROM metric_profile mp
            INNER JOIN validierungsmetriken valm
                ON mp.metric_id = valm.metric_id
            WHERE mp.metric_typ = 'validation'
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        return [MetricProfile.from_db_row(row) for row in rows]

    def get_verification_metric_profile_by_id(self, metric_id):
        query = """
            SELECT
                mp.metric_id,
                mp.metric_typ,
                vm.metriken_name AS name,
                vm.beschreibung,
                mp.domain,
                mp.kritikalitaet,
                mp.pruefbarkeit,
                mp.aenderungsfrequenz,
                mp.org_anteil,
                mp.tech_anteil,
                mp.utilizes_logs,
                mp.utilizes_konfig,
                mp.utilizes_policy_dokumente,
                mp.utilizes_interviews,
                mp.utilizes_beobachtung
            FROM metric_profile mp
            INNER JOIN verifikationsmetriken vm
                ON mp.metric_id = vm.metric_id
            WHERE mp.metric_id = ?
              AND mp.metric_typ = 'verification'
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query, (metric_id,))
        row = cursor.fetchone()

        if row is None:
            return None

        return MetricProfile.from_db_row(row)

    def get_validation_metric_profile_by_id(self, metric_id):
        query = """
            SELECT
                mp.metric_id,
                mp.metric_typ,
                valm.metriken_name AS name,
                valm.beschreibung,
                mp.domain,
                mp.kritikalitaet,
                mp.pruefbarkeit,
                mp.aenderungsfrequenz,
                mp.org_anteil,
                mp.tech_anteil,
                mp.utilizes_logs,
                mp.utilizes_konfig,
                mp.utilizes_policy_dokumente,
                mp.utilizes_interviews,
                mp.utilizes_beobachtung
            FROM metric_profile mp
            INNER JOIN validierungsmetriken valm
                ON mp.metric_id = valm.metric_id
            WHERE mp.metric_id = ?
              AND mp.metric_typ = 'validation'
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query, (metric_id,))
        row = cursor.fetchone()

        if row is None:
            return None

        return MetricProfile.from_db_row(row)

    def get_all_metric_profiles(self):
        return self.get_verification_metric_profiles() + self.get_validation_metric_profiles()

    def get_metric_profile_by_id(self, metric_id):
        query = """
            SELECT
                metric_id,
                metric_typ
            FROM metric_profile
            WHERE metric_id = ?
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query, (metric_id,))
        row = cursor.fetchone()

        if row is None:
            return None

        metric_typ = row["metric_typ"]

        if metric_typ == "verification":
            return self.get_verification_metric_profile_by_id(metric_id)

        if metric_typ == "validation":
            return self.get_validation_metric_profile_by_id(metric_id)

        return None

    def debug_print_metric_profiles(self):
        print("=== VERIFICATION METRIC PROFILES ===")
        verification_profiles = self.get_verification_metric_profiles()

        for profile in verification_profiles:
            print(profile.to_dict())

        print(f"Anzahl Verification Profiles: {len(verification_profiles)}")
        print()

        print("=== VALIDATION METRIC PROFILES ===")
        validation_profiles = self.get_validation_metric_profiles()

        for profile in validation_profiles:
            print(profile.to_dict())

        print(f"Anzahl Validation Profiles: {len(validation_profiles)}")

    def debug_print_metric_profile_by_id(self, metric_id):
        profile = self.get_metric_profile_by_id(metric_id)

        print(f"=== METRIC PROFILE FOR ID: {metric_id} ===")

        if profile is None:
            print("Kein MetricProfile gefunden.")
            return

        print(profile.to_dict())

    def get_all_validierungsmetriken(self):
        query = """
            SELECT
                metric_id,
                control_id,
                metriken_name,
                formel,
                beschreibung
            FROM validierungsmetriken
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        return [Validierungsmetrik.from_db_row(row) for row in rows]

    def get_validierungsmetrik_by_id(self, metric_id):
        for metriken_objekt in self.get_all_validierungsmetriken():
            if metriken_objekt.metric_id == metric_id:
                return metriken_objekt
        return None

    def get_all_verifikationsmetriken(self):
        query = """
            SELECT
                metric_id,
                control_id,
                metriken_name,
                formel,
                beschreibung
            FROM verifikationsmetriken
        """
        cursor = self.db_connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        return [Verifikationsmetrik.from_db_row(row) for row in rows]

    def get_verifikationsmetrik_by_id(self, metric_id):
        for metriken_objekt in self.get_all_verifikationsmetriken():
            if metriken_objekt.metric_id == metric_id:
                return metriken_objekt
        return None

    def get_metric_details_by_id(self, metric_id):
        metric_profile = self.get_metric_profile_by_id(metric_id)

        if metric_profile is None:
            return None

        if metric_profile.metric_typ == "verification":
            return self.get_verifikationsmetrik_by_id(metric_id)

        if metric_profile.metric_typ == "validation":
            return self.get_validierungsmetrik_by_id(metric_id)

        return None