"use strict";

import { BAL_HOME } from "./preferences";

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
export const INVALID_HOME_MSG: string = "Ballerina Home is invalid, please check `" + BAL_HOME + "` in settings";
export const INSTALL_BALLERINA: string = "Unable to auto detect ballerina in your environment. If you just installed Ballerina, you may need to restart VSCode." +
    " If not, please install Ballerina or configure `" + BAL_HOME + "` in settings.";
export const INSTALL_NEW_BALLERINA: string = " version of Ballerina VSCode extension only supports Ballerina v1.0.0-beta or later. If you just installed a new Ballerina version, you may need to restart VSCode. If not, please download and install the latest version or point `" + BAL_HOME + "` in settings to a latest Ballerina distribution.";
export const DOWNLOAD_BALLERINA: string = "https://ballerina.io/downloads/";
export const CONFIG_CHANGED: string = "Ballerina Compiler Toolkit plugin configuration changed. Please restart vscode for changes to take effect.";
export const OLD_BALLERINA_VERSION: string = "Your Ballerina version does not match the Ballerina VSCode plugin version. Some features may not work properly. Please download the latest Ballerina distribution.";
export const OLD_PLUGIN_VERSION: string = "Your Ballerina vscode plugin version does not match your Ballerina version. Some features may not work properly. Please update the Ballerina vscode plugin.";
export const INVALID_FILE: string = "The current file is not a valid ballerina file. Please open a ballerina file and try again.";
export const UNKNOWN_ERROR: string = "Unknown Error : Failed to start Ballerina Compiler Toolkit Plugin.";
export const SELECTION_NOT_FOUND: string = "Code block has not been detected for visualization.";
export const COMMAND_NOT_FOUND = "command not found";
export const NO_SUCH_FILE = "No such file or directory";
export const ERROR = "Error:";
