import { toInteger } from "lodash";
import { TreeNode } from "../resources/interfaces";
import { nodeEdges, nodeMembers } from "./syntaxTreeGenerator";

export function graphMapper(targetArray: TreeNode[], nodeID: string, isGraphical: boolean) {
    for (let i = 0; i < targetArray.length; i++) {
        if (targetArray[i].nodeID === nodeID) {
            const status = targetArray[i].didCollapse;
            targetArray[i] = {
                ...targetArray[i],
                didCollapse: !status
            };
        }

        if (isGraphical) {
            const position = toInteger(targetArray[i].nodeID.replace(/\D/g, ""));
            let diagnostics: any[] = [];

            if (!targetArray[i].didCollapse && targetArray[i].nodeID.charAt(0) === "p") {
                diagnostics = targetArray[i].diagnostics;
            }

            nodeMembers.push({
                id: targetArray[i].nodeID,
                height: 50,
                width: diagnostics.length ? (targetArray[i].value.length * 7.5) + 50 :
                    Math.max((targetArray[i].value.length * 8.5), 82),
                label: targetArray[i].value,
                kind: targetArray[i].kind,
                leadingMinutiae: targetArray[i].leadingMinutiae,
                trailingMinutiae: targetArray[i].trailingMinutiae,
                hasDiagnostics: diagnostics.length > 0 ? true : false,
                diagnostics:  targetArray[i].diagnostics,
                layoutOptions: {
                    "elk.position": "(" + position + ", 0)"
                },
                ifParent: targetArray[i].children.length ? true : false,
                isCollapsible: targetArray[i].didCollapse ? false : (targetArray[i].children.length ? true : false),
                nodeColor: targetArray[i].errorNode ? "#DB3247" :
                    (targetArray[i].nodeID.charAt(0) === "p" ? "#20b6b0" : "#7f7f7f"),
                position: targetArray[i].position
            });

            if (nodeMembers.length > 1) {
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
