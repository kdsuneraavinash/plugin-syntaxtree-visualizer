import React from "react";
import * as styles from "../../styles/dropdown-tree.styles";
import { DetailsArrayCardProp } from "../../tree-interfaces";

function DropdownArrayDetails(props: DetailsArrayCardProp) {
    return (
        <div style = {styles.detailsCardStyle}>
            <div style = {styles.detailsCardTitleStyle}>
                <b>{props.title}</b>
            </div>

            {props.value &&
                <div
                    style = {styles.detailsArrayValueBlock}
                >
                    {props.value.map((item, id) => {
                        return <div key = {id}
                                    style = {styles.detailsCardValueStyle}
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
