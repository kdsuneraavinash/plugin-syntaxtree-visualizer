import React from "react";

import { DetailsCardProp } from "../../resources/tree-interfaces";
import * as styles from "../../styles/dropdown-tree.styles";

function DropdownDetails(props: DetailsCardProp) {
    return (
        <div style = {{
                ...styles.detailsCardStyle,
                minHeight: 45
            }}
        >
            <div style = {styles.detailsCardTitleStyle}>
                <b> {props.title} </b>
            </div>

            <div style = {styles.detailsCardValueStyle}>
                {props.value}
            </div>
        </div>
    );
}

export default DropdownDetails;
