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
                marginRight: 30,
                paddingRight: 20
            }}>
                <DropdownNode
                    treeNode = {props.treeNode}
                    treeLevel = {0}
                    onClick = {updateDetailedNode}
                    onCollapseTree = {props.onCollapseTree}
                    onFindNode = {props.onFindNode}
                />
            </div>

            <div style = {{
                ...styles.sideDividersStyle,
                maxWidth: 450,
                minWidth: 400
            }}>
                {detailedNode &&
                    <DropdownNodeDetails treeNode = {detailedNode} />
                }
            </div>
        </div>
    );
}

export default DropdownTree;
