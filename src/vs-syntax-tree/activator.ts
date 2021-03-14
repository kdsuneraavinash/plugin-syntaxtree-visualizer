import * as _ from "lodash";
import * as vscode from "vscode";

import { BallerinaExtension, ExtendedLangClient } from "../core";
import { BAL_SOURCE_NOT_FOUND, SELECTION_NOT_FOUND_LOCATE, SELECTION_NOT_FOUND_SUBTREE } from "../core/messages";
import { getCommonWebViewOptions, WebViewRPCHandler } from "../utils";
import { render } from "./renderer";
import { getRemoteMethods } from "./resources/remote-methods";
import { EXTENSION_ID,
         EXTENSION_NAME,
         LOCATE_NODE_TITLE,
         SUBTREE_VISUALIZER_TITLE,
         FULL_TREE_VISUALIZER_COMMAND,
         SUBTREE_VISUALIZER_COMMAND,
         LOCATE_NODE_COMMAND,
         FULL_TREE_VIEW,
         SUB_TREE_VIEW,
         LOCATE_TREE_VIEW } from "./resources/constant-resources";

let activeTextEditor: vscode.TextEditor;
let syntaxTreePanel: vscode.WebviewPanel;
let hasOpenWebview: boolean = false;
let executedCommand: string;

export function activate(ballerinaExtInstance: BallerinaExtension) {
    const context = <vscode.ExtensionContext> ballerinaExtInstance.context;
    const langClient = <ExtendedLangClient> ballerinaExtInstance.langClient;

    ballerinaExtInstance.onReady().then(() => {
        const { experimental } = langClient.initializeResult!.capabilities;
        const serverProvidesExamples = experimental && experimental.examplesProvider;

        if (!serverProvidesExamples) {
            ballerinaExtInstance.showMessageServerMissingCapability();
            return;
        } else {
            context.subscriptions.push(
                vscode.languages.registerCodeActionsProvider(
                    { pattern: "**/*.{bal}", scheme: "file" },
                    new CodeActionProvider()
                )
            );

            context.subscriptions.push(vscode.commands.registerCommand(SUBTREE_VISUALIZER_COMMAND, () => {
                if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.selection.isEmpty) {
                    vscode.window.showWarningMessage(EXTENSION_NAME, ": ", SELECTION_NOT_FOUND_SUBTREE);
                    return;
                } else if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(vscode.window.activeTextEditor,
                                    vscode.window.activeTextEditor.selection, SUB_TREE_VIEW);
            }));

            context.subscriptions.push(vscode.commands.registerCommand(LOCATE_NODE_COMMAND, () => {
                if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.selection.isEmpty) {
                    vscode.window.showWarningMessage(EXTENSION_NAME, ": ", SELECTION_NOT_FOUND_LOCATE);
                    return;
                } else if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(vscode.window.activeTextEditor, 
                                    vscode.window.activeTextEditor.selection, LOCATE_TREE_VIEW);
            }));

            context.subscriptions.push(vscode.commands.registerCommand(FULL_TREE_VISUALIZER_COMMAND, () => {
                if (!vscode.window.activeTextEditor ||
                    !vscode.window.activeTextEditor.document.fileName.endsWith(".bal")) {
                    vscode.window.showWarningMessage(EXTENSION_NAME, ": ", BAL_SOURCE_NOT_FOUND);
                    return;
                }
                if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(vscode.window.activeTextEditor,
                                    vscode.window.activeTextEditor.selection, FULL_TREE_VIEW);
            }));
        }
    })
    .catch((e) => {
        if (!ballerinaExtInstance.isValidBallerinaHome()) {
            ballerinaExtInstance.showMessageInvalidBallerinaHome();
        } else {
            ballerinaExtInstance.showPluginActivationError();
        }
    });
}

class CodeActionProvider implements vscode.CodeActionProvider {
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

function createSyntaxTreePanel(langClient: ExtendedLangClient) {
    syntaxTreePanel = vscode.window.createWebviewPanel(
        EXTENSION_ID,
        EXTENSION_NAME,
        {
            viewColumn: vscode.ViewColumn.One
        },
        getCommonWebViewOptions()
    );
    hasOpenWebview = true;
    syntaxTreePanel.onDidDispose(() => {
        hasOpenWebview = false;
    });

    WebViewRPCHandler.create(syntaxTreePanel, langClient, getRemoteMethods(langClient));
}

function visualizeSyntaxTree(activeEditor: vscode.TextEditor,
                             blockRange: vscode.Selection,
                             activatedCommand: string) {
    const sourceRoot = activeEditor.document.uri.path;

    if (hasOpenWebview) {
        vscode.workspace.onDidChangeTextDocument(_.debounce((event) => {
            if (vscode.window.activeTextEditor &&
                activeTextEditor.document.uri === vscode.window.activeTextEditor.document.uri) {
                if (executedCommand === FULL_TREE_VIEW || 
                    executedCommand === LOCATE_TREE_VIEW ||
                    blockRange.contains(event.contentChanges[0].range)) {
                    syntaxTreePanel.webview.postMessage({
                        command: "update",
                        docUri: sourceRoot
                    });
                }
            }
        }, 400));

        syntaxTreePanel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case "findNode": {
                    findNode(activeEditor, message.position);
                    return;
                }
                case "switchView": {
                    if(message.didSwitch) {
                        executedCommand = FULL_TREE_VIEW;
                    }
                    return;
                }
            }
        });
    }

    const displayHtml = render(sourceRoot, blockRange, activatedCommand);
    syntaxTreePanel.webview.html = displayHtml;
    syntaxTreePanel.reveal();
    activeTextEditor = activeEditor;
    executedCommand = activatedCommand;
}

function findNode (editor: vscode.TextEditor, position: any) { 
    vscode.window.showTextDocument(editor.document).then((textEditor) => {
        const startPos = new vscode.Position(position.startLine, position.startColumn);    
        const endPos = new vscode.Position(position.endLine, position.endColumn);
        textEditor.selection = new vscode.Selection(startPos, endPos);
    });
}
