import React, {useEffect, useState} from "react";

import DropdownNode from "../components/dropdown/dropdownNode";
import DropdownNodeDetails from "../components/dropdown/dropdownNodeDetails";
import * as styles from "../styles/dropdown-tree.styles";
import { DropdownTreeProps, TreeArrayNode } from "../tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    const [detailedNode, setDetailedNode] = useState<TreeArrayNode | undefined>(undefined);

    useEffect(() => {
        setDetailedNode(props.treeNode);
    }, []);

    function updateDetailedNode(nodeProp: TreeArrayNode) {
        setDetailedNode(nodeProp);
    }

    return (
        <div style = {styles.containerStyle}>
            <div style = {{
                ...styles.sideDividersStyle,
                flexGrow: 1
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
                width: "475px"
            }}>
                {detailedNode && <DropdownNodeDetails treeNode = {detailedNode} />}
            </div>
        </div>
    );
}

export default DropdownTree;
