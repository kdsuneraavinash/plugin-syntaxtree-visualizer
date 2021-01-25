import { ExtendedLangClient } from '../core/extended-language-client';
import { ExtensionContext } from 'vscode';
import { getLibraryWebViewContent, WebViewOptions, getComposerWebViewOptions } from '../utils';

export function render(context: ExtensionContext, langClient: ExtendedLangClient, sourceRoot: string)
    : string {

    const body = `
            <div class="container">
                <div id="treeBody" />
            </div>
    `;
    const bodyCss = ``;
    const styles = `
        .container {
            overflow-x: auto;
            position: relative;
            height: 100%;
            text-align: center;
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
                    webViewRPCHandler.invokeRemoteMethod('fetchSyntaxTree', [docUri], (response) => {
                        if(!response.parseSuccess){
                            document.getElementById("treeBody").innerHTML = "Oops! Something went wrong!";
                        }
                        else {
                            webViewRPCHandler.invokeRemoteMethod('fetchTreeGraph', [response], (result) => {
                                resolve(result);
                            });
                        }
                    });
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
