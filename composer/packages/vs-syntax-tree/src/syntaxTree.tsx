import React, {useEffect, useState} from "react";
import { Dimmer, Loader, Radio } from "semantic-ui-react";
import DropdownTree from "./representations/dropdown-tree";
import GraphicalSyntaxTree from "./representations/graphical-tree";
import { PrimaryProps, TreeArrayNode, TreeGraph } from "./tree-interfaces";

function SyntaxTree(props: PrimaryProps) {
    const [isGraphicalView, updateIsGraphicalView] = useState(false);
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);
    const [treeArray, setTreeArray] = useState<TreeArrayNode [] | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result.treeGraph);

            if (!isGraphicalView) {
                setTreeArray(result.treeArray);
            }
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

            <div
                style = {{
                    position: "relative"
                }}
            >
                {!isGraphicalView && treeArray &&
                    <DropdownTree treeNode = {treeArray[0]} onCollapseTree = {props.onCollapseTree} />
                }

                {isGraphicalView && syntaxTreeGraph &&
                    <GraphicalSyntaxTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
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
