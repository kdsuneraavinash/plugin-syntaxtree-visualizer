import React, {useEffect, useState} from "react";
import { Button, Dimmer, Icon, Label, Loader, Radio } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalTree from "./representations/graphical-tree";
import { FULL_TREE_MODE } from "./resources/constants";
import { SyntaxTreeProps, TreeGraph, TreeObjectNode } from "./resources/tree-interfaces";
import * as styles from "./styles/primary.styles";

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
            <div style = {styles.optionsContainer}>
                <div style = {styles.switchRepresentationDiv}>
                    <p style={styles.switchStyle}> Dropdown Tree View </p>
                    <Radio toggle onChange = {updateView} checked = {isDropdownView} />
                </div>

                <div style = {styles.viewDiv}>
                    <p style={styles.switchStyle}>Current View: {props.activatedCommand}</p>
                </div>

                {props.activatedCommand !== FULL_TREE_MODE &&
                    <div style = {styles.switchModeDiv}>
                        <Button as="div" labelPosition="right" onClick = {() => props.switchFullTree()}>
                            <Button icon disabled>
                                <Icon name="share" />
                            </Button>
                            <Label basic pointing="left">
                                Switch to Full Tree
                            </Label>
                        </Button>
                    </div>
                }
            </div>

            <div style = {styles.bodyStyle}>
                {isDropdownView && syntaxTreeArray &&
                    <DropdownTree treeNode = {syntaxTreeArray[0]} onCollapseTree = {props.onCollapseTree} />
                }

                {!isDropdownView && syntaxTreeGraph &&
                    <GraphicalTree treeGraph = {syntaxTreeGraph} onCollapseTree = {props.onCollapseTree} />
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
