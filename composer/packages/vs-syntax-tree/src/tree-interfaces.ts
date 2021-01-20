export interface ResponseData {
    treeGraph: TreeGraph;
    nodeArray: [];
}

export interface TreeGraph {
    id: string;
    layoutOptions: {};
    children: Node[];
    edges: TreeEdge[];
    width: number;
    height: number;
}

export interface Node {
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
    startPoint: Coords;
    endPoint: Coords;
}

export interface Coords {
    x: number;
    y: number;
}

export interface SyntaxTreeProps {
    onCollapseTree: (nodeID: string) => void;
    renderTree: () => Promise<TreeProps>;
}

export interface TreeProps {
    treeGraph: TreeGraph;
    treeArray: TreeArrayNode[];
}

export interface TreeNodeProps {
    node: Node;
    onCollapseTree: any;
}

export interface TreeNodeDetailsProps {
    node: Node;
}

export interface TreeEdgeProps {
    edge: TreeEdge;
}

export interface Diagnostics {
    message: string;
    diagnosticInfo: any[];
}

export interface VisualizeTreeProps {
    onCollapseTree: (nodeID: string) => void;
    treeGraph?: TreeGraph;
}

export interface DropdownTreeProps {
    syntaxTreeArray: TreeArrayNode;
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
