import * as _ from "lodash";

import { LAYOUT_OPTIONS, LOCATE_TREE_VIEW } from "../resources/constant-resources";
import { TreeNode } from "../resources/interfaces";
import { mapSyntaxGraph } from "./syntax-graph-mapper";
import { mapSyntaxTree } from "./syntax-tree-mapper";

export let checkNodePath: boolean;
export let nodeMembers: any[];
export let nodeEdges: any[];
export let syntaxTreeObj: TreeNode[];
let graphicalTreeObj: TreeNode[];

export function retrieveGraph(responseTree: any, activatedCommand: string) {
    syntaxTreeObj = [];
    checkNodePath = activatedCommand === LOCATE_TREE_VIEW ? true : false;
    mapSyntaxTree(responseTree, {}, 0, false);
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
        layoutOptions: LAYOUT_OPTIONS,
        children: nodeMembers,
        edges: nodeEdges,
        isLocateMode: checkNodePath
    };

    return {treeGraph, syntaxTreeObj};
}
