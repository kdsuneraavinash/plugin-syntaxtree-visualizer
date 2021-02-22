import * as _ from "lodash";
import { TreeNode } from "../resources/interfaces";
import { syntaxTreeObj } from "./syntaxTreeGenerator";

let treeNode: any;
let nodeCount: number = -1;

export function syntaxTreeMapper(nodeObj: JSON, parentObj: TreeNode | any, treeLevel: number) {
    for (const props in nodeObj) {
        if (props === "syntaxDiagnostics") {
            return;
        } else if (props !== "relativeResourcePath" && typeof nodeObj[props] === "object") {
            if (nodeObj[props].hasOwnProperty("kind" && "value" && "isToken")) {
                if (nodeObj[props].leadingMinutiae && nodeObj[props].leadingMinutiae.length) {
                    for (const element of Object.keys(nodeObj[props].leadingMinutiae)) {
                        if (nodeObj[props].leadingMinutiae[element].isInvalid) {
                            parentObj.children.push({
                                nodeID: `c${++nodeCount}`,
                                value: nodeObj[props].leadingMinutiae[element].minutiae,
                                kind: "Invalid Node",
                                parentID: parentObj.nodeID,
                                children: [],
                                errorNode: true,
                                diagnostics: [{
                                    message: "Invalid node"
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
                        value: syntaxTreeObj.length ? props : "Compilation Unit",
                        kind: syntaxTreeObj.length ? props : nodeObj[props].kind
                    };
                    syntaxTreeObj.length ? parentObj.children.push(parentNode) : syntaxTreeObj.push(parentNode);
                    syntaxTreeMapper(nodeObj[props], parentNode, treeLevel + 1);

                    if (!nodeObj[props].kind && parentNode.children.length) {
                        assignProperties(parentNode, parentObj.diagnostics.length);
                    }
                } else {
                    treeNode = {
                        ...treeNode,
                        value: nodeObj[props].kind,
                        kind: nodeObj[props].kind
                    };
                    parentObj.children.push(treeNode);
                    syntaxTreeMapper(nodeObj[props], treeNode, treeLevel + 1);
                }
            }
        }
    }
}

function assignProperties(node: TreeNode | any, checkDiagnostics: boolean) {
    if (checkDiagnostics) {
        for (const child of node.children) {
            if (child.diagnostics.length) {
                node.diagnostics = node.diagnostics.concat(_.cloneDeep(child.diagnostics));
            }
        }
    }
    node.leadingMinutiae = _.cloneDeep(node.children[0].leadingMinutiae);
    node.trailingMinutiae = _.cloneDeep(node.children[node.children.length - 1].trailingMinutiae);
    node.position = {
        startLine: node.children[0].position.startLine,
        startColumn: node.children[0].position.startColumn,
        endLine: node.children[node.children.length - 1].position.endLine,
        endColumn: node.children[node.children.length - 1].position.endColumn
    };
}
