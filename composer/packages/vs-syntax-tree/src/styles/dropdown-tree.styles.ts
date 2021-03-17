import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "90vh",
    minWidth: "750px",
    overflow: "auto",
    width: "95vw"
};

export const sideDividersStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    margin: "15px",
    minHeight: "300px",
    overflow: "auto"
};

export const dropdownNodeStyle: CSSProperties = {
    borderLeft: "1px dashed black",
    cursor: "default",
    display: "flex",
    flexDirection: "row",
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
    fontSize: 15,
    paddingLeft: "25px",
    paddingRight: "10px",
    textAlign: "left",
    width: "auto"
};

export const detailsBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    justifyContent: "center",
    textAlign: "left",
    width: "auto"
};

export const detailsCardStyle: CSSProperties = {
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    marginBottom: "2vh",
    paddingLeft: 20,
    width: "100%"
};

export const detailsArrayValueBlock: CSSProperties = {
    display: "flex",
    flexDirection: "column"
};

export const detailsCardTitleStyle: CSSProperties = {
    height: "45px",
    lineHeight: "45px",
    minWidth: 150
};

export const detailsCardValueStyle: CSSProperties = {
    height: "45px",
    lineHeight: "45px",
    paddingLeft: 20
};

export const warningIconStyle: CSSProperties = {
    marginLeft: "10px",
    width: "25px"
};

export const findNodeButtonStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
};
