import { createElement } from "react";
import { render } from "react-dom";
import { PrimaryProps } from "./resources/tree-interfaces";
import SyntaxTree from "./syntaxTree";

export function renderSyntaxTree(activatedCommand: string,
                                 onCollapseTree: (nodeID: string) => void,
                                 renderTree: () => Promise<PrimaryProps>,
                                 switchFullTree: () => Promise<PrimaryProps>,
                                 target: HTMLElement
                                ) {
    const responseDataProps = {
        activatedCommand,
        onCollapseTree,
        renderTree,
        switchFullTree
    };

    const SyntaxTreeElement = createElement(SyntaxTree, responseDataProps);
    render(SyntaxTreeElement, target);
}
