import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import { COLLAPSED_ARROW_ICON,
         COLLAPSIBLE_ARROW_ICON,
         DROPDOWN_COLOR,
         DROPDOWN_LOCATE_ICON,
         DROPDOWN_WARNING_ICON,
         LARGE_ICON,
         NON_COLLAPSIBLE_ICON,
         PRIMARY_COLOR,
         SMALL_ICON,
         WARNING_COLOR } from "../../resources/constants";
import { DropdownNodeProps } from "../../resources/tree-interfaces";
import * as styles from "../../styles/dropdown-tree.styles";

function DropdownNode(props: DropdownNodeProps) {
    const [ifCollapsible, setIfCollapsible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoverStatus, setHoverStatus] = useState(false);

    useEffect(() => {
        setIsCollapsed(props.treeNode.didCollapse);

        if (props.treeNode.children && props.treeNode.children.length) {
            setIfCollapsible(true);
        }
    }, [props]);

    function updateHoverStatus(state: boolean) {
        setHoverStatus(state);
    }

    return (
        <div>
            <div
                onMouseOver = {() => { props.treeNode.position ? updateHoverStatus(true) : {}; }}
                onMouseLeave = {() => updateHoverStatus(false)}
                style = {{
                    ...styles.dropdownNodeStyle,
                    marginLeft: props.treeLevel * 35
                }}
            >
                <div style ={styles.dropdownArrowStyle}>
                    {!ifCollapsible &&
                        <Icon
                            name = {NON_COLLAPSIBLE_ICON}
                            size = {SMALL_ICON}
                            color = {props.treeNode.errorNode ? WARNING_COLOR : DROPDOWN_COLOR}
                        />
                    }

                    {ifCollapsible && isCollapsed &&
                        <Icon
                            name = {COLLAPSED_ARROW_ICON}
                            size = {LARGE_ICON}
                            color = {props.treeNode.errorNode ? WARNING_COLOR : DROPDOWN_COLOR}
                            onClick = {ifCollapsible ? () => props.onCollapseTree(props.treeNode.nodeID, false)
                                : () => {}}
                        />
                    }

                    {ifCollapsible && !isCollapsed &&
                        <Icon
                            name = {COLLAPSIBLE_ARROW_ICON}
                            size = {LARGE_ICON}
                            color = {props.treeNode.errorNode ? WARNING_COLOR : DROPDOWN_COLOR}
                            onClick = {ifCollapsible ? () => props.onCollapseTree(props.treeNode.nodeID, false)
                                : () => {}}
                        />
                    }
                </div>

                <div
                    style = {{
                        ...styles.nodeLabelStyle,
                        color: props.treeNode.errorNode ? WARNING_COLOR : DROPDOWN_COLOR,
                        fontWeight: props.treeNode.isNodePath ? "bold" : "normal"
                    }}
                    onClick = {() => { props.onClick(props.treeNode); }}
                >
                    {props.treeNode.value.length > 25 ? props.treeNode.kind : props.treeNode.value}

                    {ifCollapsible && !props.treeNode.didCollapse && props.treeNode.diagnostics &&
                        props.treeNode.diagnostics.length > 0 &&
                        <div style = {styles.iconStyle}>
                            <Icon
                                name = {DROPDOWN_WARNING_ICON}
                                color = {WARNING_COLOR}
                                size = {LARGE_ICON}
                            />
                        </div>
                    }
                </div>

                <div style = {styles.iconStyle}>
                    {hoverStatus && props.treeNode.position &&
                        <Icon
                            name = {DROPDOWN_LOCATE_ICON}
                            circular
                            inverted
                            color = {PRIMARY_COLOR}
                            onClick = {() => { props.onFindNode(props.treeNode.position); }}
                        />
                    }
                </div>
            </div>

            {ifCollapsible && isCollapsed &&
                props.treeNode.children.map((item, id) => {
                    const level = props.treeLevel + 1;

                    return <DropdownNode
                                key = {id}
                                treeNode = {item}
                                treeLevel = {level}
                                onClick = {props.onClick}
                                onCollapseTree = {props.onCollapseTree}
                                onFindNode = {props.onFindNode}
                            />;
                })
            }
        </div>
    );
}

export default DropdownNode;
