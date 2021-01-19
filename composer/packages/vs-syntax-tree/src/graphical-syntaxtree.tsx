import React from "react";
import TreeNodeEdge from "./components/TreeEdge";
import TreeNode from "./components/TreeNode";
import { VisualizeTreeProps } from "./tree-interfaces";

function GraphicalSyntaxTree(props: VisualizeTreeProps) {
    return (
        <div>
            {props.treeGraph &&
                <div>
                {
                    props.treeGraph.children.map((item, id) => {
                        return <TreeNode
                                    node = {item}
                                    onCollapseTree = {() => props.onCollapseTree(item.id)}
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
