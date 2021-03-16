import React, {useEffect, useState} from "react";
import { Button, Dimmer, Icon, Label, Loader } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalTree from "./representations/graphical-tree";
import { ERROR_MESSAGE, FULL_TREE_MODE, SWITCH_DROPDOWN, SWITCH_GRAPHICAL } from "./resources/constants";
import { SyntaxTreeProps, TreeGraph, TreeObjectNode } from "./resources/tree-interfaces";
import * as styles from "./styles/primary.styles";

function SyntaxTree(props: SyntaxTreeProps) {
    const [syntaxTreeGraph, setSyntaxTreeGraph] = useState<TreeGraph | undefined>(undefined);
    const [syntaxTreeArray, setSyntaxTreeArray] = useState<TreeObjectNode[] | undefined>(undefined);
    const [responseStatus, updateResponseStatus] = useState(true);
    const [isDropdownView, updateIsDropdownView] = useState(false);
    const [hoverViewSwitch, updateHoverViewSwitch] = useState(false);
    const [hoverFullTreeSwitch, updateHoverFullTreeSwitch] = useState(false);

    useEffect(() => {
        props.renderTree().then((result) => {
            if (result.treeArray && result.treeGraph) {
                updateResponseStatus(true);
                setSyntaxTreeGraph(result.treeGraph);
                setSyntaxTreeArray(result.treeArray);
            } else {
                updateResponseStatus(false);
            }
        });
    }, [props]);

    function updateView() {
        updateIsDropdownView(!isDropdownView);
    }

    function onHoverViewMode() {
        updateHoverViewSwitch(true);
    }

    function undoHoverViewMode() {
        updateHoverViewSwitch(false);
    }

    function onHoverSwitchFullTree() {
        updateHoverFullTreeSwitch(true);
    }

    function undoHoverSwitchFullTree() {
        updateHoverFullTreeSwitch(false);
    }

    return (
        <div style = {styles.bodyStyle}>
            {responseStatus &&
                <div>
                    <div style = {styles.optionsContainer}>
                        {props.activatedCommand !== FULL_TREE_MODE &&
                            <div
                                style = {styles.optionBlock}
                                onMouseLeave = {undoHoverSwitchFullTree}
                                onMouseOver = {onHoverSwitchFullTree}
                            >
                                <Button as = "div" labelPosition = "left" onClick = {() => props.switchFullTree()}>
                                    {hoverFullTreeSwitch &&
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
                                {hoverViewSwitch &&
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
            }
            {!responseStatus &&
                <p style = {styles.errorStyle}> {ERROR_MESSAGE} </p>
            }
        </div>
    );
}

export default SyntaxTree;
