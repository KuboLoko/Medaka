import { ImageResponse } from "next/og";

export const alt = "Medaka: see how AI engines describe your firm";
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
          background: "#0a1520",
          color: "#f6f2ea",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
            <path d="M8 32 C 20 12, 52 10, 70 30 C 52 52, 20 52, 8 32 Z" stroke="#f6f2ea" strokeWidth="3" />
            <path d="M68 30 L 94 14 C 91 24, 91 38, 94 48 Z" stroke="#f6f2ea" strokeWidth="3" />
            <circle cx="23" cy="23" r="4.5" fill="#c2572a" />
          </svg>
          <div style={{ fontSize: 44 }}>Medaka</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900 }}>
            See how AI engines describe your firm.
          </div>
          <div style={{ fontSize: 30, color: "#a9b4bf" }}>
            AI visibility monitoring for UK finance firms. By SEOptimist.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
