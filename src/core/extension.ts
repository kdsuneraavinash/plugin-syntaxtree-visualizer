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

import {
    workspace, window, commands, Uri,
    ConfigurationChangeEvent, extensions,
    Extension, ExtensionContext, WebviewPanel, OutputChannel
} from "vscode";
import {
    INVALID_HOME_MSG, INSTALL_BALLERINA, DOWNLOAD_BALLERINA, MISSING_SERVER_CAPABILITY, ERROR, COMMAND_NOT_FOUND, NO_SUCH_FILE,
    CONFIG_CHANGED, OLD_BALLERINA_VERSION, OLD_PLUGIN_VERSION, UNKNOWN_ERROR, INVALID_FILE, INSTALL_NEW_BALLERINA,
} from "./messages";
import * as path from 'path';
import { exec, spawnSync } from 'child_process';
import { LanguageClientOptions, State as LS_STATE, RevealOutputChannelOn, ServerOptions } from "vscode-languageclient";
import { getServerOptions } from '../server/server';
import { ExtendedLangClient } from './extended-language-client';
import { log, getOutputChannel } from '../utils/index';
import { AssertionError } from "assert";
import { OVERRIDE_BALLERINA_HOME, BALLERINA_HOME } from "./preferences";
const any = require('promise.any');

const SWAN_LAKE_REGEX = /(s|S)wan( |-)(l|L)ake/g;
const PREV_REGEX = /1\.2\.[0-9]+/g;

export const EXTENSION_ID = 'ballerinaCompilerTools.ballerinacompilertools';

export interface ConstructIdentifier {
    sourceRoot?: string;
    filePath?: string;
    moduleName: string;
    constructName: string;
    subConstructName?: string;
    startLine?: number;
    startColumn?: number;
}

export class BallerinaExtension {
    public ballerinaHome: string;
    public ballerinaCmd: string;
    public isSwanLake: boolean;
    public is12x: boolean;
    public extension: Extension<any>;
    private clientOptions: LanguageClientOptions;
    public langClient?: ExtendedLangClient;
    public context?: ExtensionContext;

    private webviewPanels: {
        [name: string]: WebviewPanel;
    };

    constructor() {
        this.ballerinaHome = '';
        this.ballerinaCmd = '';
        this.webviewPanels = {};
        this.isSwanLake = false;
        this.is12x = false;
        // Load the extension
        this.extension = extensions.getExtension(EXTENSION_ID)!;
        this.clientOptions = {
            documentSelector: [{ scheme: 'file', language: 'ballerina' }],
            synchronize: { configurationSection: 'ballerinaCompilerTools' },
            outputChannel: getOutputChannel(),
            revealOutputChannelOn: RevealOutputChannelOn.Never,
            initializationOptions: {
                skipExecuteCommandProvider: true
            }
        };
    }

    setContext(context: ExtensionContext) {
        this.context = context;
    }

    init(onBeforeInit: Function): Promise<void> {
        try {
            // Register pre init handlers.
            this.registerPreInitHandlers();

            // Check if ballerina home is set.
            if (this.overrideBallerinaHome()) {
                if (!this.overrideBallerinaHome()) {
                    throw new AssertionError({
                        message: "Trying to get ballerina version without setting ballerina home."
                    });
                }

                log("Ballerina home is configured in settings.");
                this.ballerinaHome = this.getConfiguredBallerinaHome();
            }

            // Validate the ballerina version.
            const pluginVersion = this.extension.packageJSON.version.split('-')[0];
            return this.getBallerinaVersion(this.ballerinaHome, this.overrideBallerinaHome()).then(ballerinaVersion => {
                ballerinaVersion = ballerinaVersion.split('-')[0];
                if (!this.overrideBallerinaHome()) {
                    const { home } = this.autoDetectBallerinaHome();
                    this.ballerinaHome = home;
                }
                log(`Plugin version: ${pluginVersion}\nBallerina version: ${ballerinaVersion}`);

                if (ballerinaVersion.match(SWAN_LAKE_REGEX)) {
                    this.isSwanLake = true;
                } else if (ballerinaVersion.match(PREV_REGEX)) {
                    this.is12x = true;
                }

                if (!this.isSwanLake && !this.is12x) {
                    this.showMessageOldBallerina();
                    throw new AssertionError({
                        message: `Ballerina version ${ballerinaVersion} is not supported. Please use a compatible VSCode extension version.`
                    });
                }

                // if Home is found load Language Server.
                let serverOptions: ServerOptions;
                serverOptions = getServerOptions(this.ballerinaCmd);

                this.langClient = new ExtendedLangClient('ballerina-compiler-tools', 'BallerinaCompiler Tools LS Client', serverOptions,
                    this.clientOptions, false);
                onBeforeInit(this.langClient);

                // Following was put in to handle server startup failures.
                const disposeDidChange = this.langClient.onDidChangeState(stateChangeEvent => {
                    if (stateChangeEvent.newState === LS_STATE.Stopped) {
                        log("Couldn't establish language server connection.");
                        this.showPluginActivationError();
                    }
                });

                let disposable = this.langClient.start();

                this.langClient.onReady().then(fulfilled => {
                    disposeDidChange.dispose();
                    this.context!.subscriptions.push(disposable);
                });
            }, (reason) => {
                throw new Error(reason);
            }).catch(e => {
                const msg = `Error when checking ballerina version. ${e.message}`;
                throw new Error(msg);
            });
        } catch (ex) {
            const msg = "Error while activating plugin. " + (ex.message ? ex.message : ex);
            // If any failure occurs while initializing show an error message
            this.showPluginActivationError();
            return Promise.reject(msg);
        }
    }

    onReady(): Promise<void> {
        if (!this.langClient) {
            return Promise.reject('BallerinaExtension is not initialized');
        }

        return this.langClient.onReady();
    }

    showPluginActivationError(): any {
        // message to display on Unknown errors.
        // ask to enable debug logs.
        // we can ask the user to report the issue.

        window.showErrorMessage(UNKNOWN_ERROR);
    }

    registerPreInitHandlers(): any {
        // We need to restart VSCode if we change plugin configurations.
        workspace.onDidChangeConfiguration((params: ConfigurationChangeEvent) => {
            if (params.affectsConfiguration(BALLERINA_HOME) ||
                params.affectsConfiguration(OVERRIDE_BALLERINA_HOME)) {
                this.showMsgAndRestart(CONFIG_CHANGED);
            }
        });
    }

    showMsgAndRestart(msg: string): void {
        const action = 'Restart Now';
        window.showInformationMessage(msg, action).then((selection) => {
            if (action === selection) {
                commands.executeCommand('workbench.action.reloadWindow');
            }
        });
    }

    /**
     * Compares plugin's versions with the used ballerina distribution's version
     * Uses only the major and minor versions according to the semver spec.
     * First two numbers will be used when version string is not semver (eg. 0.990-r1)
     * Returns 1 if plugin version is higher than ballerina's; -1 if plugin version is lower
     * than ballerina's; 0 if the versions match.
     *
     * @returns {number}
     */
    compareVersions(pluginVersion: string, ballerinaVersion: string, comparePatchVer: boolean = false): number {
        const toInt = (i: string) => {
            return parseInt(i, 10);
        };
        const numMatchRegexp = /\d+/g;

        const [pluginMajor, pluginMinor, pluginPatch] = pluginVersion.match(numMatchRegexp)!.map(toInt);
        const [ballerinaMajor, ballerinaMinor, ballerinaPatch] = ballerinaVersion.match(numMatchRegexp)!.map(toInt);

        if (pluginMajor > ballerinaMajor) {
            return 1;
        }

        if (pluginMajor < ballerinaMajor) {
            return -1;
        }

        if (pluginMinor > ballerinaMinor) {
            return 1;
        }

        if (pluginMinor < ballerinaMinor) {
            return -1;
        }

        if (comparePatchVer) {
            if (pluginPatch > ballerinaPatch) {
                return 1;
            }

            if (pluginPatch < ballerinaPatch) {
                return -1;
            }
        }

        return 0;
    }

    async getBallerinaVersion(ballerinaHome: string, overrideBallerinaHome: boolean): Promise<string> {
        // if ballerina home is overridden, use ballerina cmd inside distribution
        // otherwise use wrapper command
        let distPath = "";
        if (overrideBallerinaHome) {
            distPath = path.join(ballerinaHome, "bin") + path.sep;
        }
        let exeExtension = "";
        if (process.platform === 'win32') {
            exeExtension = ".bat";
        }

        let ballerinaExecutor = '';
        const balPromise: Promise<string> = new Promise((resolve, reject) => {
            exec(distPath + 'bal' + exeExtension + ' version', (err, stdout, _stderr) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (stdout.length === 0 || stdout.startsWith(ERROR) || stdout.includes(NO_SUCH_FILE) || stdout.includes(COMMAND_NOT_FOUND)) {
                    reject(stdout);
                    return;
                }

                ballerinaExecutor = 'bal';
                log(`'bal' command is picked up from the plugin.`);
                resolve(stdout);
            });
        });
        const ballerinaPromise: Promise<string> = new Promise((resolve, reject) => {
            exec(distPath + 'ballerina' + exeExtension + ' version', (err, stdout, _stderr) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (stdout.length === 0 || stdout.startsWith(ERROR) || stdout.includes(NO_SUCH_FILE) || stdout.includes(COMMAND_NOT_FOUND)) {
                    reject(stdout);
                    return;
                }

                ballerinaExecutor = 'ballerina';
                log(`'ballerina' command is picked up from the plugin.`);
                resolve(stdout);
            });
        });
        const cmdOutput = await any([balPromise, ballerinaPromise]);
        this.ballerinaCmd = distPath + ballerinaExecutor + exeExtension;
        try {
            const implVersionLine = cmdOutput.split('\n')[0];
            const replacePrefix = implVersionLine.startsWith("jBallerina")
                ? /jBallerina /
                : /Ballerina /;
            const parsedVersion = implVersionLine.replace(replacePrefix, '').replace(/[\n\t\r]/g, '');
            return Promise.resolve(parsedVersion);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    showMessageInstallBallerina(): any {
        const download: string = 'Download';
        const openSettings: string = 'Open Settings';
        const viewLogs: string = 'View Logs';
        window.showWarningMessage(INSTALL_BALLERINA, download, openSettings, viewLogs).then((selection) => {
            if (openSettings === selection) {
                commands.executeCommand('workbench.action.openGlobalSettings');
            } else if (download === selection) {
                commands.executeCommand('vscode.open', Uri.parse(DOWNLOAD_BALLERINA));
            } else if (viewLogs === selection) {
                const balOutput = ballerinaExtInstance.getOutPutChannel();
                if (balOutput) {
                    balOutput.show();
                }
            }

        });
    }

    showMessageInstallLatestBallerina(): any {
        const download: string = 'Download';
        const openSettings: string = 'Open Settings';
        const viewLogs: string = 'View Logs';
        window.showWarningMessage(ballerinaExtInstance.getVersion() + INSTALL_NEW_BALLERINA, download, openSettings, viewLogs).then((selection) => {
            if (openSettings === selection) {
                commands.executeCommand('workbench.action.openGlobalSettings');
            }
            if (download === selection) {
                commands.executeCommand('vscode.open', Uri.parse(DOWNLOAD_BALLERINA));
            } else if (viewLogs === selection) {
                const balOutput = ballerinaExtInstance.getOutPutChannel();
                if (balOutput) {
                    balOutput.show();
                }
            }
        });
    }

    showMessageInvalidBallerinaHome(): void {
        const action = 'Open Settings';
        window.showWarningMessage(INVALID_HOME_MSG, action).then((selection) => {
            if (action === selection) {
                commands.executeCommand('workbench.action.openGlobalSettings');
            }
        });
    }

    showMessageOldBallerina(): any {
        const download: string = 'Download';
        window.showWarningMessage(OLD_BALLERINA_VERSION, download).then((selection) => {
            if (download === selection) {
                commands.executeCommand('vscode.open', Uri.parse(DOWNLOAD_BALLERINA));
            }
        });
    }

    showMessageOldPlugin(): any {
        const download: string = 'Download';
        window.showWarningMessage(OLD_PLUGIN_VERSION, download).then((selection) => {
            if (download === selection) {
                commands.executeCommand('vscode.open', Uri.parse(DOWNLOAD_BALLERINA));
            }
        });
    }

    showMessageServerMissingCapability(): any {
        const download: string = 'Download';
        window.showErrorMessage(MISSING_SERVER_CAPABILITY, download).then((selection) => {
            if (download === selection) {
                commands.executeCommand('vscode.open', Uri.parse(DOWNLOAD_BALLERINA));
            }
        });
    }

    showMessageInvalidFile(): any {
        window.showErrorMessage(INVALID_FILE);
    }

    /**
     * Get ballerina home path.
     *
     * @returns {string}
     * @memberof BallerinaExtension
     */
    getBallerinaHome(): string {
        return this.ballerinaHome;
    }

    /**
     * Get ballerina home path configured in preferences.
     *
     * @returns {string}
     * @memberof BallerinaExtension
     */
    getConfiguredBallerinaHome(): string {
        return <string>workspace.getConfiguration().get(BALLERINA_HOME);
    }

    autoDetectBallerinaHome(): { home: string, isOldBallerinaDist: boolean, isBallerinaNotFound: boolean } {
        let balHomeOutput = "",
            isBallerinaNotFound = false,
            isOldBallerinaDist = false;
        try {
            let response = spawnSync(this.ballerinaCmd, ['home']);
            if (response.stdout.length > 0) {
                balHomeOutput = response.stdout.toString().trim();
            } else if (response.stderr.length > 0) {
                let message = response.stderr.toString();
                // ballerina is installed, but ballerina home command is not found
                isOldBallerinaDist = message.includes("bal: unknown command 'home'");
                // ballerina is not installed
                isBallerinaNotFound = message.includes('command not found')
                    || message.includes('unknown command')
                    || message.includes('is not recognized as an internal or external command');
                log("Error executing `bal home`. " + "\n<---- cmd output ---->\n"
                    + message + "<---- cmd output ---->\n");
            }

            // specially handle unknown ballerina command scenario for windows
            if (balHomeOutput === "" && process.platform === "win32") {
                isOldBallerinaDist = true;
            }
        } catch ({ message }) {
            // ballerina is installed, but ballerina home command is not found
            isOldBallerinaDist = message.includes("bal: unknown command 'home'");
            // ballerina is not installed
            isBallerinaNotFound = message.includes('command not found')
                || message.includes('unknown command')
                || message.includes('is not recognized as an internal or external command');
            log("Error executing `bal home`. " + "\n<---- cmd output ---->\n"
                + message + "<---- cmd output ---->\n");
        }

        return {
            home: isBallerinaNotFound || isOldBallerinaDist ? '' : balHomeOutput,
            isBallerinaNotFound,
            isOldBallerinaDist
        };
    }

    public overrideBallerinaHome(): boolean {
        return <boolean>workspace.getConfiguration().get(OVERRIDE_BALLERINA_HOME);
    }

    public addWebviewPanel(name: string, panel: WebviewPanel) {
        this.webviewPanels[name] = panel;

        panel.onDidDispose(() => {
            delete this.webviewPanels[name];
        });
    }

    public getWebviewPanels() {
        return this.webviewPanels;
    }

    public getID(): string {
        return this.extension.id;
    }

    public getVersion(): string {
        return this.extension.packageJSON.version;
    }

    public getOutPutChannel(): OutputChannel | undefined {
        return getOutputChannel();
    }
}

export const ballerinaExtInstance = new BallerinaExtension();
