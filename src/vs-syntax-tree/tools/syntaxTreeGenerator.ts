import * as _ from "lodash";

import { layoutOptions, TreeNode } from "../resources/interfaces";
import { graphMapper } from "./graphMapper";
import { syntaxTreeMapper } from "./syntaxTreeMapper";

export let nodeMembers: any[];
export let nodeEdges: any[];
export let syntaxTreeObj: TreeNode[];
let graphicalTreeObj: TreeNode[];

export function retrieveGraph(responseTree: any) {
    syntaxTreeObj = [];
    syntaxTreeMapper(responseTree, {}, 0);
    graphicalTreeObj = _.cloneDeep(syntaxTreeObj);
    return updateSyntaxTree("", true);
}

export function updateSyntaxTree(nodeID: string, isGraphical: boolean) {
    if (isGraphical) {
        nodeEdges = []; nodeMembers = [];
    }

    graphMapper(isGraphical ? graphicalTreeObj : syntaxTreeObj, nodeID, isGraphical);
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
