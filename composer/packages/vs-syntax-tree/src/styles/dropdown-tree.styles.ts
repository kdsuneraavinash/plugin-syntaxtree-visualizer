import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    maxHeight: "90vh",
    minWidth: "800px",
    overflow: "auto"
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
    width: "100%"
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
    flexDirection: "column",
    flexGrow: 1
};

export const detailsCardTitleStyle: CSSProperties = {
    height: "45px",
    lineHeight: "45px",
    minWidth: 150
};

export const detailsCardValueStyle: CSSProperties = {
    flexGrow: 1,
    lineHeight: "45px",
    minHeight: "45px",
    overflowWrap: "anywhere",
    paddingLeft: 15,
    paddingRight: 10
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
