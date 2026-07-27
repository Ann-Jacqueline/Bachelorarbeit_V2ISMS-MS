export interface ControlListItem {
  control_id: string;
  name: string;
}

export interface MetricTreeNode {
  id: string;
  name: string;
  node_type: string;
  expanded: boolean;
  data: Record<string, any>;
  children: MetricTreeNode[];
}

export interface ControlsResponse {
  data: ControlListItem[];
  message: string | null;
  status: string;
}

export interface MetricViewResponse {
  control_id: string;
  data: MetricTreeNode;
  message: string | null;
  status: string;
  view_type: string;
}
