import * as _ from "lodash";

import { TreeNode } from "../resources/interfaces";
import { checkNodePath, syntaxTreeObj } from "./syntax-tree-generator";
import { INVALID_TOKEN, MISSING } from "../resources/constant-resources";

let treeNode: any;
let nodeCount: number = -1;

export function mapSyntaxTree(nodeObj: JSON, parentObj: TreeNode | any, treeLevel: number, foundNodeBlock: boolean) {
    for (const props in nodeObj) {
        if (props === "source") {
            return;
        } else if (props !== "relativeResourcePath" && nodeObj[props] instanceof Object) {
            if (Array.isArray(nodeObj[props]) && !nodeObj[props].length) {
                continue;
            } else if (nodeObj[props].hasOwnProperty("isToken")) {
                if (nodeObj[props].leadingMinutiae && nodeObj[props].leadingMinutiae.length) {
                    for (const element of Object.keys(nodeObj[props].leadingMinutiae)) {
                        if (nodeObj[props].leadingMinutiae[element].isInvalid) {
                            parentObj.children.push({
                                nodeID: `c${++nodeCount}`,
                                value: nodeObj[props].leadingMinutiae[element].minutiae,
                                kind: INVALID_TOKEN,
                                parentID: parentObj.nodeID,
                                children: [],
                                errorNode: true,
                                diagnostics: [{
                                    message: INVALID_TOKEN + nodeObj[props].leadingMinutiae[element].minutiae
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
                    kind: nodeObj[props].isMissing ? MISSING + nodeObj[props].kind : nodeObj[props].kind,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    isNodePath: foundNodeBlock,
                    errorNode: nodeObj[props].isMissing,
                    diagnostics: nodeObj[props].isMissing ? [{
                        message: MISSING + nodeObj[props].kind
                    }] : [],
                    position: nodeObj[props].position
                });
            } else if (!props.match(/^[0-9]+$/) || nodeObj[props].kind) {
                treeNode = {
                    nodeID: `p${++nodeCount}`,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    parentID: parentObj.nodeID,
                    didCollapse: checkNodePath ? (nodeObj[props].isNodePath ? (nodeObj[props].isLocatedNode ? false : true) : false):
                        (treeLevel < 2 ? true : false),
                    isNodePath: nodeObj[props].isNodePath ? nodeObj[props].isNodePath : foundNodeBlock,
                    children: [],
                    diagnostics: nodeObj[props].syntaxDiagnostics ? nodeObj[props].syntaxDiagnostics : [],
                    position: nodeObj[props].position
                };

                let currentBlockStatus: boolean;
                if (checkNodePath && nodeObj[props].isNodePath){
                    currentBlockStatus = nodeObj[props].isLocatedNode ? true : foundNodeBlock;
                } else {
                    currentBlockStatus = foundNodeBlock;
                }

                if (!props.match(/^[0-9]+$/)) {
                    const parentNode: any = {
                        ...treeNode,
                        value: syntaxTreeObj.length ? props : (nodeObj[props].kind ? nodeObj[props].kind : props),
                        kind: syntaxTreeObj.length ? props : (nodeObj[props].kind ? nodeObj[props].kind : props)
                    };
                    syntaxTreeObj.length ? parentObj.children.push(parentNode) : syntaxTreeObj.push(parentNode);
                    mapSyntaxTree(nodeObj[props], parentNode, treeLevel + 1, currentBlockStatus);

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
                    mapSyntaxTree(nodeObj[props], treeNode, treeLevel + 1, currentBlockStatus);
                }
            }
        }
    }
}

function assignProperties(node: TreeNode | any) {
    let preceedingNode: number | any;

    for (let count = 0; count < node.children.length; count++) {
        if (!preceedingNode && node.children[count].kind !== INVALID_TOKEN) {
            preceedingNode = count;
        }
        if (node.children[count].diagnostics.length) {
            node.diagnostics = node.diagnostics.concat(_.cloneDeep(node.children[count].diagnostics));
        }
        if (checkNodePath && !node.didCollapse && node.children[count].isNodePath) {
            node.didCollapse = true;
            node.isNodePath = true;
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
