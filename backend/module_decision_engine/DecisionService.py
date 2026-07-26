from module_control_catalog.ControlService import ControlService
from module_metrics.MetricService import MetricService
from module_evidence.EvidenceService import EvidenceService
import module_decision_engine.MatchingRules as MatchingRules


class DecisionService:
    def __init__(self, db_connection):
        self.db_connection = db_connection
        self.control_service = ControlService(db_connection)
        self.metric_service = MetricService(db_connection)
        self.evidence_service = EvidenceService(db_connection)
        self.matching_rules = MatchingRules

    def get_ranked_metric_profiles_for_control(self, control_id):
        control_profile = self.control_service.get_control_profile_by_id(control_id)

        if control_profile is None:
            return None

        metric_profiles = self.metric_service.get_all_metric_profiles()

        ranked_results = self.matching_rules.get_ranked_metrics_for_control(
            control_profile,
            metric_profiles
        )

        return ranked_results

    def _enrich_ranked_metric_result(self, ranked_metric_result):
        metric_id = ranked_metric_result["metric_id"]

        metric_details = self.metric_service.get_metric_details_by_id(metric_id)
        evidenzen = self.evidence_service.get_evidenzen_by_metric_id(metric_id)

        enriched_result = ranked_metric_result.copy()
        enriched_result["metric_details"] = (
            metric_details.to_dict() if metric_details is not None else None
        )
        enriched_result["evidenzen"] = [evidenz.to_dict() for evidenz in evidenzen]

        return enriched_result

    def get_metric_recommendations_for_control(self, control_id):
        ranked_results = self.get_ranked_metric_profiles_for_control(control_id)

        if ranked_results is None:
            return None

        enriched_verification_results = []
        for result in ranked_results["verification_results"]:
            enriched_verification_results.append(
                self._enrich_ranked_metric_result(result)
            )

        enriched_validation_results = []
        for result in ranked_results["validation_results"]:
            enriched_validation_results.append(
                self._enrich_ranked_metric_result(result)
            )

        return {
            "control_id": ranked_results["control_id"],
            "verification_results": enriched_verification_results,
            "validation_results": enriched_validation_results
        }

    def _build_metric_tree_nodes(self, metric_results):
        metric_nodes = []

        for metric in metric_results:
            metric_nodes.append({
                "label": metric["metric_id"],
                "type": "metric",
                "children": [
                    {
                        "label": "score",
                        "type": "score",
                        "data": {
                            "total_score": metric["total_score"],
                            "ordinal": metric["ordinal"],
                            "continuous": metric["continuous"],
                            "boolean": metric["boolean"]
                        }
                    },
                    {
                        "label": "metric_details",
                        "type": "metric_details",
                        "data": metric["metric_details"]
                    },
                    {
                        "label": "evidenzen",
                        "type": "evidenzen",
                        "children": [
                            {
                                "label": evidenz["evidenz_id"],
                                "type": "evidenz",
                                "data": evidenz
                            }
                            for evidenz in metric["evidenzen"]
                        ]
                    }
                ]
            })

        return metric_nodes

    def get_metric_recommendations_tree_for_control(self, control_id):
        recommendations = self.get_metric_recommendations_for_control(control_id)

        if recommendations is None:
            return None

        control_raw = self.control_service.get_control_raw_by_id(control_id)

        if control_raw is not None:
            control_data = control_raw.to_dict()
        else:
            control_data = {
                "control_id": recommendations["control_id"]
            }

        verification_nodes = self._build_metric_tree_nodes(
            recommendations["verification_results"]
        )

        validation_nodes = self._build_metric_tree_nodes(
            recommendations["validation_results"]
        )

        return {
            "label": f"control_{recommendations['control_id']}",
            "type": "control",
            "data": control_data,
            "children": [
                {
                    "label": "verification_results",
                    "type": "metric_group",
                    "children": verification_nodes
                },
                {
                    "label": "validation_results",
                    "type": "metric_group",
                    "children": validation_nodes
                }
            ]
        }