import { CSSProperties } from "react";

export const bodyStyle: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative"
};

export const optionsContainer: CSSProperties = {
    backgroundColor: "white",
    borderBottom: "1px solid #20b6b0",
    display: "flex",
    flexDirection: "row",
    height: "75px",
    padding: "15px",
    position: "fixed",
    width: "100vw",
    zIndex: 100
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
    fontSize: "16.5px",
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
