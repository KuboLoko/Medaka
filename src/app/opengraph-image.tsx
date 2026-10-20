import { ImageResponse } from "next/og";

export const alt = "medaka: see how AI engines describe your firm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Light editorial card: warm paper, deep slate type, one orange fish. */
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
          background: "linear-gradient(135deg, #fff3ea 0%, #f7f5f0 45%, #e9eef6 100%)",
          color: "#131c27",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="100" height="60" viewBox="0 0 100 60">
            <path d="M6 32 C 20 11, 52 9, 70 30 C 52 53, 20 53, 6 32 Z" fill="#f06a25" />
            <path d="M66 30 L 96 12 C 92 24, 92 36, 96 48 Z" fill="#f06a25" />
            <circle cx="24" cy="22" r="6.4" fill="#ffffff" />
            <circle cx="25.5" cy="21.5" r="3" fill="#0e1620" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 52, lineHeight: 1 }}>medaka</div>
            <div style={{ fontSize: 20, letterSpacing: 4, color: "#475669", marginTop: 8 }}>
              AI VISIBILITY MONITORING
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 80, lineHeight: 1.03, maxWidth: 960 }}>
            See how AI engines describe your firm.
          </div>
          <div style={{ fontSize: 30, color: "#475669" }}>
            For UK finance firms. By SEOptimist.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
