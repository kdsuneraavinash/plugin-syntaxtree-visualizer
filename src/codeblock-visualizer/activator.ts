import * as vscode from 'vscode';

import * as _ from 'lodash';
import { ExtendedLangClient } from '../core/extended-language-client';
import { BallerinaExtension } from '../core';
let activeEditor: vscode.TextEditor;

function validateForVisualization(context: vscode.ExtensionContext, langClient: ExtendedLangClient) :void {    
    if (vscode.window.activeTextEditor){
        activeEditor = vscode.window.activeTextEditor;

        if (!activeEditor.document.fileName.endsWith('.bal')){
            vscode.window.showErrorMessage("Syntax Tree Extension: Please open a Ballerina source file.");
        }
        else {
            let range = vscode.window.activeTextEditor.selection;
            console.log("%%%%%%%%%%%%%%%%%%");
            console.log(range);
        }
    }    
    else {
        vscode.window.showWarningMessage("Syntax Tree Extension: Source file has not been detected.");
    }
   
}

export function activate(ballerinaExtInstance: BallerinaExtension) {
    const context = <vscode.ExtensionContext> ballerinaExtInstance.context;
    const langClient = <ExtendedLangClient> ballerinaExtInstance.langClient;
    const syntaxTreeCommand = vscode.commands.registerCommand('ballerina.codeBlockVisualizer', () => {
        ballerinaExtInstance.onReady()
        .then(() => {
            const { experimental } = langClient.initializeResult!.capabilities;
            const serverProvidesExamples = experimental && experimental.examplesProvider;

            if (!serverProvidesExamples) {
                ballerinaExtInstance.showMessageServerMissingCapability();
                return;
            }

            validateForVisualization(context, langClient);
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
