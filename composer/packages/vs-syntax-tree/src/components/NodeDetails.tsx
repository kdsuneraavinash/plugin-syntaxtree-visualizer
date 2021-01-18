import React, {useEffect, useState} from "react";
import { Minutiae, TreeNodeDetailsProps } from "../tree-interfaces";

function NodeDetails(props: TreeNodeDetailsProps) {
    const [isEdgeNode, updateIsEdgeNode] = useState(false);
    const [isTopNode, updateIsTopNode] = useState(false);
    const [isBottomNode, updateIsBottomNode] = useState(false);

    useEffect(() => {
        if (props.node.x + 400 > window.innerWidth) {
            updateIsEdgeNode(true);
        }

        if (props.node.y + 350 > window.innerHeight) {
            updateIsBottomNode(true);
        }

        if (props.node.y < 150) {
            updateIsTopNode(true);
        }
    }, []);

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
                    borderLeft: isEdgeNode ? "15px solid #FFE5B4" : "none",
                    borderRight: isEdgeNode ? "none" : "15px solid #FFE5B4",
                    borderTop: "7.5px solid transparent",
                    height: 0,
                    left: isEdgeNode ? props.node.x - 15 :
                        props.node.x + props.node.width,
                    position: "absolute",
                    top: props.node.y + (props.node.height / 2),
                    transform: "translateY(-50%)",
                    width: 0
                }}
            />
            <div
                style = {{
                    backgroundColor: "#FFE5B4",
                    borderRadius: 5,
                    left: isEdgeNode ? props.node.x - 15 :
                        props.node.x + props.node.width + 15,
                    minHeight: 190,
                    minWidth: 175,
                    padding: 10,
                    position: "absolute",
                    textAlign: "left",
                    top: props.node.y + (props.node.height / 2),
                    transform: isEdgeNode ? (isBottomNode ? "translate(-100%, -92.5%)" :
                        (isTopNode ? "translate(-100%, -10%)" : "translate(-100%, -50%)")) :
                        (isBottomNode ? "translateY(-92.5%)" : (isTopNode ? "translateY(-10%)" : "translateY(-50%)")),
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
