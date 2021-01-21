import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "70vh",
    minWidth: "800px",
    width: "90vh"
};

export const sideDividersStyle: CSSProperties = {
    backgroundColor: "#F0F0F0",
    height: "auto",
    overflow: "auto",
    width: "50%"
};

export const dropdownNodeStyle: CSSProperties = {
    cursor: "default",
    display: "flex",
    flexDirection: "row",
    height: 50,
    lineHeight: "50px",
    width: "100%"
};

export const dropdownArrowStyle: CSSProperties = {
    height: "100%",
    paddingLeft: "8px"
};

export const nodeLabelStyle: CSSProperties = {
    flexGrow: 1,
    fontSize: 14,
    paddingLeft: "5px",
    textAlign: "left",
    width: "auto"
};

export const detailsBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    width: "100%"
};

export const detailsCardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
    width: "100%"
};

export const detailsArrayValueBlock: CSSProperties = {
    display: "flex",
    flexDirection: "column"
};

export const detailsCardTitleStyle: CSSProperties = {
    height: "100%",
    lineHeight: "50px",
    width: "30%"
};

export const detailsCardValueStyle: CSSProperties = {
    height: "100%",
    lineHeight: "50px",
    paddingLeft: 20,
    width: "auto"
};
