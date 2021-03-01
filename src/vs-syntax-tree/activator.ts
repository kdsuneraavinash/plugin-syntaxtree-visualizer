import * as vscode from "vscode";
import * as _ from "lodash";

import { BallerinaExtension, ExtendedLangClient } from "../core";
import { getCommonWebViewOptions, WebViewRPCHandler } from "../utils";
import { getRemoteMethods } from "./resources/remoteMethods";
import { render } from "./renderer";

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
                            vscode.window.showWarningMessage("Syntax Tree Extension: No code block chosen for visualization.");
                            return;
                        } else if (!hasOpenWebview) {
                            createSyntaxTreePanel(langClient);
                        }
                        visualizeSyntaxTree(vscode.window.activeTextEditor.document.uri.path, syntaxTreePanel, vscode.window.activeTextEditor.selection);
                    }
                )
            );

            context.subscriptions.push(vscode.commands.registerCommand("ballerina.visualizeSyntaxTree", () => {
                if (!vscode.window.activeTextEditor ||
                    !vscode.window.activeTextEditor.document.fileName.endsWith(".bal")) {
                    vscode.window.showWarningMessage("Syntax Tree Extension: Ballerina Source file has not been detected.");
                    return;
                }
                if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(vscode.window.activeTextEditor.document.uri.path, syntaxTreePanel, null);
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
            codeActions.push({
                command: "ballerina.codeBlock.visualizeSyntaxTree",
                title: "Visualize Syntax Tree"
            });
            return codeActions;
        }
    }
}

function createSyntaxTreePanel(langClient: ExtendedLangClient){
    syntaxTreePanel = vscode.window.createWebviewPanel(
        "visualizeSyntaxTree",
        "Syntax Tree Visualizer",
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

function visualizeSyntaxTree(sourceRoot: string,
                            syntaxTreePanel: vscode.WebviewPanel,
                            blockRange: any) {
    
    if (syntaxTreePanel && !blockRange) {
        vscode.workspace.onDidChangeTextDocument(_.debounce(() => {
            syntaxTreePanel.webview.postMessage({
                command: "update",
                docUri: sourceRoot,
            });
        }, 100));
    }

    const displayHtml = render(sourceRoot, blockRange);
    syntaxTreePanel.webview.html = displayHtml;
    syntaxTreePanel.reveal();
}
