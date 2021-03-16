import { getComposerWebViewOptions, getLibraryWebViewContent, WebViewOptions } from "../utils";
import { FETCH_FULL_TREE_METHOD,
         FETCH_SUB_TREE_METHOD,
         FETCH_LOCATE_TREE_METHOD,
         ON_COLLAPSE_METHOD,
         MAP_TREE_GRAPH_METHOD,
         FULL_TREE_VIEW,
         SUB_TREE_VIEW } from "./resources/constant-resources";

export function render(sourceRoot: string, blockRange: any, activatedCommand: string) : string {
    const body = `
            <div class = "container">
                <div id = "treeBody" />
            </div>
    `;
    const bodyCss = ``;
    const styles = `
        .container {
            overflow-x: auto;
            height: 100%;
            margin-top: 15px;
            text-align: center;
        }

        #treeBody {
            display: inline-block;
            position: relative;
        }
    `;
    const scripts = `
        function loadedScript() {
            let docUri = ${JSON.stringify(sourceRoot)};
            let blockRange = ${JSON.stringify(blockRange)};
            let activatedCommand = ${JSON.stringify(activatedCommand)};
            let collapsedNode = "";
            let isGraphical = false;
            let errorMessage = "<h3> Ooops! Something went wrong! :(</h3>";

            window.addEventListener('message', event => {
                let msg = event.data;
                switch(msg.command){
                    case 'update':
                        docUri = msg.docUri;
                        activatedCommand = ${JSON.stringify(FULL_TREE_VIEW)};
                        initiateRendering();
                }
            });

            function renderTree(){
                if (activatedCommand == ${JSON.stringify(FULL_TREE_VIEW)}) {
                    return renderFullTree();
                } else {
                    return new Promise((resolve, reject) => {
                        if (activatedCommand == ${JSON.stringify(SUB_TREE_VIEW)}) {
                            webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(FETCH_SUB_TREE_METHOD)}, [docUri, blockRange], (response) => {
                                return resolve(fetchTreeGraph(response));
                            });
                        } else {
                            webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(FETCH_LOCATE_TREE_METHOD)}, [docUri, blockRange], (response) => {
                                return resolve(fetchTreeGraph(response));
                            });
                        }
                    })
                }
            }

            function renderFullTree () {
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(FETCH_FULL_TREE_METHOD)}, [docUri], (response) => {
                        return resolve(fetchTreeGraph(response));
                    });
                })
            }

            function fetchTreeGraph(response){
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(MAP_TREE_GRAPH_METHOD)}, [response, activatedCommand], (result) => {
                        if(!response.parseSuccess || !response.syntaxTree.source){
                            document.getElementById("treeBody").innerHTML = errorMessage;
                        } else {
                            resolve(result);
                        }
                    });
                })
            }

            function findNode (position) {
                vscode.postMessage({
                    command: 'findNode',
                    position: position
                })
            }

            function switchFullTree(){
                activatedCommand = ${JSON.stringify(FULL_TREE_VIEW)};
                vscode.postMessage({
                    command: 'switchView',
                    didSwitch: true
                })
                ballerinaComposer.renderSyntaxTree(activatedCommand, findNode, collapseTree, renderFullTree, switchFullTree, document.getElementById("treeBody"));
            }

            function collapseNodes(){
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(ON_COLLAPSE_METHOD)}, [collapsedNode, isGraphical], (response) => {
                        resolve(response);
                    });
                })
            }

            function collapseTree(nodeID, representationType){
                collapsedNode = nodeID;
                isGraphical = representationType;
                ballerinaComposer.renderSyntaxTree(activatedCommand, findNode, collapseTree, collapseNodes, switchFullTree, document.getElementById("treeBody"));
            }

            function initiateRendering(){
                ballerinaComposer.renderSyntaxTree(activatedCommand, findNode, collapseTree, renderTree, switchFullTree, document.getElementById("treeBody"));
            }

            initiateRendering();
        }
    `;

    const webViewOptions: WebViewOptions = {
        ...getComposerWebViewOptions(),
        body, scripts, styles, bodyCss
    };

    return getLibraryWebViewContent(webViewOptions);
}
