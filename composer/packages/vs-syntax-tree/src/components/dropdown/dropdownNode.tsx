import React, {useEffect, useState} from "react";
import {Icon} from "semantic-ui-react";
import { COLLAPSED_ARROW_ICON,
         COLLAPSIBLE_ARROW_ICON,
         DROPDOWN_COLOR,
         DROPDOWN_WARNING_ICON,
         LARGE_ICON,
         NON_COLLAPSIBLE_ICON,
         SMALL_ICON,
         WARNING_COLOR } from "../../resources/constants";

import { DropdownNodeProps } from "../../resources/tree-interfaces";
import * as styles from "../../styles/dropdown-tree.styles";

function DropdownNode(props: DropdownNodeProps) {
    const [ifCollapsible, updateIfCollapsible] = useState(false);
    const [isCollapsed, updateisCollapsed] = useState(false);

    useEffect(() => {
        updateisCollapsed(props.treeNode.didCollapse);

        if (props.treeNode.children && props.treeNode.children.length) {
            updateIfCollapsible(true);
        }
    }, [props]);

    return (
        <div>
            <div style = {{
                ...styles.dropdownNodeStyle,
                marginLeft: props.treeLevel * 35
            }}>
                <div style ={styles.dropdownArrowStyle}>
                    {!ifCollapsible &&
                        <Icon name = {NON_COLLAPSIBLE_ICON} size = {SMALL_ICON} />
                    }

                    {ifCollapsible && isCollapsed &&
                        <div
                            onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                            // tslint:disable-next-line: no-empty
                            : () => {}}
                        >
                            <Icon name = {COLLAPSED_ARROW_ICON} size = {LARGE_ICON} />
                        </div>
                    }

                    {ifCollapsible && !isCollapsed &&
                        <div
                            onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                            // tslint:disable-next-line: no-empty
                            : () => {}}
                        >
                            <Icon name = {COLLAPSIBLE_ARROW_ICON} size = {LARGE_ICON} />
                        </div>
                    }
                </div>

                <div style = {{
                        ...styles.nodeLabelStyle,
                        color: props.treeNode.errorNode ? WARNING_COLOR : DROPDOWN_COLOR,
                        fontWeight: props.treeNode.isNodePath ? "bold" : "normal"
                    }}
                    onClick = {() => { props.onClick(props.treeNode); }}
                >
                    {props.treeNode.value}

                    {ifCollapsible && !props.treeNode.didCollapse && props.treeNode.diagnostics &&
                        props.treeNode.diagnostics.length > 0 &&
                        <div style = {styles.warningIconStyle}>
                            <Icon
                                name = {DROPDOWN_WARNING_ICON}
                                color = {WARNING_COLOR}
                            />
                        </div>
                    }
                </div>
            </div>

            {ifCollapsible && isCollapsed &&
                props.treeNode.children.map((item, id) => {
                    const level = props.treeLevel + 1;
                    return <DropdownNode
                                treeNode = {item}
                                treeLevel = {level}
                                onClick = {props.onClick}
                                onCollapseTree = {props.onCollapseTree}
                                key = {id}
                            />;
                })
            }
        </div>
    );
}

export default DropdownNode;
