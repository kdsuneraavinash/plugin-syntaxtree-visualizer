import React from "react";

import * as styles from "../../styles/dropdown-tree.styles";
import { DetailsArrayCardProp } from "../../resources/tree-interfaces";

function DropdownArrayDetails(props: DetailsArrayCardProp) {
    return (
        <div style = {styles.detailsCardStyle}>
            <div style = {styles.detailsCardTitleStyle}>
                <b>{props.title}</b>
            </div>

            {props.value &&
                <div style = {styles.detailsArrayValueBlock}>
                    {props.value.map((item, id) => {
                        if (props.type === "minutiae") {
                            if (!item.isInvalid) {
                                return <div key = {id}
                                            style = {styles.detailsCardValueStyle}
                                        >
                                            {item.kind}
                                        </div>;
                            } else {
                                return ;
                            }
                        } else {
                            return <div key = {id}
                                    style = {styles.detailsCardValueStyle}
                                >
                                {item.message}
                            </div>;
                        }
                    })}
                </div>
            }
        </div>
    );
}

export default DropdownArrayDetails;
