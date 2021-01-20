import React from "react";
import { DropdownTreeProps } from "./tree-interfaces";

function DropdownTree(props: DropdownTreeProps) {
    return (
        <div>
            <text>{JSON.stringify(props, null, 2)}</text>
        </div>
    );
}

export default DropdownTree;
