import React, { useEffect, useState } from "react";
import { Button, Dimmer, Icon, Label, Loader } from "semantic-ui-react";

import DropdownTree from "./representations/dropdown-tree";
import GraphicalTree from "./representations/graphical-tree";
import { ERROR_MESSAGE, FULL_TREE_MODE, SWITCH_DROPDOWN, SWITCH_GRAPHICAL } from "./resources/constants";
import { PrimaryProps, TreeGraph, TreeNodeObject } from "./resources/tree-interfaces";
import * as styles from "./styles/primary.styles";

function SyntaxTree(props: PrimaryProps) {
    const [responseStatus, setResponseStatus] = useState(true);
    const [isDropdownView, setIsDropdownView] = useState(false);
    const [hoverViewSwitch, setViewSwitchStatus] = useState(false);
    const [hoverFullTreeSwitch, setFullTreeSwitchStatus] = useState(false);
    const [graphicalTree, setGraphicalTree] = useState<TreeGraph | undefined>(undefined);
    const [dropdownTree, setDropdownTree] = useState<TreeNodeObject[] | undefined>(undefined);

    useEffect(() => {
        props.renderTree().then((result) => {
            if (result.treeArray && result.treeGraph) {
                setResponseStatus(true);
                setGraphicalTree(result.treeGraph);
                setDropdownTree(result.treeArray);
            } else {
                setResponseStatus(false);
            }
        });
    }, [props]);

    function updateView() {
        setIsDropdownView(!isDropdownView);
    }

    function updateFullTreeSwitchStatus(status: boolean) {
        setFullTreeSwitchStatus(status);
    }

    function updateViewSwitchStatus(status: boolean) {
        setViewSwitchStatus(status);
    }

    return (
        <div style = {styles.bodyStyle}>
            {responseStatus &&
                <div>
                    <div style = {styles.optionsContainer}>
                        {props.activatedCommand !== FULL_TREE_MODE &&
                            <div
                                style = {styles.optionBlock}
                                onMouseLeave = {() => updateFullTreeSwitchStatus(false)}
                                onMouseOver = {() => updateFullTreeSwitchStatus(true)}
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
                            onMouseLeave = {() => updateViewSwitchStatus(false)}
                            onMouseOver = {() => updateViewSwitchStatus(true)}
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

                    <div style = {{
                        ...styles.bodyStyle,
                        marginTop: 30
                    }}>
                        {isDropdownView && dropdownTree &&
                            <DropdownTree
                                treeNode = {dropdownTree[0]}
                                onCollapseTree = {props.onCollapseTree}
                                onFindNode = {props.onFindNode}
                            />
                        }

                        {!isDropdownView && graphicalTree &&
                            <GraphicalTree
                                treeGraph = {graphicalTree}
                                onCollapseTree = {props.onCollapseTree}
                                onFindNode = {props.onFindNode}
                            />
                        }

                        {!graphicalTree &&
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
