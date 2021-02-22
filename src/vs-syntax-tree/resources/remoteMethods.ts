import * as vscode from "vscode";
import ELK from "elkjs/lib/elk.bundled";

import { ExtendedLangClient } from "../../core";
import { WebViewMethod } from "../../utils";
import { retrieveGraph, updateSyntaxTree } from "../tools/syntaxTreeGenerator";

const elk = new ELK();

export function getRemoteMethods (langClient: ExtendedLangClient) {
    const remoteMethods: WebViewMethod[] = [
        {
            methodName: "fetchSyntaxTree",
            handler: (args: any[]): Thenable<any> => {
                return langClient.getSyntaxTree(vscode.Uri.file(args[0]));
            }
        },
        {
            methodName: "fetchTreeGraph",
            handler: (args: any[]): Thenable<any> => {
                const response = retrieveGraph(args[0]);
                return evaluatePromise(response);
            }
        },
        {
            methodName: "onCollapseTree",
            handler: (args: any[]): Thenable<any> => {
                const response = updateSyntaxTree(args[0], args[1]);
                return evaluatePromise(response);
            }
        }
    ];

    return remoteMethods;
}

function evaluatePromise(mapGeneratorResponse: any) {
    const retrieveProps = new Promise((resolve, reject) => {
        elk.layout(mapGeneratorResponse.treeGraph)
            .then((result) => {
                const props = {
                    treeGraph: result,
                    treeArray: mapGeneratorResponse.syntaxTreeObj
                };
                resolve(props);
            })

            .catch((e) => {
                console.log("Syntax Tree Extension : Oops! Something went wrong!", e);
                reject(e);
            });
    });

    return retrieveProps;
}
