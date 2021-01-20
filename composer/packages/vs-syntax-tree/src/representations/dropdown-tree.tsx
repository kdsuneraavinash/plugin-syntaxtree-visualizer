import React, {useEffect, useState} from "react";
import {Icon} from "semantic-ui-react";
import { DropdownTreeProps } from "../tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    const [ifCollapsible, updateIfCollapsible] = useState(false);
    const [isCollapsed, updateisCollapsed] = useState(false);

    useEffect(() => {
        updateisCollapsed(props.syntaxTreeArray.didCollapse);

        if (props.syntaxTreeArray.children && props.syntaxTreeArray.children.length) {
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
                >
                    {props.syntaxTreeArray.value}
                </div>
            </div>

            {ifCollapsible && isCollapsed &&
                props.syntaxTreeArray.children.map((item, id) => {
                    return <DropdownTree
                                syntaxTreeArray = {item}
                                key = {id}
                            />;
                })
            }
        </div>
    );
}

export default DropdownTree;
