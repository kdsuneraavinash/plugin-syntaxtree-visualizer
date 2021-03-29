"use strict";
/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import { expect } from 'chai';
import * as DATA from "../data/syntaxTree-obj";
import {retrieveGraph, updateSyntaxTree} from "../../src/vs-syntax-tree/tools/syntax-tree-generator";

suite ("Syntax Tree Visualizer Tests", function () {
    test("Test Generate Graph and Tree Map", function (done): void {
      expect(retrieveGraph(DATA.syntaxTreeObj, "Full Tree View")).to.contain.keys('treeGraph', 'syntaxTreeObj');
      done();
    });

    test("Test Collapse Graphical Tree", function (done): void {    
        expect(updateSyntaxTree("p3", true).treeGraph.children.length).to.equal(4);
        done();
    });

    test("Test Collapse Dropdown Tree", function (done): void {    
        expect(updateSyntaxTree("p2", false).syntaxTreeObj).eql(DATA.resultObj);
        done();
    });
});
