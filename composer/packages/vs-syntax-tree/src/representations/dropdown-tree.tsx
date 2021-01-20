import React, {useEffect, useState} from "react";
import { DropdownTreeProps } from "../tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    const [isCollapsed, updateisCollapsed] = useState(false);

    useEffect(() => {
        updateisCollapsed(props.syntaxTreeArray.didCollapse);
    }, [props]);

    function changeCollapsibleStatus() {
        updateisCollapsed(!isCollapsed);
    }

    return (
        <div>
            <div
                style = {{
                    backgroundColor: "yellow",
                    border: "2px solid black",
                    height: 50,
                    lineHeight: "50px",
                    width: 350
                }}
                onClick = {changeCollapsibleStatus}
            >
                {props.syntaxTreeArray.value}
            </div>

            {isCollapsed && props.syntaxTreeArray.children &&
                props.syntaxTreeArray.children.length > 0 && props.syntaxTreeArray.children.map((item, id) => {
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
