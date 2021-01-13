import React, {useState} from "react";
import {Icon} from "semantic-ui-react";
import { TreeNodeProps } from "../tree-interfaces";
import Diagnostics from "./Diagnostics";
import NodeDetails from "./NodeDetails";

function TreeNode(props: TreeNodeProps) {
    const [didHoverNode, setDidHoverNode] = useState(false);
    const [didHoverWarning, setDidHoverWarning] = useState(false);

    function onHoverNode() {
        setDidHoverNode(true);
    }

    function undoHoverNode() {
        setDidHoverNode(false);
    }

    function onHoverWarning() {
        setDidHoverWarning(true);
    }

    function undoHoverWarning() {
        setDidHoverWarning(false);
    }

    function onClickNode() {
        undoHoverNode();
        props.onCollapseTree();
    }

    return (
        <div>
            <div
                style = {{
                    backgroundColor: props.node.nodeColor,
                    borderRadius: 10,
                    boxShadow: props.node.isCollapsible ? "2px 4px 2px #9E9E9E" : "none",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "row",
                    height: props.node.height,
                    justifyContent: "space-around",
                    left: props.node.x,
                    lineHeight: "50px",
                    margin: "auto",
                    position: "absolute",
                    top: props.node.y,
                    width: props.node.width
                }}
            >
                <div
                    style = {{
                        color: "white",
                        flexGrow: 1,
                        fontSize: 14,
                        paddingLeft: "5px",
                        textAlign: "center",
                        width: "auto"
                    }}
                    // tslint:disable-next-line: no-empty
                    onClick = {props.node.ifParent ? onClickNode : () => {}}
                    onMouseLeave = {undoHoverNode}
                    onMouseOver = {onHoverNode}
                >
                    {props.node.label}
                </div>

                {props.node.hasDiagnostics && props.node.diagnostics.length &&
                    <div
                        style = {{
                            height: "100%",
                            paddingRight: "5px"
                        }}
                        onMouseLeave = {undoHoverWarning}
                        onMouseOver = {onHoverWarning}
                    >
                        <Icon
                            name="warning"
                            size="small"
                            circular
                            inverted
                            color="green"
                        />
                    </div>
                }
            </div>

            {didHoverNode && <NodeDetails node={props.node} />}
            {didHoverWarning && <Diagnostics node={props.node} />}
        </div>
    );
}

export default TreeNode;
