'use strict';
/**
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
import { ExtensionContext, commands, window, Location, Uri, workspace } from 'vscode';
import { ballerinaExtInstance } from './core';
import { activate as activateSyntaxTree } from './vs-syntax-tree';
import { StaticFeature, ClientCapabilities, DocumentSelector, ServerCapabilities, DidChangeConfigurationParams } from 'vscode-languageclient';
import { ExtendedLangClient } from './core/extended-language-client';
import { log } from './utils';

// TODO initializations should be contributions from each component
function onBeforeInit(langClient: ExtendedLangClient) {
    class TraceLogsFeature implements StaticFeature {
        fillClientCapabilities(capabilities: ClientCapabilities): void {
            capabilities.experimental = capabilities.experimental || {};
            capabilities.experimental.introspection = true;
        }
        initialize(capabilities: ServerCapabilities, documentSelector: DocumentSelector | undefined): void {
        }
    }

    class ShowFileFeature implements StaticFeature {
        fillClientCapabilities(capabilities: ClientCapabilities): void {
            capabilities.experimental = capabilities.experimental || {};
            capabilities.experimental.showTextDocument = true;
        }
        initialize(capabilities: ServerCapabilities, documentSelector: DocumentSelector | undefined): void {
        }
    }

    class SyntaxHighlightingFeature implements StaticFeature {
        fillClientCapabilities(capabilities: ClientCapabilities): void {
            capabilities.experimental = capabilities.experimental || {};
            capabilities.experimental.semanticSyntaxHighlighter = false;
        }
        initialize(capabilities: ServerCapabilities, documentSelector: DocumentSelector | undefined): void {
        }
    }

    langClient.registerFeature(new TraceLogsFeature());
    langClient.registerFeature(new ShowFileFeature());
    langClient.registerFeature(new SyntaxHighlightingFeature());
}

export function activate(context: ExtensionContext): Promise<any> {
    ballerinaExtInstance.setContext(context);
    return ballerinaExtInstance.init(onBeforeInit).then(() => {
        // start the features.
        activateSyntaxTree(ballerinaExtInstance);

        ballerinaExtInstance.onReady().then(() => {
            const langClient = <ExtendedLangClient>ballerinaExtInstance.langClient;
            // Send initial configuration without 'ballerina' field to support older SDK versions below 1.2.0
            if (!ballerinaExtInstance.isNewConfigChangeSupported) {
                const args: DidChangeConfigurationParams = {
                    settings: workspace.getConfiguration('ballerina'),
                };
                langClient.sendNotification("workspace/didChangeConfiguration", args);
            }
            // Register showTextDocument listener
            langClient.onNotification('window/showTextDocument', (location: Location) => {
                if (location.uri !== undefined) {
                    window.showTextDocument(Uri.parse(location.uri.toString()), { selection: location.range });
                }
            });
        });
    }).catch((e) => {
        log("Failed to activate Ballerina extension. " + (e.message ? e.message : e));
        // When plugins fails to start, provide a warning upon each command execution
        if (!ballerinaExtInstance.langClient) {
            const cmds: any[] = ballerinaExtInstance.extension.packageJSON.contributes.commands;
            cmds.forEach((cmd) => {
                const cmdID: string = cmd.command;
                commands.registerCommand(cmdID, () => {
                    const actionViewLogs = "View Logs";
                    window.showWarningMessage("Ballerina extension did not start properly."
                        + " Please check extension logs for more info.", actionViewLogs)
                        .then((action) => {
                            if (action === actionViewLogs) {
                                const logs = ballerinaExtInstance.getOutPutChannel();
                                if (logs) {
                                    logs.show();
                                }
                            }
                        });

                });
            });
        }
    });
}
