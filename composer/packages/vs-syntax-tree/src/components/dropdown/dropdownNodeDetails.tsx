import React from "react";
import * as styles from "../../styles/dropdown-tree.styles";
import { DropdownDetailsProps } from "../../tree-interfaces";
import DropdownArrayDetails from "./detailsArrayCard";
import DropdownDetails from "./detailsCard";

function DropdownNodeDetails(props: DropdownDetailsProps) {
    return (
        <div style = {styles.detailsBlockStyle}>
            {!props.treeNode && <text>Ooops! Something went wrong!</text>}

            {props.treeNode &&
                <div>
                    <DropdownDetails title = "kind" value = {props.treeNode.kind} />

                    {props.treeNode.leadingMinutiae && props.treeNode.leadingMinutiae.length > 0 &&
                        <DropdownArrayDetails
                            title = "Leading Minutiae"
                            type = "minutiae"
                            value = {props.treeNode.leadingMinutiae}
                        />
                    }

                    {(!props.treeNode.leadingMinutiae || props.treeNode.leadingMinutiae.length < 1) &&
                        <DropdownDetails title = "Leading Minutiae" value = "None" />
                    }

                    {props.treeNode.trailingMinutiae && props.treeNode.trailingMinutiae.length > 0 &&
                        <DropdownArrayDetails
                            title = "Trailing Minutiae"
                            type = "minutiae"
                            value = {props.treeNode.trailingMinutiae}
                        />
                    }

                    {(!props.treeNode.trailingMinutiae || props.treeNode.trailingMinutiae.length < 1) &&
                        <DropdownDetails title = "Trailing Minutiae" value = "None" />
                    }

                    {props.treeNode.diagnostics && props.treeNode.diagnostics.length > 0 &&
                        <DropdownArrayDetails
                            title = "Diagnostics"
                            type = "diagnostics"
                            value = {props.treeNode.diagnostics}
                        />
                    }

                    {(!props.treeNode.diagnostics || props.treeNode.diagnostics.length < 1) &&
                        <DropdownDetails title = "Diagnostics" value = "None" />
                    }
                </div>
            }
        </div>
    );
}

export default DropdownNodeDetails;
