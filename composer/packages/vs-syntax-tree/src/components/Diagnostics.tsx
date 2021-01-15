import React from "react";
import { TreeNodeDetailsProps } from "../tree-interfaces";

function Diagnostics(props: TreeNodeDetailsProps) {
    return (
        <div
            style = {{
                backgroundColor: "#faf3c0",
                borderRadius: 5,
                left: props.node.x > window.innerWidth - 250 ?
                    props.node.x - 130 :
                    props.node.x + (props.node.width / 1.25),
                minWidth: 160,
                padding: 10,
                position: "absolute",
                textAlign: "left",
                top: props.node.y > window.innerHeight - 150 ?
                    props.node.y - 100 :
                    props.node.y + (props.node.height / 1.25),
                zIndex: 1
            }}
        >
            <p> <b>This block contains :</b></p> <hr/>
            {props.node.diagnostics.map((item, id) => {
                    return <p key = {id}>
                        {item.message}
                    </p>;
                })
            }
        </div>
    );
}

export default Diagnostics;
