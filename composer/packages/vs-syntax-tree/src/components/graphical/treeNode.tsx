import React, {useState} from "react";
import {Icon} from "semantic-ui-react";
import * as styles from "../../styles/graphical-tree.styles";
import { TreeNodeProps } from "../../tree-interfaces";
import Diagnostics from "./diagnosticsPopup";
import NodeDetails from "./nodeDetailsPopup";

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
                    ...styles.nodeContainerStyle,
                    backgroundColor: props.node.nodeColor,
                    boxShadow: props.node.isCollapsible ? "2px 4px 2px #9E9E9E" : "none",
                    height: props.node.height,
                    left: props.node.x,
                    top: props.node.y,
                    width: props.node.width
                }}
            >
                <div
                    style = {styles.labelContainerStyle}
                    // tslint:disable-next-line: no-empty
                    onClick = {props.node.ifParent ? onClickNode : () => {}}
                    onMouseLeave = {undoHoverNode}
                    onMouseOver = {onHoverNode}
                >
                    {props.node.label}
                </div>

                {props.node.hasDiagnostics && props.node.diagnostics.length &&
                    <div
                        style = {styles.warningIconStyle}
                        onMouseLeave = {undoHoverWarning}
                        onMouseOver = {onHoverWarning}
                    >
                        <Icon
                            name = "warning"
                            size = "small"
                            circular
                            inverted
                            color = "orange"
                        />
                    </div>
                }
            </div>

            {didHoverNode && <NodeDetails node = {props.node} />}
            {didHoverWarning && <Diagnostics node = {props.node} />}
        </div>
    );
}

export default TreeNode;
