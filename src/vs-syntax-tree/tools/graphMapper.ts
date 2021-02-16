import { toInteger } from "lodash";
import { TreeNode } from "./resources";
import { nodeMembers, nodeEdges } from "./syntaxTreeGenerator";

export function graphMapper(targetArray: TreeNode[], nodeID: string, isGraphical: boolean) {
    for (let i = 0; i < targetArray.length; i++) {
        if (targetArray[i].nodeID === nodeID) {
            let status = targetArray[i].didCollapse;
            targetArray[i] = {
                ...targetArray[i],
                didCollapse: !status
            };
        }

        if (isGraphical) {
            let position = toInteger(targetArray[i].nodeID.replace(/\D/g, ''));
            let diagnostics : any[] = [];

            if (!targetArray[i].didCollapse && targetArray[i].nodeID.charAt(0) === "p"){
                diagnostics = targetArray[i].diagnostics;
            }
    
            nodeMembers.push({
                id: targetArray[i].nodeID,
                width: diagnostics.length ? (targetArray[i].value.length * 8) + 50 : Math.max((targetArray[i].value.length * 8), 75),
                height: 50,
                label: targetArray[i].value,
                kind: targetArray[i].kind,
                leadingMinutiae: targetArray[i].leadingMinutiae,
                trailingMinutiae: targetArray[i].trailingMinutiae,
                diagnostics:  targetArray[i].diagnostics,
                hasDiagnostics: diagnostics.length > 0 ? true : false,
                layoutOptions: { 
                    'elk.position': '('+position+', 0)'
                },
                ifParent: targetArray[i].children.length ? true : false,
                isCollapsible: targetArray[i].didCollapse ? false : (targetArray[i].children.length ? true : false),
                nodeColor: targetArray[i].errorNode ? "#DB3247" : (targetArray[i].nodeID.charAt(0) === "p" ? "#20b6b0" : "#7f7f7f")
            });
    
            if(nodeMembers.length > 1){
                nodeEdges.push({
                    id: `e${targetArray[i].nodeID}`,
                    sources: [targetArray[i].parentID],
                    targets: [targetArray[i].nodeID]
                });
            }
        }

        if (targetArray[i].didCollapse) {
            graphMapper(targetArray[i].children, nodeID, isGraphical);
        }
    }
}
