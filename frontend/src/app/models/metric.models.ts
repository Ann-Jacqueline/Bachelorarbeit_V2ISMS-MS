export interface MetricTreeNode {
  label: string;
  type: string;
  children?: MetricTreeNode[];
  data?: Record<string, any>;
}

export interface MetricTreeResponse {
  status: string;
  control_id: string;
  view_type: string;
  message: string | null;
  data: MetricTreeNode | null;
}

export interface ControlListItem {
  control_id: string;
  name: string;
}

export interface ControlsResponse {
  status: string;
  message: string | null;
  data: ControlListItem[];
}
