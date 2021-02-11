import React, {useEffect, useState} from "react";
import {Icon} from "semantic-ui-react";

import * as styles from "../../styles/dropdown-tree.styles";
import { DropdownNodeProps } from "../../tree-interfaces";

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
                        <Icon name = "dot circle" size = "small" />
                    }

                    {ifCollapsible && isCollapsed &&
                        <div
                            onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                            // tslint:disable-next-line: no-empty
                            : () => {}}
                        >
                            <Icon name = "angle down" size = "large" />
                        </div>
                    }

                    {ifCollapsible && !isCollapsed &&
                        <div
                            onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                            // tslint:disable-next-line: no-empty
                            : () => {}}
                        >
                            <Icon name = "angle right" size = "large" />
                        </div>
                    }
                </div>

                <div style = {{
                        ...styles.nodeLabelStyle,
                        color: props.treeNode.errorNode ? "red" : "black"
                    }}
                    onClick = {() => { props.onClick(props.treeNode); }}
                >
                    {props.treeNode.value}

                    {ifCollapsible && !props.treeNode.didCollapse && props.treeNode.diagnostics &&
                        props.treeNode.diagnostics.length > 0 &&
                        <div style = {styles.warningIconStyle}>
                            <Icon
                                name = "warning sign"
                                color = "red"
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
