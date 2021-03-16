import * as vscode from "vscode";
import { FULL_TREE_VIEW,
    LOCATE_NODE_COMMAND,
    LOCATE_NODE_TITLE,
    SUBTREE_VISUALIZER_COMMAND,
    SUBTREE_VISUALIZER_TITLE } from "../resources/constant-resources";

export class CodeActionProvider implements vscode.CodeActionProvider {
    public provideCodeActions(): vscode.Command[] {
        if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.selection.isEmpty) {
            return [];
        } else {
            const codeActions: any = [];
            codeActions.push(
            {
                command: SUBTREE_VISUALIZER_COMMAND,
                title: SUBTREE_VISUALIZER_TITLE
            },
            {
                command: LOCATE_NODE_COMMAND,
                title: LOCATE_NODE_TITLE
            });
            return codeActions;
        }
    }
}

export function postWebviewMessage (syntaxTreePanel: vscode.WebviewPanel) {
    syntaxTreePanel.webview.postMessage({
        command: "update",
        activatedCommand: FULL_TREE_VIEW
    });
}

export function findNode(editor: vscode.TextEditor, position: any) {
    vscode.window.showTextDocument(editor.document, {
        viewColumn: vscode.ViewColumn.One
    }).then((textEditor) => {
        const startPos = new vscode.Position(position.startLine, position.startColumn);
        const endPos = new vscode.Position(position.endLine, position.endColumn);
        textEditor.selection = new vscode.Selection(startPos, endPos);
    });
}
