export interface MetricTreeNode {
  id: string;
  name: string;
  node_type: string;
  expanded: boolean;
  data: Record<string, any>;
  children: MetricTreeNode[];
}

export interface MetricTreeResponse {
  status: 'success' | 'error';
  control_id: string;
  view_type: string;
  message: string | null;
  data: MetricTreeNode | null;
}
