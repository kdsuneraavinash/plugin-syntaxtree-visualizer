import React, {useEffect, useState} from "react";
import * as styles from "../../styles/graphical-tree.styles";
import { Minutiae, TreeNodeDetailsProps } from "../../tree-interfaces";

function NodeDetails(props: TreeNodeDetailsProps) {
    const [isEdgeNode, updateIsEdgeNode] = useState(false);
    const [isBottomNode, updateIsBottomNode] = useState(false);

    useEffect(() => {
        if (props.node.x + 400 > window.innerWidth) {
            updateIsEdgeNode(true);
        }

        if (props.node.y + 375 > window.innerHeight) {
            updateIsBottomNode(true);
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
                    ...styles.popupArrowStyle,
                    borderBottom: isBottomNode ? "none" : "15px solid #FFFDD0",
                    borderTop: isBottomNode ? "15px solid #FFFDD0" : "none",
                    left: props.node.x + (props.node.width / 2),
                    top: isBottomNode ? props.node.y - 15 : props.node.y + 50,
                    transform: "translateX(-40%)"
                }}
            />
            <div
                style = {{
                    ...styles.popupBodyStyle,
                    left: props.node.x + (props.node.width / 2),
                    top: isBottomNode ? props.node.y - 15 : props.node.y + props.node.height + 15,
                    transform: isEdgeNode ? (isBottomNode ? "translate(-80%, -100%)" : "translateX(-80%)") :
                        (isBottomNode ? "translate(-10%, -100%)" : "translateX(-10%)")
                }}
            >
                <p style = {styles.titleFontStyle}> Kind : </p>  {props.node.kind}<hr/>

                <p style = {styles.titleFontStyle}>
                    Leading Minutiae
                </p>
                {props.node.leadingMinutiae && props.node.leadingMinutiae.length  > 0 &&
                    mapMinutiae(props.node.leadingMinutiae)
                }
                {(!props.node.leadingMinutiae || props.node.leadingMinutiae.length < 1) && <p>None</p>} <hr/>

                <p style = {styles.titleFontStyle}>
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
