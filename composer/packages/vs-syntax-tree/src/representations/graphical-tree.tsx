import React from "react";
import TreeNodeEdge from "../components/graphical/treeEdge";
import TreeNode from "../components/graphical/treeNode";
import { GraphicalTreeProps } from "../tree-interfaces";

function GraphicalSyntaxTree(props: GraphicalTreeProps) {
    return (
        <div>
            {props.treeGraph &&
                <div>
                {
                    props.treeGraph.children.map((item, id) => {
                        return <TreeNode
                                    node = {item}
                                    onCollapseTree = {() => props.onCollapseTree(item.id, true)}
                                    key = {id}
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

export default GraphicalSyntaxTree;
