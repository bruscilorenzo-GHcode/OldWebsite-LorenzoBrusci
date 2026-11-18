import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Timet — nonlinear music and sound architecture, 1993–2003";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1014",
          color: "#E4E7E6",
          padding: "64px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#6B8BA8",
          }}
        >
          <span>TIMET</span>
          <span>1993–2003</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            maxWidth: "900px",
          }}
        >
          Nonlinear music and sound architecture.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #263139",
            paddingTop: "20px",
            fontSize: 22,
            color: "#7D8B96",
          }}
        >
          <span>Italian sound-art collective</span>
          <span>timet.org</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
