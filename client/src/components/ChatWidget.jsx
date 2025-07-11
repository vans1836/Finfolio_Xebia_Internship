 /* import React from "react";

export default function ChatWidget() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#fff",
        zIndex: 9999,
        boxShadow: "0 4px 20px rgba(253, 42, 42, 0.57)",
        overflow: "hidden"
      }}
    >
      <iframe
  title="Chatbot"
  src="about:blank"
  style={{ width: "100%", height: "100%", border: "none" }}
/>

    </div>
  );
}  */

  import React from "react";
import { useTheme } from "@mui/material";

export default function ChatWidget() {
  const theme = useTheme();

  const backgroundColor = theme.palette.background.paper;
  const borderColor = theme.palette.divider;
  const boxShadow =
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(255, 105, 135, 0.4)"
      : "0 4px 20px rgba(253, 42, 42, 0.57)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
        background: backgroundColor,
        zIndex: 9999,
        boxShadow: boxShadow,
        overflow: "hidden"
      }}
    >
      <iframe
        title="Chatbot"
        src="about:blank"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
