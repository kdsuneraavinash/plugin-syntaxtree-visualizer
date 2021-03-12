import React, {useEffect, useState} from "react";
import { Button, Dimmer, Icon, Label, Loader } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalTree from "./representations/graphical-tree";
import { FULL_TREE_MODE, SWITCH_DROPDOWN, SWITCH_GRAPHICAL } from "./resources/constants";
import { SyntaxTreeProps, TreeGraph, TreeObjectNode } from "./resources/tree-interfaces";
import * as styles from "./styles/primary.styles";

function SyntaxTree(props: SyntaxTreeProps) {
    const [isDropdownView, updateIsDropdownView] = useState(false);
    const [onSwitchView, updateOnSwitchView] = useState(false);
    const [onSwitchFullTree, updateOnSwitchFullTree] = useState(false);
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

    function onHoverViewMode() {
        updateOnSwitchView(true);
    }

    function undoHoverViewMode() {
        updateOnSwitchView(false);
    }

    function onHoverSwitchFullTree() {
        updateOnSwitchFullTree(true);
    }

    function undoHoverSwitchFullTree() {
        updateOnSwitchFullTree(false);
    }

    return (
        <div style = {styles.bodyStyle}>
            <div style = {styles.optionsContainer}>
                {props.activatedCommand !== FULL_TREE_MODE &&
                    <div
                        style = {styles.optionBlock}
                        onMouseLeave = {undoHoverSwitchFullTree}
                        onMouseOver = {onHoverSwitchFullTree}
                    >
                        <Button as = "div" labelPosition = "left" onClick = {() => props.switchFullTree()}>
                            {onSwitchFullTree &&
                                <Label basic color = "teal" as = "a" pointing = "right">
                                    Switch to Full Tree View
                                </Label>
                            }
                            <Button color = "teal" icon>
                                <Icon name = "share" />
                            </Button>
                        </Button>
                    </div>
                }
                <div
                    style = {styles.optionBlock}
                    onMouseLeave = {undoHoverViewMode}
                    onMouseOver = {onHoverViewMode}
                >
                    <Button as = "div" labelPosition = "left" onClick = {updateView}>
                        {onSwitchView &&
                            <Label basic color = "teal" as = "a" pointing = "right">
                                {isDropdownView ? SWITCH_GRAPHICAL : SWITCH_DROPDOWN}
                            </Label>
                        }
                        <Button color="teal" icon>
                            {isDropdownView ? <Icon name = "chart area" /> : <Icon name = "bars" />}
                        </Button>
                    </Button>
                </div>
            </div>

            <div style = {styles.bodyStyle}>
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
