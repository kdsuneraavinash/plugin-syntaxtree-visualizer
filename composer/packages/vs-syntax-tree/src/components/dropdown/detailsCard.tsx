import React from "react";
import { DetailsCardProp } from "../../tree-interfaces";

function DropdownDetails(props: DetailsCardProp) {
    return (
        <div
            style = {{
                display: "flex",
                flexDirection: "row",
                height: 50,
                paddingLeft: 20,
                width: "100%"
            }}
        >
            <div
                style = {{
                    height: "100%",
                    lineHeight: "50px",
                    width: "30%"
                }}
            >
                <b>{props.title}</b>
            </div>

            <div
                style = {{
                    height: "100%",
                    lineHeight: "50px",
                    paddingLeft: 20,
                    width: "auto"
                }}
            >
                {props.value}
            </div>
        </div>
    );
}

export default DropdownDetails;
