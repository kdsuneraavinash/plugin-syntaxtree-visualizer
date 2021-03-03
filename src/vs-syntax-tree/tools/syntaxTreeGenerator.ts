import * as _ from "lodash";

import { layoutOptions, TreeNode } from "../resources/interfaces";
import { mapSyntaxGraph } from "./syntaxGraphMapper";
import { mapSyntaxTree } from "./syntaxTreeMapper";

export let isLocateAction: boolean;
export let nodeMembers: any[];
export let nodeEdges: any[];
export let syntaxTreeObj: TreeNode[];
let graphicalTreeObj: TreeNode[];

export function retrieveGraph(responseTree: any, isLocate: boolean) {
    syntaxTreeObj = [];
    isLocateAction = isLocate;
    mapSyntaxTree(responseTree, {}, 0);
    graphicalTreeObj = _.cloneDeep(syntaxTreeObj);
    return updateSyntaxTree("", true);
}

export function updateSyntaxTree(nodeID: string, isGraphical: boolean) {
    if (isGraphical) {
        nodeEdges = []; nodeMembers = [];
    }
    mapSyntaxGraph(isGraphical ? graphicalTreeObj : syntaxTreeObj, nodeID, isGraphical);
    return setGraph();
}

function setGraph() {
    const treeGraph = {
        id: "root",
        layoutOptions: layoutOptions,
        children: nodeMembers,
        edges: nodeEdges
    };

    return {treeGraph, syntaxTreeObj};
}
