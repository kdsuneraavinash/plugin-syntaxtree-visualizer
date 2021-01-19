import React, {useEffect, useState} from "react";
import GraphicalSyntaxTree from "./graphical-syntaxtree";
import { SyntaxTreeProps, TreeGraph } from "./tree-interfaces";

function SyntaxTree(props: SyntaxTreeProps) {
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result);
        });
    }, [props]);

    return (
        <div>
            {syntaxTreeGraph &&
                <GraphicalSyntaxTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
            }
        </div>
    );
}

export default SyntaxTree;
