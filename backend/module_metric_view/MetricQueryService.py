from module_decision_engine.DecisionService import DecisionService
from module_metric_view.ViewAssembler import ViewAssembler


class MetricViewQueryService:
    VIEW_TYPE = "metric_tree"

    def __init__(self, db_connection):
        self.db_connection = db_connection
        self.decision_service = DecisionService(db_connection)
        self.view_assembler = ViewAssembler()

    def get_metric_tree_response_for_control(self, control_id):
        try:
            decision_result = self.decision_service.get_metric_recommendations_for_control(control_id)

            if decision_result is None:
                return {
                    "status": "error",
                    "control_id": control_id,
                    "view_type": self.VIEW_TYPE,
                    "message": "Control nicht gefunden oder keine Metrikempfehlungen vorhanden.",
                    "data": None
                }

            tree = self.view_assembler.assemble_metric_tree(decision_result)

            return {
                "status": "success",
                "control_id": decision_result["control_id"],
                "view_type": self.VIEW_TYPE,
                "message": None,
                "data": tree
            }

        except Exception:
            return {
                "status": "error",
                "control_id": control_id,
                "view_type": self.VIEW_TYPE,
                "message": "Interner Fehler beim Laden der Metric View.",
                "data": None
            }