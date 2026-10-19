import { cn } from "@/lib/cn";

/** A small SVG line chart. Values are illustrative and always sit inside a MockFrame. */
export function TrendChart({
  values,
  labels,
  ariaLabel,
  className,
}: {
  values: number[];
  labels: string[];
  ariaLabel: string;
  className?: string;
}) {
  const w = 320;
  const h = 120;
  const padX = 10;
  const padTop = 12;
  const padBottom = 22;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (w - padX * 2) / (values.length - 1);
  const pts = values.map((v, i) => ({
    x: padX + i * step,
    y: padTop + (1 - (v - min) / span) * (h - padTop - padBottom),
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padX},${h - padBottom} ${line} ${w - padX},${h - padBottom}`;
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={ariaLabel}
      className={cn("h-auto w-full", className)}
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={padX}
          x2={w - padX}
          y1={padTop + f * (h - padTop - padBottom)}
          y2={padTop + f * (h - padTop - padBottom)}
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}
      <polygon points={area} fill="var(--color-water-100)" opacity="0.7" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-water-700)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last.x} cy={last.y} r="4" fill="var(--color-copper-600)" />
      {labels.map((l, i) => (
        <text
          key={l}
          x={pts[i].x}
          y={h - 6}
          textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
          fontSize="10"
          fill="var(--color-ink-600)"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}
