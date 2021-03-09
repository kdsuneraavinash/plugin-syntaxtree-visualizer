import { CSSProperties } from "react";

export const bodyStyle: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative"
};

export const optionsContainer: CSSProperties = {
    backgroundColor: "#b3b3b3",
    display: "flex",
    flexDirection: "row",
    height: "70px",
    left: 0,
    opacity: 0.85,
    padding: "12px",
    position: "fixed",
    top: 0,
    width: "100vw",
    zIndex: 10
};

export const switchRepresentationDiv: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    left: 50,
    position: "fixed",
    top: 20
};

export const viewDiv: CSSProperties = {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: "20px",
    left: window.innerWidth / 2,
    position: "fixed",
    top: 25,
    transform: "translateX(-50%)"
};

export const switchModeDiv: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "fixed",
    right: 50,
    top: 20
};
