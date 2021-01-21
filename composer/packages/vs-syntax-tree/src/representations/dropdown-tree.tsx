import React, {useEffect, useState} from "react";
import DropdownNode from "../components/dropdown/dropdownNode";
import DropdownNodeDetails from "../components/dropdown/dropdownNodeDetails";
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
        <div style = {{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            maxHeight: "70vh",
            minWidth: "800px",
            width: "90vh"
        }}>
            <div
                style = {{
                    backgroundColor: "#F0F0F0",
                    borderRight: "1px solid black",
                    height: "auto",
                    overflow: "auto",
                    width: "50%"
                }}
            >
                <DropdownNode
                    treeNode = {props.treeNode}
                    onClick = {updateCurrentNode}
                    onCollapseTree = {props.onCollapseTree}
                />
            </div>

            <div
                style = {{
                    backgroundColor: "#F0F0F0",
                    height: "auto",
                    overflow: "auto",
                    width: "50%"
                }}
            >
                {currentNode && <DropdownNodeDetails treeNode = {currentNode} />}
            </div>
        </div>
    );
}

export default DropdownTree;
