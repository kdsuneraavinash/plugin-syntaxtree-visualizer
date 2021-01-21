export interface TreeGraph {
    id: string;
    layoutOptions: {};
    children: GraphNode[];
    edges: TreeEdge[];
    width: number;
    height: number;
}

export interface GraphNode {
    id: string;
    x: number;
    y: number;
    label: string;
    nodeColor: string;
    ifParent: boolean;
    isCollapsible: boolean;
    kind: string;
    leadingMinutiae: Minutiae[];
    trailingMinutiae: Minutiae[];
    hasDiagnostics: boolean;
    diagnostics: Diagnostics[];
    width: number;
    height: number;
}

export interface Minutiae {
    kind: string;
    minutiae: string;
}

export interface TreeEdge {
    id: string;
    sources: [];
    targets: [];
    sections: EdgeSections[];
}

export interface EdgeSections {
    id: string;
    startPoint: EdgeCoords;
    endPoint: EdgeCoords;
}

export interface EdgeCoords {
    x: number;
    y: number;
}

export interface PrimaryProps {
    onCollapseTree: (nodeID: string) => void;
    renderTree: () => Promise<TreeProps>;
}

export interface TreeProps {
    treeGraph: TreeGraph;
    treeArray: TreeArrayNode[];
}

export interface TreeNodeProps {
    node: GraphNode;
    onCollapseTree: any;
}

export interface TreeNodeDetailsProps {
    node: GraphNode;
}

export interface TreeEdgeProps {
    edge: TreeEdge;
}

export interface Diagnostics {
    message: string;
    diagnosticInfo: any[];
}

export interface GraphicalTreeProps {
    onCollapseTree: (nodeID: string) => void;
    treeGraph?: TreeGraph;
}

export interface DropdownTreeProps {
    treeNode: TreeArrayNode;
}

export interface DropdownNodeProps {
    treeNode: TreeArrayNode;
    onClick: (nodeProp: TreeArrayNode) => void;
}

export interface TreeArrayNode {
    nodeID: string;
    value: string;
    kind: string;
    parentID: string;
    didCollapse: boolean;
    ifParent: boolean;
    children: TreeArrayNode[];
    leadingMinutiae: any[];
    trailingMinutiae: any[];
    errorNode?: any;
    diagnostics: any[];
}

export interface DetailsCardProp {
    title: string;
    value: any;
}

export interface DetailsArrayCardProp {
    title: string;
    type: string;
    value: any[];
}
