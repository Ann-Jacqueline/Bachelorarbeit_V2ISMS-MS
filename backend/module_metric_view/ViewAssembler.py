from module_metric_view.UI_data_transfer_objects import TreeNodeDTO


class ViewAssembler:
    def __init__(self):
        pass

    def _build_evidenz_nodes(self, evidenzen):
        evidenz_nodes = []

        for evidenz in evidenzen:
            evidenz_nodes.append(
                TreeNodeDTO(
                    node_id=f"evidenz_{evidenz['evidenz_id']}",
                    name=f"Evidenz {evidenz['evidenz_id']}",
                    node_type="evidenz",
                    expanded=False,
                    data=evidenz
                )
            )

        return evidenz_nodes

    def _build_metric_node(self, metric):
        score_node = TreeNodeDTO(
            node_id=f"{metric['metric_id']}_score",
            name="Score",
            node_type="score",
            expanded=False,
            data={
                "total_score": metric["total_score"],
                "ordinal": metric["ordinal"],
                "continuous": metric["continuous"],
                "boolean": metric["boolean"]
            }
        )

        details_node = TreeNodeDTO(
            node_id=f"{metric['metric_id']}_details",
            name="Metrikdetails",
            node_type="metric_details",
            expanded=False,
            data=metric["metric_details"]
        )

        evidenzen_node = TreeNodeDTO(
            node_id=f"{metric['metric_id']}_evidenzen",
            name="Evidenzen",
            node_type="evidenzen",
            expanded=False,
            data={"count": len(metric["evidenzen"])},
            children=self._build_evidenz_nodes(metric["evidenzen"])
        )

        return TreeNodeDTO(
            node_id=metric["metric_id"],
            name=metric["metric_details"]["metriken_name"] if metric["metric_details"] is not None else metric["metric_id"],
            node_type="metric",
            expanded=False,
            data={
                "metric_id": metric["metric_id"],
                "metric_typ": metric["metric_typ"],
                "total_score": metric["total_score"]
            },
            children=[score_node, details_node, evidenzen_node]
        )

    def assemble_metric_tree(self, decision_result):
        if decision_result is None:
            return None

        control_id = decision_result["control_id"]
        control_raw = decision_result["control_raw"] if decision_result["control_raw"] is not None else {
            "control_id": control_id
        }

        verification_nodes = []
        for metric in decision_result["verification_results"]:
            verification_nodes.append(self._build_metric_node(metric))

        validation_nodes = []
        for metric in decision_result["validation_results"]:
            validation_nodes.append(self._build_metric_node(metric))

        verification_group = TreeNodeDTO(
            node_id=f"{control_id}_verification",
            name="Verifikationsmetriken",
            node_type="metric_group",
            expanded=True,
            data={"count": len(verification_nodes)},
            children=verification_nodes
        )

        validation_group = TreeNodeDTO(
            node_id=f"{control_id}_validation",
            name="Validierungsmetriken",
            node_type="metric_group",
            expanded=True,
            data={"count": len(validation_nodes)},
            children=validation_nodes
        )

        root_node = TreeNodeDTO(
            node_id=f"control_{control_id}",
            name=control_raw.get("name", control_id),
            node_type="control",
            expanded=True,
            data=control_raw,
            children=[verification_group, validation_group]
        )

        return root_node.to_dict()