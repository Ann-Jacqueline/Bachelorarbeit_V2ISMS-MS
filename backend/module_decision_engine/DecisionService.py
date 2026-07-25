from module_decision_engine.MatchingRules import get_ranked_metrics_for_control

class DecisionService:
    def __init__(self, control_service, metric_service):
        self.control_service = control_service
        self.metric_service = metric_service

    def get_metric_recommendations_for_control(self, control_id):
        control_profile = self.control_service.get_control_profile_by_id(control_id)
        all_metrics = self.metric_service.get_all_metric_profiles()

        return get_ranked_metrics_for_control(control_profile, all_metrics)