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
    }, [props.treeGraph]);

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
                                    onFindNode = {() => props.onFindNode(item.position)}
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
                                            key = {id}
                                            edge = {item}
                                            isLocateAction = {isLocateAction}
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
