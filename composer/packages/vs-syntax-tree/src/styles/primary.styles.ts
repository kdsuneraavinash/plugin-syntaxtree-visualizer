import { CSSProperties } from "react";

export const bodyStyle: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative"
};

export const optionsContainer: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
    marginBottom: "25px",
    padding: "15px",
    width: "100%"
};

export const switchRepresentationDiv: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
    justifyContent: "flex-start",
    left: 30,
    position: "fixed",
    top: 20
};

export const viewDiv: CSSProperties = {
    fontSize: "15px",
    left: window.innerWidth / 2,
    position: "fixed",
    top: 20,
    transform: "translateX(-50%)"
};

export const switchModeDiv: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
    justifyContent: "flex-end",
    position: "fixed",
    right: 30,
    top: 20
};

export const switchStyle: CSSProperties = {
    paddingRight: "15px"
};
