import { createElement } from "react";
import { render } from "react-dom";
import SyntaxTree from "./syntaxTree";
import { PrimaryProps } from "./tree-interfaces";

export function renderSyntaxTree(
                                 onCollapseTree: (nodeID: string) => void,
                                 renderTree: () => Promise<PrimaryProps>,
                                 target: HTMLElement
                                ) {
    const responseDataProps = {
        onCollapseTree,
        renderTree
    };

    const SyntaxTreeElement = createElement(SyntaxTree, responseDataProps);
    render(SyntaxTreeElement, target);
}
