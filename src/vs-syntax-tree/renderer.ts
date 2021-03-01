import { getComposerWebViewOptions, getLibraryWebViewContent, WebViewOptions } from "../utils";

export function render(sourceRoot: string, blockRange: any)
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
            let collapsedNode = "";
            let isGraphical = false;
            let errorMessage = "<h3>Oops! Something went wrong! :(</h3>";

            window.addEventListener('message', event => {
                let msg = event.data;
                switch(msg.command){
                    case 'update':
                        docUri: msg.docUri;
                        initiateRendering();
                }
            });

            function renderTree(){
                return new Promise((resolve, reject) => {
                    if (!${JSON.stringify(blockRange)}) {
                        webViewRPCHandler.invokeRemoteMethod('fetchSyntaxTree', [docUri], (response) => {
                            if(!response.parseSuccess || !response.syntaxTree.source){
                                document.getElementById("treeBody").innerHTML = errorMessage;
                            }
                            else {
                                webViewRPCHandler.invokeRemoteMethod('fetchTreeGraph', [response], (result) => {
                                    resolve(result);
                                });
                            }
                        });
                    } else {
                        webViewRPCHandler.invokeRemoteMethod('fetchSubTree', [docUri, ${JSON.stringify(blockRange)}], (response) => {
                            if(!response.parseSuccess){
                                document.getElementById("treeBody").innerHTML = errorMessage;
                            }
                            else {
                                webViewRPCHandler.invokeRemoteMethod('fetchTreeGraph', [response], (result) => {
                                    resolve(result);
                                });
                            }
                        });
                    }
                })
            }

            function collapseTree(nodeID, representationType){
                collapsedNode = nodeID;
                isGraphical = representationType;
                ballerinaComposer.renderSyntaxTree(collapseTree, collapseNodes, document.getElementById("treeBody"));
            }

            function collapseNodes(){
                return new Promise((resolve, reject) => {
                    webViewRPCHandler.invokeRemoteMethod('onCollapseTree', [collapsedNode, isGraphical], (response) => {
                        resolve(response);
                    });
                })
            }

            function initiateRendering(){
                ballerinaComposer.renderSyntaxTree(collapseTree, renderTree, document.getElementById("treeBody"));
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
