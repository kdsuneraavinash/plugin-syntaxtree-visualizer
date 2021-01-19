import React, {useEffect, useState} from "react";
import { Dimmer, Loader, Radio } from "semantic-ui-react";
import GraphicalSyntaxTree from "./graphical-syntaxtree";
import { SyntaxTreeProps, TreeGraph } from "./tree-interfaces";

function SyntaxTree(props: SyntaxTreeProps) {
    const [isGraphicalView, updateIsGraphicalView] = useState(false);
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result);
        });
    }, [props]);

    function updateView() {
        updateIsGraphicalView(!isGraphicalView);
    }

    return (
        <div
            style = {{
                position: "relative"
            }}
        >
            <div
                style = {{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "15px",
                    marginLeft: "2%"
                }}
            >
                <p style={{paddingRight: "15px"}}>Graphical Tree View</p>
                <Radio toggle onChange = {updateView} checked = {isGraphicalView} />
            </div>

            <div>
                {!isGraphicalView && syntaxTreeGraph &&
                    <div>
                        <text>This is where the drop down happens!</text>
                    </div>
                }

                {isGraphicalView && syntaxTreeGraph &&
                    <div
                        style = {{
                            position: "relative"
                        }}
                    >
                        <GraphicalSyntaxTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
                    </div>
                }

                {!syntaxTreeGraph &&
                    <Dimmer inverted>
                        <Loader size="medium">Loading</Loader>
                    </Dimmer>
                }
            </div>
        </div>
    );
}

export default SyntaxTree;
