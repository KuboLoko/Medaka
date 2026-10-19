import { ImageResponse } from "next/og";

export const alt = "medaka: see how AI engines describe your firm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#133620",
          color: "#f2f2ea",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="100" height="60" viewBox="0 0 100 60">
            <path d="M6 32 C 20 11, 52 9, 70 30 C 52 53, 20 53, 6 32 Z" fill="#f2602f" />
            <path d="M66 30 L 96 12 C 92 24, 92 36, 96 48 Z" fill="#f2602f" />
            <circle cx="24" cy="22" r="6.4" fill="#f2f2ea" />
            <circle cx="25.5" cy="21.5" r="3" fill="#0a2013" />
          </svg>
          <div style={{ fontSize: 52 }}>medaka</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 80, lineHeight: 1.03, maxWidth: 940 }}>
            See how AI engines describe your firm.
          </div>
          <div style={{ fontSize: 30, color: "#b4c4b9" }}>
            AI visibility monitoring for UK finance firms. By SEOptimist.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
