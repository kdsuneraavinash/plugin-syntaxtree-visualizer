import { END_TOKEN, INVALID_TOKEN, INVALID_TOKEN_MESSAGE, MISSING } from "../resources/constant-resources";
import { TreeNode } from "../resources/interfaces";
import { checkNodePath, syntaxTreeObj } from "./syntax-tree-generator";
import { assignProperties } from "./syntax-tree-mapper-utils";

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
                                    message: INVALID_TOKEN_MESSAGE + nodeObj[props].leadingMinutiae[element].minutiae
                                }]
                            });
                        }
                    }
                }

                parentObj.children.push({
                    nodeID: `c${++nodeCount}`,
                    value: (nodeObj[props].isMissing || nodeObj[props].kind === END_TOKEN) ?
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
                    didCollapse: checkNodePath ?
                        (nodeObj[props].isNodePath ? (nodeObj[props].isLocatedNode ? false : true) : false) :
                        (treeLevel < 2 ? true : false),
                    isNodePath: nodeObj[props].isNodePath ? nodeObj[props].isNodePath : foundNodeBlock,
                    children: [],
                    diagnostics: nodeObj[props].syntaxDiagnostics ? nodeObj[props].syntaxDiagnostics : [],
                    position: nodeObj[props].position
                };

                let currentBlockStatus: boolean;
                if (checkNodePath && nodeObj[props].isNodePath) {
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
