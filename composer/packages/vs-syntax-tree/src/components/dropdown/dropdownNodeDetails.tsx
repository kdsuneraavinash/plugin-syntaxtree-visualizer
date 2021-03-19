import React from "react";

import { DIAGNOSTICS,
         ENDING_POS,
         ERROR_MESSAGE,
         INVALID_TOKEN,
         LEADING_MINUTIAE,
         MINUTIAE,
         NODE_KIND,
         NONE,
         STARTING_POS,
         TRAILING_MINUTIAE } from "../../resources/constants";
import { DropdownDetailsProps } from "../../resources/tree-interfaces";
import * as styles from "../../styles/dropdown-tree.styles";
import DropdownArrayDetails from "./detailsArrayCard";
import DropdownDetails from "./detailsCard";

function DropdownNodeDetails(props: DropdownDetailsProps) {
    return (
        <div style = {styles.detailsBlockStyle}>
            {!props.treeNode && <text> {ERROR_MESSAGE} </text>}

            {props.treeNode &&
                <div>
                    {props.treeNode.value.length > 25 && props.treeNode.kind === INVALID_TOKEN &&
                        <DropdownDetails
                            title = "Value"
                            value = {props.treeNode.value}
                        />
                    }

                    <DropdownDetails
                        title = {NODE_KIND}
                        value = {props.treeNode.kind}
                    />

                    {props.treeNode.position &&
                        <div>
                            <DropdownDetails
                                title = {STARTING_POS}
                                value = {"(" + (props.treeNode.position.startLine + 1) + ", "
                                            + (props.treeNode.position.startColumn + 1) + ")"}
                            />

                            <DropdownDetails
                                title = {ENDING_POS}
                                value = {"(" + (props.treeNode.position.endLine + 1) + ", "
                                            + (props.treeNode.position.endColumn + 1) + ")"}
                            />
                        </div>
                    }

                    {props.treeNode.leadingMinutiae && props.treeNode.leadingMinutiae.length > 0 &&
                        <DropdownArrayDetails
                            title = {LEADING_MINUTIAE}
                            type = {MINUTIAE}
                            value = {props.treeNode.leadingMinutiae}
                        />
                    }

                    {(!props.treeNode.leadingMinutiae || props.treeNode.leadingMinutiae.length < 1) &&
                        <DropdownDetails
                            title = {LEADING_MINUTIAE}
                            value = {NONE}
                        />
                    }

                    {props.treeNode.trailingMinutiae && props.treeNode.trailingMinutiae.length > 0 &&
                        <DropdownArrayDetails
                            title = {TRAILING_MINUTIAE}
                            type = {MINUTIAE}
                            value = {props.treeNode.trailingMinutiae}
                        />
                    }

                    {(!props.treeNode.trailingMinutiae || props.treeNode.trailingMinutiae.length < 1) &&
                        <DropdownDetails
                            title = {TRAILING_MINUTIAE}
                            value = {NONE}
                        />
                    }

                    {props.treeNode.diagnostics && props.treeNode.diagnostics.length > 0 &&
                        <DropdownArrayDetails
                            title = {DIAGNOSTICS}
                            type = {DIAGNOSTICS}
                            value = {props.treeNode.diagnostics}
                        />
                    }

                    {(!props.treeNode.diagnostics || props.treeNode.diagnostics.length < 1) &&
                        <DropdownDetails
                            title = {DIAGNOSTICS}
                            value = {NONE}
                        />
                    }
                </div>
            }
        </div>
    );
}

export default DropdownNodeDetails;
