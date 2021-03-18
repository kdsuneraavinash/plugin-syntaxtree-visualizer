import React, {useEffect, useState} from "react";

import DropdownNode from "../components/dropdown/dropdownNode";
import DropdownNodeDetails from "../components/dropdown/dropdownNodeDetails";
import { DropdownTreeProps, TreeNodeObject } from "../resources/tree-interfaces";
import * as styles from "../styles/dropdown-tree.styles";

function DropdownTree(props: DropdownTreeProps) {
    const [detailedNode, setDetailedNode] = useState<TreeNodeObject | undefined>(undefined);

    useEffect(() => {
        setDetailedNode(props.treeNode);
    }, [props.treeNode.nodeID]);

    function updateDetailedNode(nodeProp: TreeNodeObject) {
        setDetailedNode(nodeProp);
    }

    return (
        <div style = {styles.containerStyle}>
            <div style = {{
                ...styles.sideDividersStyle,
                flexGrow: 1,
                width: "45%"
            }}>
                <DropdownNode
                    treeNode = {props.treeNode}
                    treeLevel = {0}
                    onClick = {updateDetailedNode}
                    onCollapseTree = {props.onCollapseTree}
                />
            </div>

            <div style = {{
                ...styles.sideDividersStyle,
                maxWidth: 450,
                width: "55%"
            }}>
                {detailedNode &&
                    <DropdownNodeDetails treeNode = {detailedNode} onFindNode = {props.onFindNode} />
                }
            </div>
        </div>
    );
}

export default DropdownTree;
