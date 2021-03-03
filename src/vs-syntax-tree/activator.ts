import * as _ from "lodash";
import * as vscode from "vscode";

import { BallerinaExtension, ExtendedLangClient } from "../core";
import { BAL_SOURCE_NOT_FOUND, SELECTION_NOT_FOUND_LOCATE, SELECTION_NOT_FOUND_SUBTREE } from "../core/messages";
import { getCommonWebViewOptions, WebViewRPCHandler } from "../utils";
import { render } from "./renderer";
import { getRemoteMethods } from "./resources/remoteMethods";

let syntaxTreePanel: vscode.WebviewPanel;
let hasOpenWebview: boolean = false;

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

            context.subscriptions.push(
                vscode.commands.registerCommand(
                    "ballerina.codeBlock.visualizeSyntaxTree",
                    () => {
                        if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.selection.isEmpty) {
                            vscode.window.showWarningMessage("Syntax Tree Extension: ", SELECTION_NOT_FOUND_SUBTREE);
                            return;
                        } else if (!hasOpenWebview) {
                            createSyntaxTreePanel(langClient);
                        }
                        visualizeSyntaxTree(vscode.window.activeTextEditor.document.uri.path,
                                            vscode.window.activeTextEditor.selection, false);
                    }
                )
            );

            context.subscriptions.push(
                vscode.commands.registerCommand(
                    "ballerina.codeBlock.locateTreeNode",
                    () => {
                        if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.selection.isEmpty) {
                            vscode.window.showWarningMessage("Syntax Tree Extension: ", SELECTION_NOT_FOUND_LOCATE);
                            return;
                        } else if (!hasOpenWebview) {
                            createSyntaxTreePanel(langClient);
                        }
                        visualizeSyntaxTree(vscode.window.activeTextEditor.document.uri.path,
                                            vscode.window.activeTextEditor.selection, true);
                    }
                )
            );

            context.subscriptions.push(vscode.commands.registerCommand("ballerina.visualizeSyntaxTree", () => {
                if (!vscode.window.activeTextEditor ||
                    !vscode.window.activeTextEditor.document.fileName.endsWith(".bal")) {
                    vscode.window.showWarningMessage("Syntax Tree Extension: ", BAL_SOURCE_NOT_FOUND);
                    return;
                }
                if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(vscode.window.activeTextEditor.document.uri.path,
                                    null, false);
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
                command: "ballerina.codeBlock.visualizeSyntaxTree",
                title: "Visualize Syntax Tree"
            },
            {
                command: "ballerina.codeBlock.locateTreeNode",
                title: "Locate Code on Syntax Tree"
            });
            return codeActions;
        }
    }
}

function createSyntaxTreePanel(langClient: ExtendedLangClient) {
    syntaxTreePanel = vscode.window.createWebviewPanel(
        "visualizeSyntaxTree",
        "Syntax Tree Visualizer",
        {
            viewColumn: vscode.ViewColumn.Two
        },
        getCommonWebViewOptions()
    );
    hasOpenWebview = true;

    syntaxTreePanel.onDidDispose(() => {
        hasOpenWebview = false;
    });

    WebViewRPCHandler.create(syntaxTreePanel, langClient, getRemoteMethods(langClient));
}

function visualizeSyntaxTree(sourceRoot: string,
                             blockRange: any,
                             locateTreeNode: boolean) {

    if (syntaxTreePanel && !blockRange && !locateTreeNode) {
        vscode.workspace.onDidChangeTextDocument(_.debounce(() => {
            syntaxTreePanel.webview.postMessage({
                command: "update",
                docUri: sourceRoot,
            });
        }, 100));
    }

    const displayHtml = render(sourceRoot, blockRange, locateTreeNode);
    syntaxTreePanel.webview.html = displayHtml;
    syntaxTreePanel.reveal();
}
