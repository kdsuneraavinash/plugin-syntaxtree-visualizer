import { createElement } from "react";
import { render } from "react-dom";
import { PrimaryProps } from "./resources/tree-interfaces";
import SyntaxTree from "./syntaxTree";

export function renderSyntaxTree(activatedCommand: string,
                                 onFindNode: (node: object) => void,
                                 onCollapseTree: (position: string) => void,
                                 renderTree: () => Promise<PrimaryProps>,
                                 switchFullTree: () => Promise<PrimaryProps>,
                                 target: HTMLElement
                                ) {
    const responseDataProps = {
        activatedCommand,
        onCollapseTree,
        onFindNode,
        renderTree,
        switchFullTree
    };

    const SyntaxTreeElement = createElement(SyntaxTree, responseDataProps);
    render(SyntaxTreeElement, target);
}
