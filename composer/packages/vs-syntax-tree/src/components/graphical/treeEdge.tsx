import React from "react";
import { treeEdgeStyles } from "../../styles/graphical-tree.styles";
import { TreeEdgeProps } from "../../tree-interfaces";

function TreeNodeEdge(props: TreeEdgeProps) {
    const edgeCoords = props.edge.sections;

    return (
        <line
            x1 = {edgeCoords[0].startPoint.x}
            y1 = {edgeCoords[0].startPoint.y}
            x2 = {edgeCoords[0].endPoint.x}
            y2 = {edgeCoords[0].endPoint.y}

            style = {treeEdgeStyles}
        />
    );
}

export default TreeNodeEdge;
