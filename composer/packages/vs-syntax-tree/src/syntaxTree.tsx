import React, {useEffect, useState} from "react";
import { Button, Dimmer, Icon, Label, Loader } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalTree from "./representations/graphical-tree";
import { FULL_TREE_MODE, SWITCH_DROPDOWN, SWITCH_GRAPHICAL } from "./resources/constants";
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
                {props.activatedCommand !== FULL_TREE_MODE &&
                    <div style = {styles.optionBlock}>
                        <Button as = "div" labelPosition = "right" onClick = {() => props.switchFullTree()}>
                            <Button color = "teal" icon>
                                <Icon name = "share" />
                            </Button>
                            <Label basic color = "teal" as = "a" pointing = "left">
                                Switch to Full Tree View
                            </Label>
                        </Button>
                    </div>
                }
                <div style = {styles.optionBlock}>
                    <Button as = "div" labelPosition = "right" onClick = {updateView}>
                        <Button color="teal" icon>
                            {isDropdownView ? <Icon name = "chart area" /> : <Icon name = "bars" />}
                        </Button>
                        <Label basic color = "teal" as = "a" pointing = "left">
                            {isDropdownView ? SWITCH_GRAPHICAL : SWITCH_DROPDOWN}
                        </Label>
                    </Button>
                </div>
            </div>

            <div style = {{
                ...styles.bodyStyle,
                top: 77
            }}>
                {isDropdownView && syntaxTreeArray &&
                    <DropdownTree
                        treeNode = {syntaxTreeArray[0]}
                        onCollapseTree = {props.onCollapseTree}
                        onFindNode = {props.onFindNode}
                    />
                }

                {!isDropdownView && syntaxTreeGraph &&
                    <GraphicalTree
                        treeGraph = {syntaxTreeGraph}
                        onCollapseTree = {props.onCollapseTree}
                        onFindNode = {props.onFindNode}
                    />
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
