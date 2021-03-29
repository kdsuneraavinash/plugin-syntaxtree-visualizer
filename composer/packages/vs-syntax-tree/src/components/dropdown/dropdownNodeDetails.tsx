"use strict";
/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
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
