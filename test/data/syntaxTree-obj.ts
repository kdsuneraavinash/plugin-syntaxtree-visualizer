export const syntaxTreeObj: any = {
   "syntaxTree": {
      "imports": [],
      "members": [
         {
            "kind": "FunctionDefinition",
            "qualifierList": [],
            "functionKeyword": {
               "kind": "FunctionKeyword",
               "isToken": true,
               "value": "function",
               "isMissing": false,
               "position": {
                  "startLine": 0,
                  "startColumn": 0,
                  "endLine": 0,
                  "endColumn": 8
               },
               "invalidNodes": [],
               "leadingMinutiae": [],
               "trailingMinutiae": [
                  {
                     "kind": "WHITESPACE_MINUTIAE",
                     "minutiae": " "
                  }
               ]
            },
            "functionName": {
               "kind": "IdentifierToken",
               "isToken": true,
               "value": "testFunction",
               "isMissing": false,
               "position": {
                  "startLine": 0,
                  "startColumn": 9,
                  "endLine": 0,
                  "endColumn": 21
               },
               "invalidNodes": [],
               "leadingMinutiae": [],
               "trailingMinutiae": []
            },
            "relativeResourcePath": [],
            "functionSignature": {
               "kind": "FunctionSignature",
               "openParenToken": {
                  "kind": "OpenParenToken",
                  "isToken": true,
                  "value": "(",
                  "isMissing": false,
                  "position": {
                     "startLine": 0,
                     "startColumn": 21,
                     "endLine": 0,
                     "endColumn": 22
                  },
                  "invalidNodes": [],
                  "leadingMinutiae": [],
                  "trailingMinutiae": []
               },
               "parameters": [],
               "closeParenToken": {
                  "kind": "CloseParenToken",
                  "isToken": true,
                  "value": ")",
                  "isMissing": false,
                  "position": {
                     "startLine": 0,
                     "startColumn": 22,
                     "endLine": 0,
                     "endColumn": 23
                  },
                  "invalidNodes": [],
                  "leadingMinutiae": [],
                  "trailingMinutiae": []
               },
               "source": "()",
               "syntaxDiagnostics": [],
               "leadingMinutiae": [],
               "trailingMinutiae": [],
               "position": {
                  "startLine": 0,
                  "startColumn": 21,
                  "endLine": 0,
                  "endColumn": 23
               },
               "typeData": {
                  "diagnostics": []
               },
               "invalidNodes": []
            },
            "functionBody": {
               "kind": "FunctionBodyBlock",
               "openBraceToken": {
                  "kind": "OpenBraceToken",
                  "isToken": true,
                  "value": "{",
                  "isMissing": false,
                  "position": {
                     "startLine": 0,
                     "startColumn": 25,
                     "endLine": 0,
                     "endColumn": 26
                  },
                  "invalidNodes": [
                     {
                        "kind": "INVALID_NODE_MINUTIAE",
                        "value": ")"
                     }
                  ],
                  "leadingMinutiae": [
                     {
                        "kind": "WHITESPACE_MINUTIAE",
                        "minutiae": " "
                     }
                  ],
                  "trailingMinutiae": [
                     {
                        "kind": "END_OF_LINE_MINUTIAE",
                        "minutiae": "\n"
                     }
                  ]
               },
               "statements": [],
               "closeBraceToken": {
                  "kind": "CloseBraceToken",
                  "isToken": true,
                  "value": "}",
                  "isMissing": true,
                  "position": {
                     "startLine": 1,
                     "startColumn": 0,
                     "endLine": 1,
                     "endColumn": 0
                  },
                  "invalidNodes": [],
                  "leadingMinutiae": [],
                  "trailingMinutiae": []
               },
               "source": ") {\n",
               "syntaxDiagnostics": [
                  {
                     "message": "invalid token ')'",
                     "diagnosticInfo": {
                        "code": "BCE0600",
                        "severity": "ERROR"
                     }
                  },
                  {
                     "message": "missing close brace token",
                     "diagnosticInfo": {
                        "code": "BCE0007",
                        "severity": "ERROR"
                     }
                  }
               ],
               "leadingMinutiae": [
                  {
                     "kind": "WHITESPACE_MINUTIAE",
                     "minutiae": " "
                  }
               ],
               "trailingMinutiae": [],
               "position": {
                  "startLine": 0,
                  "startColumn": 25,
                  "endLine": 0,
                  "endColumn": 26
               },
               "typeData": {
                  "diagnostics": [
                     {
                        "message": "invalid token ')'",
                        "diagnosticInfo": {
                           "code": "BCE0600",
                           "severity": "ERROR"
                        }
                     }
                  ]
               },
               "invalidNodes": [
                  {
                     "kind": "INVALID_NODE_MINUTIAE",
                     "value": ")"
                  }
               ]
            },
            "source": "function testFunction()) {\n",
            "syntaxDiagnostics": [
               {
                  "message": "invalid token ')'",
                  "diagnosticInfo": {
                     "code": "BCE0600",
                     "severity": "ERROR"
                  }
               },
               {
                  "message": "missing close brace token",
                  "diagnosticInfo": {
                     "code": "BCE0007",
                     "severity": "ERROR"
                  }
               }
            ],
            "leadingMinutiae": [],
            "trailingMinutiae": [],
            "position": {
               "startLine": 0,
               "startColumn": 0,
               "endLine": 0,
               "endColumn": 26
            },
            "typeData": {
               "symbol": {
                  "external": false,
                  "name": "testFunction",
                  "moduleID": {
                     "orgName": "$anon",
                     "moduleName": ".",
                     "version": "0.0.0"
                  },
                  "deprecated": false,
                  "kind": "FUNCTION"
               },
               "diagnostics": [
                  {
                     "message": "invalid token ')'",
                     "diagnosticInfo": {
                        "code": "BCE0600",
                        "severity": "ERROR"
                     }
                  }
               ]
            },
            "invalidNodes": []
         }
      ],
      "eofToken": {
         "kind": "EofToken",
         "isToken": true,
         "value": "",
         "isMissing": false,
         "position": {
            "startLine": 2,
            "startColumn": 0,
            "endLine": 2,
            "endColumn": 0
         },
         "invalidNodes": [],
         "leadingMinutiae": [
            {
               "kind": "END_OF_LINE_MINUTIAE",
               "minutiae": "\n"
            }
         ],
         "trailingMinutiae": []
      },
      "source": "function testFunction()) {\n\n",
      "kind": "ModulePart",
      "syntaxDiagnostics": [
         {
            "message": "invalid token ')'",
            "diagnosticInfo": {
               "code": "BCE0600",
               "severity": "ERROR"
            }
         },
         {
            "message": "missing close brace token",
            "diagnosticInfo": {
               "code": "BCE0007",
               "severity": "ERROR"
            }
         }
      ],
      "leadingMinutiae": [],
      "trailingMinutiae": [],
      "position": {
         "startLine": 0,
         "startColumn": 0,
         "endLine": 2,
         "endColumn": 0
      },
      "typeData": {
         "diagnostics": [
            {
               "message": "missing close brace token",
               "diagnosticInfo": {
                  "code": "BCE0007",
                  "severity": "ERROR"
               }
            }
         ]
      }
   },
   "source": "function testFunction()) {\n\n",
   "parseSuccess": true
};

export const resultObj = [
   {
      "nodeID": "p0",
      "leadingMinutiae": [],
      "trailingMinutiae": [],
      "didCollapse": true,
      "children": [
         {
            "nodeID": "p1",
            "parentID": "p0",
            "didCollapse": true,
            "children": [],
            "diagnostics": [],
            "value": "imports",
            "kind": "imports",
            "leadingMinutiae": undefined,
            "trailingMinutiae": undefined
         },
         {
            "nodeID": "p2",
            "leadingMinutiae": [],
            "trailingMinutiae": [],
            "parentID": "p0",
            "didCollapse": false,
            "children": [
               {
                  "nodeID": "p3",
                  "leadingMinutiae": [],
                  "trailingMinutiae": [],
                  "parentID": "p2",
                  "didCollapse": false,
                  "children": [
                     {
                        "nodeID": "p4",
                        "parentID": "p3",
                        "didCollapse": false,
                        "children": [],
                        "diagnostics": [],
                        "value": "qualifierList",
                        "kind": "qualifierList",
                        "leadingMinutiae": undefined,
                        "trailingMinutiae": undefined
                     },
                     {
                        "nodeID": "c5",
                        "value": "function",
                        "parentID": "p3",
                        "children": [],
                        "kind": "FunctionKeyword",
                        "leadingMinutiae": [],
                        "trailingMinutiae": [
                           {
                              "kind": "WHITESPACE_MINUTIAE",
                              "minutiae": " "
                           }
                        ],
                        "errorNode": false,
                        "diagnostics": []
                     },
                     {
                        "nodeID": "c6",
                        "value": "testFunction",
                        "parentID": "p3",
                        "children": [],
                        "kind": "IdentifierToken",
                        "leadingMinutiae": [],
                        "trailingMinutiae": [],
                        "errorNode": false,
                        "diagnostics": []
                     },
                     {
                        "nodeID": "p7",
                        "leadingMinutiae": [],
                        "trailingMinutiae": [],
                        "parentID": "p3",
                        "didCollapse": false,
                        "children": [
                           {
                              "nodeID": "c8",
                              "value": "(",
                              "parentID": "p7",
                              "children": [],
                              "kind": "OpenParenToken",
                              "leadingMinutiae": [],
                              "trailingMinutiae": [],
                              "errorNode": false,
                              "diagnostics": []
                           },
                           {
                              "nodeID": "p9",
                              "parentID": "p7",
                              "didCollapse": false,
                              "children": [],
                              "diagnostics": [],
                              "value": "parameters",
                              "kind": "parameters",
                              "leadingMinutiae": undefined,
                              "trailingMinutiae": undefined
                           },
                           {
                              "nodeID": "c10",
                              "value": ")",
                              "parentID": "p7",
                              "children": [],
                              "kind": "CloseParenToken",
                              "leadingMinutiae": [],
                              "trailingMinutiae": [],
                              "errorNode": false,
                              "diagnostics": []
                           }
                        ],
                        "diagnostics": [],
                        "value": "functionSignature",
                        "kind": "functionSignature"
                     },
                     {
                        "nodeID": "p11",
                        "leadingMinutiae": [
                           {
                              "kind": "WHITESPACE_MINUTIAE",
                              "minutiae": " "
                           }
                        ],
                        "trailingMinutiae": [],
                        "parentID": "p3",
                        "didCollapse": false,
                        "children": [
                           {
                              "nodeID": "c12",
                              "value": ")",
                              "kind": "Invalid Node",
                              "parentID": "p11",
                              "children": [],
                              "errorNode": true,
                              "diagnostics": [
                                 {
                                    "message": "Invalid node"
                                 }
                              ]
                           },
                           {
                              "nodeID": "c13",
                              "value": "{",
                              "parentID": "p11",
                              "children": [],
                              "kind": "OpenBraceToken",
                              "leadingMinutiae": [
                                 {
                                    "kind": "WHITESPACE_MINUTIAE",
                                    "minutiae": " "
                                 }
                              ],
                              "trailingMinutiae": [
                                 {
                                    "kind": "END_OF_LINE_MINUTIAE",
                                    "minutiae": "\n"
                                 }
                              ],
                              "errorNode": false,
                              "diagnostics": []
                           },
                           {
                              "nodeID": "p14",
                              "parentID": "p11",
                              "didCollapse": false,
                              "children": [],
                              "diagnostics": [],
                              "value": "statements",
                              "kind": "statements",
                              "leadingMinutiae": undefined,
                              "trailingMinutiae": undefined
                           },
                           {
                              "nodeID": "c15",
                              "value": "CloseBraceToken",
                              "parentID": "p11",
                              "children": [],
                              "kind": "Missing CloseBraceToken",
                              "leadingMinutiae": [],
                              "trailingMinutiae": [],
                              "errorNode": true,
                              "diagnostics": [
                                 {
                                    "message": "Missing CloseBraceToken"
                                 }
                              ]
                           }
                        ],
                        "diagnostics": [
                           {
                              "message": "invalid token ')'",
                              "diagnosticInfo": {
                                 "code": "BCE0600",
                                 "severity": "ERROR"
                              }
                           },
                           {
                              "message": "missing close brace token",
                              "diagnosticInfo": {
                                 "code": "BCE0007",
                                 "severity": "ERROR"
                              }
                           }
                        ],
                        "value": "functionBody",
                        "kind": "functionBody"
                     }
                  ],
                  "diagnostics": [
                     {
                        "message": "invalid token ')'",
                        "diagnosticInfo": {
                           "code": "BCE0600",
                           "severity": "ERROR"
                        }
                     },
                     {
                        "message": "missing close brace token",
                        "diagnosticInfo": {
                           "code": "BCE0007",
                           "severity": "ERROR"
                        }
                     }
                  ],
                  "value": "FunctionDefinition",
                  "kind": "FunctionDefinition"
               }
            ],
            "diagnostics": [
               {
                  "message": "invalid token ')'",
                  "diagnosticInfo": {
                     "code": "BCE0600",
                     "severity": "ERROR"
                  }
               },
               {
                  "message": "missing close brace token",
                  "diagnosticInfo": {
                     "code": "BCE0007",
                     "severity": "ERROR"
                  }
               }
            ],
            "value": "members",
            "kind": "members"
         },
         {
            "nodeID": "c16",
            "value": "EofToken",
            "parentID": "p0",
            "children": [],
            "kind": "EofToken",
            "leadingMinutiae": [
               {
                  "kind": "END_OF_LINE_MINUTIAE",
                  "minutiae": "\n"
               }
            ],
            "trailingMinutiae": [],
            "errorNode": false,
            "diagnostics": []
         }
      ],
      "diagnostics": [
         {
            "message": "invalid token ')'",
            "diagnosticInfo": {
               "code": "BCE0600",
               "severity": "ERROR"
            }
         },
         {
            "message": "missing close brace token",
            "diagnosticInfo": {
               "code": "BCE0007",
               "severity": "ERROR"
            }
         }
      ],
      "value": "syntaxTree",
      "kind": "Compilation Unit",
      "parentID": undefined
   }
];
