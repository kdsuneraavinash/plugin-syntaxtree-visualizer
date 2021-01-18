import React from "react";
import { Minutiae, TreeNodeDetailsProps } from "../tree-interfaces";

function NodeDetails(props: TreeNodeDetailsProps) {
    const mapMinutiae = (minutiaeArray: Minutiae[]) => {
        return minutiaeArray.map((item, id) => {
            return <p key = {id}>
                        {item.kind}
                    </p>;
        });
    };

    return (
        <div>
            <div
                style = {{
                    borderBottom: "7.5px solid transparent",
                    borderLeft: (props.node.x + 400) > window.innerWidth ? "15px solid #faf3c0" : "none",
                    borderRight: (props.node.x + 400) < window.innerWidth ? "15px solid #faf3c0" : "none",
                    borderTop: "7.5px solid transparent",
                    height: 0,
                    left: (props.node.x + 400) > window.innerWidth ?
                        props.node.x - 15 :
                        props.node.x + props.node.width,
                    position: "absolute",
                    top: props.node.y + (props.node.height / 2),
                    transform: "translateY(-50%)",
                    width: 0
                }}
            />
            <div
                style = {{
                    backgroundColor: "#faf3c0",
                    borderRadius: 5,
                    left: (props.node.x + 400) > window.innerWidth ?
                        props.node.x - 15 :
                        props.node.x + props.node.width + 15,
                    minHeight: 190,
                    minWidth: 175,
                    padding: 10,
                    position: "absolute",
                    textAlign: "left",
                    top: props.node.y + (props.node.height / 2),
                    transform: (props.node.x + 400) > window.innerWidth ?
                        (props.node.y + 350 > window.innerHeight ? "translate(-100%, -91%)" :
                        "translate(-100%, -50%)") :
                        (props.node.y + 350 > window.innerHeight ? "translateY(-91%)" :
                        "translateY(-50%)"),
                    zIndex: 1
                }}
            >
                <p> <b>Kind :</b> {props.node.kind}</p> <hr/>

                <p style = {{fontWeight: "bold"}}>
                    Leading Minutiae
                </p>
                {props.node.leadingMinutiae && props.node.leadingMinutiae.length  > 0 &&
                    mapMinutiae(props.node.leadingMinutiae)
                }
                {(!props.node.leadingMinutiae || props.node.leadingMinutiae.length < 1) && <p>None</p>} <hr/>

                <p style = {{fontWeight: "bold"}}>
                    Trailing Minutiae
                </p>
                {props.node.trailingMinutiae && props.node.trailingMinutiae.length > 0 &&
                    mapMinutiae(props.node.trailingMinutiae)
                }
                {(!props.node.trailingMinutiae || props.node.trailingMinutiae.length < 1) && <p>None</p>}
            </div>
        </div>
    );
}

export default NodeDetails;
