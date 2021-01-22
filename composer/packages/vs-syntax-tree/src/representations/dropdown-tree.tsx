import React, {useEffect, useState} from "react";
import DropdownNode from "../components/dropdown/dropdownNode";
import DropdownNodeDetails from "../components/dropdown/dropdownNodeDetails";
import * as styles from "../styles/dropdown-tree.styles";
import { DropdownTreeProps, TreeArrayNode } from "../tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    const [currentNode, setCurrentNode] = useState<TreeArrayNode | undefined>(undefined);

    useEffect(() => {
        setCurrentNode(props.treeNode);
    }, []);

    function updateCurrentNode(nodeProp: TreeArrayNode) {
        setCurrentNode(nodeProp);
    }

    return (
        <div style = {styles.containerStyle}>
            <div style = {styles.sideDividersStyle}>
                <DropdownNode
                    treeNode = {props.treeNode}
                    treeLevel = {0}
                    onClick = {updateCurrentNode}
                    onCollapseTree = {props.onCollapseTree}
                />
            </div>

            <div style = {styles.sideDividersStyle}>
                {currentNode && <DropdownNodeDetails treeNode = {currentNode} />}
            </div>
        </div>
    );
}

export default DropdownTree;
