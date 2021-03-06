import React, { useEffect, useState } from "react";

import TreeNodeEdge from "../components/graphical/treeEdge";
import TreeNode from "../components/graphical/treeNode";
import { GraphicalTreeProps } from "../resources/tree-interfaces";

function GraphicalTree(props: GraphicalTreeProps) {
    const [isLocateAction, setIsLocateAction] = useState(false);

    useEffect(() => {
        if (props.treeGraph) {
            setIsLocateAction(props.treeGraph.isLocateMode);
        }
    }, [props]);

    return (
        <div>
            {props.treeGraph &&
                <div>
                {
                    props.treeGraph.children.map((item, id) => {
                        return <TreeNode
                                    key = {id}
                                    node = {item}
                                    isLocateAction = {isLocateAction}
                                    onCollapseTree = {() => props.onCollapseTree(item.id, true)}
                                />;
                    })
                }

                    <svg
                        width = {props.treeGraph.width}
                        height = {props.treeGraph.height}
                    >
                        {
                            props.treeGraph.edges.map((item, id) => {
                                return <TreeNodeEdge
                                            edge = {item}
                                            key = {id}
                                        />;
                            })
                        }
                    </svg>
                </div>
            }
        </div>
    );
}

export default GraphicalTree;
