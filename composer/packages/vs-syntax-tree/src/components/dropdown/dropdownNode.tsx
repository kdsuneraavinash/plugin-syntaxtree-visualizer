import React, {useEffect, useState} from "react";
import {Icon} from "semantic-ui-react";
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
            <div
                style = {{
                    cursor: "default",
                    display: "flex",
                    flexDirection: "row",
                    height: 50,
                    lineHeight: "50px",
                    width: "100%"
                }}
            >
                {ifCollapsible && isCollapsed &&
                    <div
                        style = {{
                            height: "100%",
                            paddingLeft: "8px"
                        }}
                        onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                        // tslint:disable-next-line: no-empty
                        : () => {}}
                    >
                        <Icon name = "angle up" size = "large" />
                    </div>
                }

                {ifCollapsible && !isCollapsed &&
                    <div
                        style = {{
                            height: "100%",
                            paddingLeft: "8px"
                        }}
                        onClick = {ifCollapsible ? () => { props.onCollapseTree(props.treeNode.nodeID, false); }
                        // tslint:disable-next-line: no-empty
                        : () => {}}
                    >
                        <Icon name = "angle down" size = "large" />
                    </div>
                }

                <div
                    style = {{
                        color: props.treeNode.errorNode ? "red" : "black",
                        flexGrow: 1,
                        fontSize: 14,
                        paddingLeft: "5px",
                        textAlign: "left",
                        width: "auto"
                    }}
                    onClick = {() => { props.onClick(props.treeNode); }}
                >
                    {props.treeNode.value}
                </div>
            </div>

            {ifCollapsible && isCollapsed &&
                props.treeNode.children.map((item, id) => {
                    return <DropdownNode
                                treeNode = {item}
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
