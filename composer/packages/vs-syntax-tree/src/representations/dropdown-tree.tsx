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
            maxHeight: window.innerWidth * 0.75,
            width: window.innerWidth * 0.75
        }}>
            <div
                style = {{
                    width: "50%"
                }}
            >
                <DropdownNode treeNode = {props.treeNode} onClick = {updateCurrentNode} />
            </div>

            <div
                style = {{
                    width: "50%"
                }}
            >
                {currentNode && <DropdownNodeDetails treeNode = {currentNode} />}
            </div>
        </div>
    );
}

export default DropdownTree;
