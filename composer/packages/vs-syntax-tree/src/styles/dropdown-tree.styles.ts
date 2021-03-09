import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "85vh",
    maxWidth: "95vw",
    minWidth: "800px"
};

export const sideDividersStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    minWidth: "400px",
    overflow: "auto",
    padding: "2vh"
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
    flexDirection: "column"
};

export const detailsCardTitleStyle: CSSProperties = {
    height: "45px",
    lineHeight: "45px",
    width: "40%"
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
