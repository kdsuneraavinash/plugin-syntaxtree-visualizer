import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "85vh",
    maxWidth: "95vh",
    minWidth: "800px"
};

export const sideDividersStyle: CSSProperties = {
    minHeight: "300px",
    minWidth: "450px",
    overflow: "auto",
    padding: "2vh",
    width: "50%"
};

export const dropdownNodeStyle: CSSProperties = {
    borderLeft: "1px dashed black",
    cursor: "default",
    display: "flex",
    flexDirection: "row",
    float: "right",
    height: 40,
    lineHeight: "40px"
};

export const dropdownArrowStyle: CSSProperties = {
    height: "100%",
    paddingLeft: "4px",
    width: 35
};

export const nodeLabelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    fontSize: 16,
    paddingLeft: "25px",
    textAlign: "left",
    width: "auto"
};

export const detailsBlockStyle: CSSProperties = {
    backgroundColor: "#c8f0ec",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    width: "100%"
};

export const detailsCardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    width: "100%"
};

export const detailsArrayValueBlock: CSSProperties = {
    display: "flex",
    flexDirection: "column"
};

export const detailsCardTitleStyle: CSSProperties = {
    height: "50px",
    lineHeight: "50px",
    width: "40%"
};

export const detailsCardValueStyle: CSSProperties = {
    height: "50px",
    lineHeight: "50px",
    paddingLeft: 20,
    width: "auto"
};

export const warningIconStyle: CSSProperties = {
    marginLeft: "10px",
    width: "25px"
};
