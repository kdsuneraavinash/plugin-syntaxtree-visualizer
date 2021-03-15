import React from "react";

import { MINUTIAE } from "../../resources/constants";
import { DetailsArrayCardProp } from "../../resources/tree-interfaces";
import * as styles from "../../styles/dropdown-tree.styles";

function DropdownArrayDetails(props: DetailsArrayCardProp) {
    return (
        <div style = {styles.detailsCardStyle}>
            <div style = {styles.detailsCardTitleStyle}>
                <b> {props.title} </b>
            </div>

            {props.value &&
                <div style = {styles.detailsArrayValueBlock}>
                    {props.value.map((item, id) => {
                        if (props.type === MINUTIAE) {
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
