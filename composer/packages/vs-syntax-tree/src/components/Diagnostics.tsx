import React, {useEffect, useState} from "react";
import { TreeNodeDetailsProps } from "../tree-interfaces";

function Diagnostics(props: TreeNodeDetailsProps) {
    const [isEdgeNode, updateIsEdgeNode] = useState(false);
    const [isBottomNode, updateIsBottomNode] = useState(false);

    useEffect(() => {
        if (props.node.x + 400 > window.innerWidth) {
            updateIsEdgeNode(true);
        }

        if (props.node.y + 300 > window.innerHeight) {
            updateIsBottomNode(true);
        }
    }, []);

    return (
        <div>
            <div
                style = {{
                    borderBottom: isBottomNode ? "none" : "15px solid #ffeee6",
                    borderLeft: "7.5px solid transparent",
                    borderRight: "7.5px solid transparent",
                    borderTop: isBottomNode ? "15px solid #ffeee6" : "none",
                    height: 0,
                    left: props.node.x + props.node.width - 25,
                    position: "absolute",
                    top: isBottomNode ? props.node.y - 10 : props.node.y + 45,
                    transform: "translateX(-50%)",
                    width: 0
                }}
            />

            <div
                style = {{
                    backgroundColor: "#ffeee6",
                    borderRadius: 5,
                    left: props.node.x + props.node.width - 40,
                    minWidth: 160,
                    padding: 10,
                    position: "absolute",
                    textAlign: "left",
                    top: isBottomNode ? props.node.y - 10 : props.node.y + props.node.height + 10,
                    transform: isEdgeNode ? (isBottomNode ? "translate(-100%, -100%)" : "translateX(-100%)") :
                        (isBottomNode ? "translateY(-92.5%)" : "translateX(-1%)"),
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
        </div>
    );
}

export default Diagnostics;
