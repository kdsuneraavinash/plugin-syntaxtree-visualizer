import React, {useEffect, useState} from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import GraphicalSyntaxTree from "./graphical-tree";
import { SyntaxTreeProps, TreeGraph } from "./tree-interfaces";

function SyntaxTree(props: SyntaxTreeProps) {
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result.treeGraph);
        });
    }, [props]);

    return (
        <div
            style = {{
                position: "relative"
            }}
        >
            {syntaxTreeGraph &&
                <GraphicalSyntaxTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
            }

            {!syntaxTreeGraph &&
                <Dimmer inverted>
                    <Loader size="medium">Loading</Loader>
                </Dimmer>
            }
        </div>
    );
}

export default SyntaxTree;
