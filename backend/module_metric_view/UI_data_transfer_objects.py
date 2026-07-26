class TreeNodeDTO:
    def __init__(self, node_id, name, node_type, expanded=False, data=None, children=None):
        self.id = node_id
        self.name = name
        self.node_type = node_type
        self.expanded = expanded
        self.data = data if data is not None else {}
        self.children = children if children is not None else []

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "node_type": self.node_type,
            "expanded": self.expanded,
            "data": self.data,
            "children": [child.to_dict() for child in self.children]
        }