import React, {useEffect, useState} from "react";

import { TreeEdgeProps } from "../../resources/tree-interfaces";
import { treeEdgeStyles } from "../../styles/graphical-tree.styles";

function TreeNodeEdge(props: TreeEdgeProps) {
    const [isLocateAction, setIsLocateAction] = useState(false);
    const [isNodePath, setIsNodePath] = useState(false);
    const edgeCoords = props.edge.sections;

    useEffect(() => {
        if (props.isLocateAction) {
            setIsLocateAction(props.isLocateAction);
        }
        if (props.isLocateAction) {
            setIsNodePath(props.edge.isNodePath);
        }
    }, [props]);

    return (
        <line
            x1 = {edgeCoords[0].startPoint.x}
            y1 = {edgeCoords[0].startPoint.y}
            x2 = {edgeCoords[0].endPoint.x}
            y2 = {edgeCoords[0].endPoint.y}

            style = {{
                ...treeEdgeStyles,
                opacity: isLocateAction ? (isNodePath ? 1 : 0.3) : 1,
                strokeWidth: isLocateAction ? (isNodePath ? 1.5 : 1) : 1
            }}
        />
    );
}

export default TreeNodeEdge;
