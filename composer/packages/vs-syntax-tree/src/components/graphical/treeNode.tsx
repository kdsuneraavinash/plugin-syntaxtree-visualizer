import React, {useState} from "react";
import {Icon} from "semantic-ui-react";

import { GRAPHICAL_LOCATE_ICON,
         GRAPHICAL_WARNING_ICON,
         LARGE_ICON, PRIMARY_COLOR,
         SECONDARY_COLOR,
         TOKEN_COLOR,
         WARNING_COLOR } from "../../resources/constants";
import { GraphicalNodeProps } from "../../resources/tree-interfaces";
import * as styles from "../../styles/graphical-tree.styles";
import Diagnostics from "./diagnosticsPopup";
import NodeDetails from "./nodeDetailsPopup";

function TreeNode(props: GraphicalNodeProps) {
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
                    opacity: props.isLocateAction ? (props.node.isNodePath ? 1 : 0.55) : 1,
                    top: props.node.y,
                    width: props.node.width
                }}
            >
                <div
                    style = {styles.labelContainerStyle}
                    // tslint:disable-next-line:no-empty
                    onMouseLeave = {undoHoverNode}
                    onMouseOver = {onHoverNode}
                >
                    {didHoverNode && props.node.position &&
                        <div
                            style = {styles.iconStyle}
                            onClick = {props.onFindNode}
                        >
                            <Icon
                                name = {GRAPHICAL_LOCATE_ICON}
                                color = {props.node.nodeColor === TOKEN_COLOR ? PRIMARY_COLOR : SECONDARY_COLOR}
                                circular
                                inverted
                            />
                        </div>
                    }
                    <div onClick = {props.node.ifParent ? onClickNode : () => {}}>
                        {props.node.label}
                    </div>
                </div>

                {props.node.hasDiagnostics && props.node.diagnostics.length &&
                    <div
                        style = {styles.iconStyle}
                        onMouseLeave = {undoHoverWarning}
                        onMouseOver = {onHoverWarning}
                    >
                        <Icon
                            name = {GRAPHICAL_WARNING_ICON}
                            color = {WARNING_COLOR}
                            size = {LARGE_ICON}
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
