import * as _ from "lodash";

import { TreeNode } from "../resources/interfaces";
import { syntaxTreeObj } from "./syntaxTreeGenerator";

let treeNode: any;
let nodeCount: number = -1;

export function mapSyntaxTree(nodeObj: JSON, parentObj: TreeNode | any, treeLevel: number) {
    for (const props in nodeObj) {
        if (props === "source") {
            return;
        } else if (props !== "relativeResourcePath" && typeof nodeObj[props] === "object") {
            if (nodeObj[props].hasOwnProperty("isToken")) {
                if (nodeObj[props].leadingMinutiae && nodeObj[props].leadingMinutiae.length) {
                    for (const element of Object.keys(nodeObj[props].leadingMinutiae)) {
                        if(nodeObj[props].leadingMinutiae[element].isInvalid) {
                            parentObj.children.push({
                                nodeID: `c${++nodeCount}`,
                                value: nodeObj[props].leadingMinutiae[element].minutiae,
                                kind: "Invalid token",
                                parentID: parentObj.nodeID,
                                children: [],
                                errorNode: true,
                                diagnostics: [{
                                    message: "Invalid token '" + nodeObj[props].leadingMinutiae[element].minutiae + "'"
                                }]
                            });
                        }
                    }
                }

                parentObj.children.push({
                    nodeID: `c${++nodeCount}`,
                    value: (nodeObj[props].isMissing || nodeObj[props].kind === "EofToken") ?
                        nodeObj[props].kind : nodeObj[props].value,
                    parentID: parentObj.nodeID,
                    children: [],
                    kind: nodeObj[props].isMissing ? "Missing " + nodeObj[props].kind : nodeObj[props].kind,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    errorNode: nodeObj[props].isMissing,
                    diagnostics: nodeObj[props].isMissing ? [{
                        message: "Missing " + nodeObj[props].kind
                    }] : [],
                    position: nodeObj[props].position
                });
            } else if (!props.match(/^[0-9]+$/) || nodeObj[props].kind) {
                treeNode = {
                    nodeID: `p${++nodeCount}`,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    parentID: parentObj.nodeID,
                    didCollapse: treeLevel < 2 ? true : false,
                    children: [],
                    diagnostics: nodeObj[props].syntaxDiagnostics ? nodeObj[props].syntaxDiagnostics : [],
                    position: nodeObj[props].position
                };

                if (!props.match(/^[0-9]+$/)) {
                    const parentNode: any = {
                        ...treeNode,
                        value: syntaxTreeObj.length ? props : (nodeObj[props].kind ? nodeObj[props].kind : props),
                        kind: syntaxTreeObj.length ? props : (nodeObj[props].kind ? nodeObj[props].kind : props)
                    };
                    syntaxTreeObj.length ? parentObj.children.push(parentNode) : syntaxTreeObj.push(parentNode);
                    mapSyntaxTree(nodeObj[props], parentNode, treeLevel + 1);

                    if (!nodeObj[props].source && parentNode.children.length) {
                        assignProperties(parentNode);
                    }
                } else {
                    treeNode = {
                        ...treeNode,
                        value: nodeObj[props].kind,
                        kind: nodeObj[props].kind
                    };
                    parentObj.children.push(treeNode);
                    mapSyntaxTree(nodeObj[props], treeNode, treeLevel + 1);
                }
            }
        }
    }
}

function assignProperties(node: TreeNode | any) {
    let preceedingNode;

    for (let count = 0; count < node.children.length; count++) {
        if (!preceedingNode && node.children[count].kind !== "Invalid token") {
            preceedingNode = count;
        }

        if (node.children[count].diagnostics.length) {
            node.diagnostics = node.diagnostics.concat(_.cloneDeep(node.children[count].diagnostics));
        }
    }

    node.leadingMinutiae = _.cloneDeep(node.children[preceedingNode].leadingMinutiae);
    node.trailingMinutiae = _.cloneDeep(node.children[node.children.length - 1].trailingMinutiae);
    node.position = {
        startLine: node.children[preceedingNode].position.startLine,
        startColumn: node.children[preceedingNode].position.startColumn,
        endLine: node.children[node.children.length - 1].position.endLine,
        endColumn: node.children[node.children.length - 1].position.endColumn
    };
}
