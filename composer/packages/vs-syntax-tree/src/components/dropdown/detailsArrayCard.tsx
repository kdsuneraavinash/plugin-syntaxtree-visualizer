import React from "react";
import { DetailsArrayCardProp } from "../../tree-interfaces";

function DropdownArrayDetails(props: DetailsArrayCardProp) {
    return (
        <div
            style = {{
                display: "flex",
                flexDirection: "row",
                width: "100%"
            }}
        >
            <div
                style = {{
                    height: 50,
                    lineHeight: "50px",
                    width: "30%"
                }}
            >
                <b>{props.title}</b>
            </div>

            {props.value &&
                <div
                    style = {{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left"
                    }}
                >
                    {props.value.map((item, id) => {
                        return <div key = {id}
                                    style = {{
                                        height: 50,
                                        lineHeight: "50px",
                                        paddingLeft: 20,
                                        width: "auto"
                                    }}
                                >
                                {props.type === "minutiae" ? item.kind : item.message}
                            </div>;
                    })}
                </div>
            }
        </div>
    );
}

export default DropdownArrayDetails;
