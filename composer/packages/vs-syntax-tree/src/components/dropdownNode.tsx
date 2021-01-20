import React, {useEffect, useState} from "react";
import {Icon} from "semantic-ui-react";
import { DropdownNodeProps } from "../tree-interfaces";

function DropdownNode(props: DropdownNodeProps) {
    const [ifCollapsible, updateIfCollapsible] = useState(false);
    const [isCollapsed, updateisCollapsed] = useState(false);

    useEffect(() => {
        updateisCollapsed(props.treeNode.didCollapse);

        if (props.treeNode.children && props.treeNode.children.length) {
            updateIfCollapsible(true);
        }
    }, [props]);

    function changeCollapsibleStatus() {
        updateisCollapsed(!isCollapsed);
    }

    return (
        <div>
            <div
                style = {{
                    backgroundColor: "#F0F0F0",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "row",
                    height: 50,
                    lineHeight: "50px",
                    width: 350
                }}
            >
                {ifCollapsible && isCollapsed &&
                    <div
                        style = {{
                            height: "100%",
                            paddingLeft: "8px"
                        }}
                        // tslint:disable-next-line: no-empty
                        onClick = {ifCollapsible ? changeCollapsibleStatus : () => {}}
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
                        // tslint:disable-next-line: no-empty
                        onClick = {ifCollapsible ? changeCollapsibleStatus : () => {}}
                    >
                        <Icon name = "angle down" size = "large" />
                    </div>
                }

                <div
                    style = {{
                        color: "black",
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
                                key = {id}
                            />;
                })
            }
        </div>
    );
}

export default DropdownNode;
