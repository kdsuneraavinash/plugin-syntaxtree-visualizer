import React, {useState} from "react";
import DropdownNode from "../components/dropdownNode";
import { DropdownTreeProps, TreeArrayNode } from "../tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    const [currentNode, setCurrentNode] = useState<TreeArrayNode | undefined>(undefined);

    function updateCurrentNode(nodeProp: TreeArrayNode) {
        setCurrentNode(nodeProp);
    }

    return (
        <div style = {{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: window.innerWidth / 1.3
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
                <text>This is where the node details go</text>
                {currentNode && <text>{currentNode.kind}</text>}
            </div>
        </div>
    );
}

export default DropdownTree;
