import React, { useEffect, useState } from "react";

import { NONE } from "../../resources/constants";
import { GraphicalDetailsProps } from "../../resources/tree-interfaces";
import * as styles from "../../styles/graphical-tree.styles";

function Diagnostics(props: GraphicalDetailsProps) {
    const [isEdgeNode, setIsEdgeNode] = useState(false);
    const [isBottomNode, setIsBottomNode] = useState(false);

    useEffect(() => {
        if (props.node.x + 400 > window.innerWidth) {
            setIsEdgeNode(true);
        }

        if (props.node.y + 250 > window.innerHeight) {
            setIsBottomNode(true);
        }
    }, []);

    return (
        <div>
            <div
                style = {{
                    ...styles.popupArrowStyle,
                    borderBottom: isBottomNode ? NONE : "15px solid #FFE7E7",
                    borderTop: isBottomNode ? "15px solid #FFE7E7" : "none",
                    left: props.node.x + props.node.width - 25,
                    top: isBottomNode ? props.node.y - 10 : props.node.y + 45
                }}
            />

            <div
                style = {{
                    ...styles.diagnosticsBodyStyle,
                    left: props.node.x + props.node.width - 40,
                    top: isBottomNode ? props.node.y - 10 : props.node.y + props.node.height + 10,
                    transform: isBottomNode ? (isEdgeNode ? "translate(-80%, -100%)" : "translate(-10%, -100%)") :
                        (isEdgeNode ? "translateX(-80%)" : "translateX(-10%)")
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
