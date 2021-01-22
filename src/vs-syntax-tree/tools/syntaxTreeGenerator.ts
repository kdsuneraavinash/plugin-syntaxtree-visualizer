import * as _ from 'lodash';

import { syntaxTreeMapper } from "./syntaxTreeMapper";
import { TreeNode, layoutOptions } from "./resources";
import { graphMapper } from "./graphMapper";

export let nodeMembers: any[], nodeEdges: any[], syntaxTreeObj: TreeNode[], graphicalTreeObj: TreeNode[];

export function retrieveGraph (responseTree: JSON){
    syntaxTreeObj = [];
    syntaxTreeMapper(responseTree, {}, 0);
    graphicalTreeObj = _.cloneDeep(syntaxTreeObj);
    return updateSyntaxTree("", true);
}

export function updateSyntaxTree (nodeID: string, isGraphical: boolean){
    if (isGraphical){
        nodeEdges = []; nodeMembers = [];
    }

    graphMapper(isGraphical ? graphicalTreeObj : syntaxTreeObj, nodeID, isGraphical);
    return setGraph();
}

function setGraph(){
    const treeGraph = {
        id: "root",
        layoutOptions: layoutOptions,
        children: nodeMembers,
        edges: nodeEdges
    };

    return {treeGraph, syntaxTreeObj};
}
