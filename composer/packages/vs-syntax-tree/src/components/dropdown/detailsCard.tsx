import React from "react";

import * as styles from "../../styles/dropdown-tree.styles";
import { DetailsCardProp } from "../../tree-interfaces";

function DropdownDetails(props: DetailsCardProp) {
    return (
        <div style = {{
                ...styles.detailsCardStyle,
                height: 45
            }}
        >
            <div style = {styles.detailsCardTitleStyle}>
                <b>{props.title}</b>
            </div>

            <div style = {styles.detailsCardValueStyle}>
                {props.value}
            </div>
        </div>
    );
}

export default DropdownDetails;
