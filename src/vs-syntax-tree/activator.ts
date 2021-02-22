import * as vscode from "vscode";
import * as _ from "lodash";

import { BallerinaExtension, ExtendedLangClient } from "../core";
import { getCommonWebViewOptions, WebViewRPCHandler } from "../utils";
import { render } from "./renderer";
import { getRemoteMethods } from "./resources/remoteMethods";

let syntaxTreePanel: vscode.WebviewPanel;
let hasOpenWebview: boolean = false;
let activeEditor: vscode.TextEditor | undefined;

export function activate(ballerinaExtInstance: BallerinaExtension) {
    const context = <vscode.ExtensionContext> ballerinaExtInstance.context;
    const langClient = <ExtendedLangClient> ballerinaExtInstance.langClient;
    const syntaxTreeCommand = vscode.commands.registerCommand("ballerina.visualizeSyntaxTree", () => {
        ballerinaExtInstance.onReady()
        .then(() => {
            const { experimental } = langClient.initializeResult!.capabilities;
            const serverProvidesExamples = experimental && experimental.examplesProvider;

            if (!serverProvidesExamples) {
                ballerinaExtInstance.showMessageServerMissingCapability();
                return;
            } else if (!vscode.window.activeTextEditor ||
                !vscode.window.activeTextEditor.document.fileName.endsWith(".bal")) {
                vscode.window.showWarningMessage("Syntax Tree Extension: Ballerina Source file has not been detected.");
                return;
            } else {
                if (hasOpenWebview && !evaluateTreeRetrieval()) {
                    syntaxTreePanel.reveal();
                    return;
                } else if (!hasOpenWebview) {
                    createSyntaxTreePanel(langClient);
                }
                visualizeSyntaxTree(context, langClient, vscode.window.activeTextEditor.document.uri.path);
            }
        })
        .catch((e) => {
            if (!ballerinaExtInstance.isValidBallerinaHome()) {
                ballerinaExtInstance.showMessageInvalidBallerinaHome();
            } else {
                ballerinaExtInstance.showPluginActivationError();
            }
        });
    });

    context.subscriptions.push(syntaxTreeCommand);
}

function createSyntaxTreePanel(langClient: ExtendedLangClient) {
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

function visualizeSyntaxTree(context: vscode.ExtensionContext, langClient: ExtendedLangClient, sourceRoot: string) {
    vscode.workspace.onDidChangeTextDocument(_.debounce(() => {
        if (syntaxTreePanel){
            syntaxTreePanel.webview.postMessage({
                command: "update",
                docUri: sourceRoot
            });
        }
    }, 100));

    const displayHtml = render(sourceRoot);
    syntaxTreePanel.webview.html = displayHtml;
    syntaxTreePanel.reveal();
}

function evaluateTreeRetrieval() {
    if (syntaxTreePanel) {
        if (activeEditor && vscode.window.activeTextEditor &&
            activeEditor.document.uri === vscode.window.activeTextEditor.document.uri) {
            activeEditor = vscode.window.activeTextEditor;
            return false;
        } else {
            activeEditor = vscode.window.activeTextEditor;
            return true;
        }
    }
}
