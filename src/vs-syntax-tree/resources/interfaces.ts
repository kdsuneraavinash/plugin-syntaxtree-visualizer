export interface TreeNode {
    nodeID: string;
    value: string;
    kind: string;
    parentID: string;
    didCollapse: boolean;
    children: TreeNode[];
    leadingMinutiae: any[];
    trailingMinutiae: any[];
    errorNode?: any;
    diagnostics: any[];
    position: Position;
}

export interface Position {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
}

export const layoutOptions = {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.edgeRouting": "POLYLINE",
    "elk.layered.crossingMinimization.semiInteractive": "true",
    "elk.layered.mergeEdges": "true",
    "elk.spacing.nodeNode": "30"
};
