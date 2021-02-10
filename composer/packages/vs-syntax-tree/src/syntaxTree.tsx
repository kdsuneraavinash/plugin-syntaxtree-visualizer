import React, {useEffect, useState} from "react";
import { Dimmer, Loader, Radio } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalSyntaxTree from "./representations/graphical-tree";
import * as styles from "./styles/primary.styles";
import { PrimaryProps, TreeArrayNode, TreeGraph } from "./tree-interfaces";

function SyntaxTree(props: PrimaryProps) {
    const [isGraphicalView, updateIsGraphicalView] = useState(false);
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);
    const [syntaxTreeArray, setSyntaxTreeArray] = useState<TreeArrayNode [] | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result.treeGraph);

            if (!isGraphicalView) {
                setSyntaxTreeArray(result.treeArray);
            }
        });
    }, [props]);

    function updateView() {
        updateIsGraphicalView(!isGraphicalView);
    }

    return (
        <div style = {styles.bodyStyle}>
            <div style = {styles.containerStyle}>
                <p style={styles.switchStyle}> Graphical Tree View </p>
                <Radio toggle onChange = {updateView} checked = {isGraphicalView} />
            </div>

            <div style = {styles.bodyStyle}>
                {!isGraphicalView && syntaxTreeArray &&
                    <DropdownTree treeNode = {syntaxTreeArray[0]} onCollapseTree = {props.onCollapseTree} />
                }

                {isGraphicalView && syntaxTreeGraph &&
                    <GraphicalSyntaxTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
                }

                {!syntaxTreeGraph &&
                    <Dimmer active inverted>
                        <Loader size = "medium" />
                    </Dimmer>
                }

            </div>
        </div>
    );
}

export default SyntaxTree;
