import { getComposerWebViewOptions, getLibraryWebViewContent, WebViewOptions } from "../utils";
import { FETCH_FULL_TREE_METHOD,
         FETCH_SUB_TREE_METHOD,
         FETCH_LOCATE_TREE_METHOD,
         ON_COLLAPSE_METHOD,
         MAP_TREE_GRAPH_METHOD,
         FULL_TREE_VIEW,
         SUB_TREE_VIEW } from "./resources/constant-resources";

export function render(sourceRoot: string, blockRange: any, activatedCommand: string)
    : string {

    const body = `
            <div class = "container">
                <div id = "treeBody" />
            </div>
    `;
    const bodyCss = ``;
    const styles = `
        .container {
            overflow-x: auto;
            position: relative;
            height: 100%;
            text-align: center;
            padding-bottom: 2%;
            padding-top: 2%;
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
                        docUri: msg.docUri;
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
                                if(!response.parseSuccess){
                                    document.getElementById("treeBody").innerHTML = errorMessage;
                                } else {
                                    return resolve(fetchTreeGraph(response));
                                }
                            });
                        } else {
                            webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(FETCH_LOCATE_TREE_METHOD)}, [docUri, blockRange], (response) => {
                                if(!response.parseSuccess || !response.syntaxTree.source){
                                    document.getElementById("treeBody").innerHTML = errorMessage;
                                } else {
                                    return resolve(fetchTreeGraph(response));
                                }
                            });
                        }
                    })
                }
            }

            function renderFullTree () {
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(FETCH_FULL_TREE_METHOD)}, [docUri], (response) => {
                        if(!response.parseSuccess || !response.syntaxTree.source){
                            document.getElementById("treeBody").innerHTML = errorMessage;
                        } else {
                            return resolve(fetchTreeGraph(response));
                        }
                    });
                })
            }

            function fetchTreeGraph(response){
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(MAP_TREE_GRAPH_METHOD)}, [response, activatedCommand], (result) => {
                        resolve(result);
                    });
                })
            }

            function collapseTree(nodeID, representationType){
                collapsedNode = nodeID;
                isGraphical = representationType;
                ballerinaComposer.renderSyntaxTree(activatedCommand, collapseTree, collapseNodes, switchFullTree, document.getElementById("treeBody"));
            }

            function switchFullTree(){
                activatedCommand = ${JSON.stringify(FULL_TREE_VIEW)};
                ballerinaComposer.renderSyntaxTree(activatedCommand, collapseTree, renderFullTree, switchFullTree, document.getElementById("treeBody"));
            }

            function collapseNodes(){
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod(${JSON.stringify(ON_COLLAPSE_METHOD)}, [collapsedNode, isGraphical], (response) => {
                        resolve(response);
                    });
                })
            }

            function initiateRendering(){
                ballerinaComposer.renderSyntaxTree(activatedCommand, collapseTree, renderTree, switchFullTree, document.getElementById("treeBody"));
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
