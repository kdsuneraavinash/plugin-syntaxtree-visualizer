import { CSSProperties } from "react";

export const bodyStyle: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative"
};

export const optionsContainer: CSSProperties = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    height: "65px",
    justifyContent: "flex-end",
    left: 0,
    opacity: 0.95,
    padding: "12px",
    paddingRight: "20px",
    position: "fixed",
    top: 0,
    width: "100vw",
    zIndex: 10
};

export const optionBlock: CSSProperties = {
    paddingLeft: "15px",
    paddingRight: "15px"
};
