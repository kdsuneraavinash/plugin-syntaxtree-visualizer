import React from "react";
import renderer from "react-test-renderer";
import SyntaxTree from "./../src/syntaxTree";

it("Syntax tree renders correctly", () => {
  const tree = renderer
    .create(<SyntaxTree renderTree = {jest.fn()} onCollapseTree = {jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
