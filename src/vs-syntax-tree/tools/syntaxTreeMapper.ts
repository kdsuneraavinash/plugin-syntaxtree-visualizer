import * as _ from "lodash";
import { syntaxTreeObj } from "./syntaxTreeGenerator";
import { TreeNode } from "./resources";

let treeNode: any, nodeCount: number = -1;

export function syntaxTreeMapper(nodeObj: JSON, parentObj: TreeNode | any, treeLevel: number) {
    for (var props in nodeObj) {
        if (props === "syntaxDiagnostics"){
            return;
        }

        else if (props !== "relativeResourcePath" && typeof nodeObj[props] === "object") {
            if (nodeObj[props].hasOwnProperty("kind" && "value" && "isToken")) {
                if(nodeObj[props].invalidNodes && nodeObj[props].invalidNodes.length){
                    for (var element in nodeObj[props].invalidNodes){
                        parentObj.children.push({
                            nodeID: `c${++nodeCount}`,
                            value: nodeObj[props].invalidNodes[element].value,
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

                parentObj.children.push({
                    nodeID: `c${++nodeCount}`,
                    value: (nodeObj[props].isMissing || nodeObj[props].kind === "EofToken") ?
                        nodeObj[props].kind : nodeObj[props].value,
                    parentID: parentObj.nodeID,
                    children: [],
                    kind: nodeObj[props].isMissing ? "Missing "+nodeObj[props].kind : nodeObj[props].kind,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    errorNode: nodeObj[props].isMissing,
                    diagnostics: nodeObj[props].isMissing ? [{
                        message: "Missing "+nodeObj[props].kind
                    }] : []
                });
            }

            else if ((props.match(/^[0-9]+$/) === null) || nodeObj[props].kind) {
                treeNode = {
                    nodeID: `p${++nodeCount}`,
                    leadingMinutiae: nodeObj[props].leadingMinutiae,
                    trailingMinutiae: nodeObj[props].trailingMinutiae,
                    parentID: parentObj.nodeID,
                    didCollapse: treeLevel < 2 ? true : false,
                    children: [],
                    diagnostics: nodeObj[props].syntaxDiagnostics ? nodeObj[props].syntaxDiagnostics : []
                };

                if(props.match(/^[0-9]+$/) === null){
                    let parentNode: any = {
                        ...treeNode,
                        value: props,
                        kind: syntaxTreeObj.length ? props : "Compilation Unit"
                    };
                    syntaxTreeObj.length ? parentObj.children.push(parentNode) : syntaxTreeObj.push(parentNode);
                    syntaxTreeMapper(nodeObj[props], parentNode, treeLevel + 1);
                    
                    if(!nodeObj[props].kind && parentNode.children.length){
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

function assignProperties (node: TreeNode | any, checkDiagnostics: boolean) {
    if(checkDiagnostics){
        for(let i = 0; i < node.children.length; i++){
            if(node.children[i].diagnostics.length){
                node.diagnostics = node.diagnostics.concat(_.cloneDeep(node.children[i].diagnostics));
            }
        }
    }
    node.leadingMinutiae = _.cloneDeep(node.children[0].leadingMinutiae);
    node.trailingMinutiae = _.cloneDeep(node.children[node.children.length - 1].trailingMinutiae);
}
