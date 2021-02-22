import React, {useEffect, useState} from "react";
import { Dimmer, Loader, Radio } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalSyntaxTree from "./representations/graphical-tree";
import * as styles from "./styles/primary.styles";
import { SyntaxTreeProps, TreeGraph, TreeObjectNode } from "./tree-interfaces";

function SyntaxTree(props: SyntaxTreeProps) {
    const [isDropdownView, updateIsDropdownView] = useState(false);
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);
    const [syntaxTreeArray, setSyntaxTreeArray] = useState<TreeObjectNode [] | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            setSyntaxTreeGraph(result.treeGraph);
            setSyntaxTreeArray(result.treeArray);
        });
    }, [props]);

    function updateView() {
        updateIsDropdownView(!isDropdownView);
    }

    return (
        <div style = {styles.bodyStyle}>
            <div style = {styles.containerStyle}>
                <p style={styles.switchStyle}> Dropdown Tree View </p>
                <Radio toggle onChange = {updateView} checked = {isDropdownView} />
            </div>

            <div style = {styles.bodyStyle}>
                {isDropdownView && syntaxTreeArray &&
                    <DropdownTree treeNode = {syntaxTreeArray[0]} onCollapseTree = {props.onCollapseTree} />
                }

                {!isDropdownView && syntaxTreeGraph &&
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
