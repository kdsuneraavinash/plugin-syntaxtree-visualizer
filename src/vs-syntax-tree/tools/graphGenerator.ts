import { treeMapper } from "./treeMapper";
import { TreeNode, layoutOptions } from "./resources";
import { graphMapper } from "./graphMapper";

export let nodeMembers: any[], nodeEdges: any[], nodeArray: TreeNode[], graphicalTreeArray: TreeNode[];

export function retrieveGraph (responseTree: JSON){
    nodeArray = [];
    treeMapper(responseTree, {}, 0);
    graphicalTreeArray = nodeArray;
    return updateSyntaxTree("", true);
}

export function updateSyntaxTree (nodeID: string, isGraphical: boolean){
    if (isGraphical){
        nodeEdges = []; nodeMembers = [];
    }
    graphMapper(isGraphical ? graphicalTreeArray : nodeArray, nodeID, isGraphical);
    return setGraph(isGraphical);
}

function setGraph(isGraphical: boolean){
    console.log(nodeArray);
    const graph = {
        id: "root",
        layoutOptions: layoutOptions,
        children: nodeMembers,
        edges: nodeEdges
    };
    
    const respArray = isGraphical ? graphicalTreeArray : nodeArray;
    return {graph, respArray};
}
