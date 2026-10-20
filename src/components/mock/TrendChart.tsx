import { useId } from "react";
import { cn } from "@/lib/cn";

type Pt = { x: number; y: number };

/**
 * Monotone cubic interpolation (Fritsch-Carlson): a smooth curve that never overshoots
 * the data, so a rising series never dips between points.
 */
function smoothPath(pts: Pt[]): string {
  const n = pts.length;
  if (n < 2) return "";
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i += 1) {
    dx.push(pts[i + 1].x - pts[i].x);
    m.push((pts[i + 1].y - pts[i].y) / dx[i]);
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i += 1) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  t.push(m[n - 2]);
  for (let i = 0; i < n - 1; i += 1) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / m[i];
    const b = t[i + 1] / m[i];
    const s = a * a + b * b;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      t[i] = tau * a * m[i];
      t[i + 1] = tau * b * m[i];
    }
  }
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < n - 1; i += 1) {
    const h = dx[i] / 3;
    d += ` C ${pts[i].x + h} ${pts[i].y + t[i] * h}, ${pts[i + 1].x - h} ${pts[i + 1].y - t[i + 1] * h}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  return d;
}

/**
 * A minimalist line chart: hairline gridlines, a smooth curve, crisp data points and a
 * labelled final value. Illustrative data only; it always sits inside a MockFrame or Panel.
 */
export function TrendChart({
  values,
  labels,
  unit = "",
  ariaLabel,
  className,
}: {
  values: number[];
  labels: string[];
  unit?: string;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 640;
  const H = 240;
  const padL = 44;
  const padR = 24;
  const padT = 30;
  const padB = 34;

  const max = Math.max(...values);
  const yMax = (Math.floor(max / 10) + 1) * 10;
  const ticks = [0, 1, 2, 3].map((i) => (yMax / 3) * i);
  const X = (i: number) => padL + (i * (W - padL - padR)) / (values.length - 1);
  const Y = (v: number) => padT + (1 - v / yMax) * (H - padT - padB);

  const pts = values.map((v, i) => ({ x: X(i), y: Y(v) }));
  const line = smoothPath(pts);
  const base = H - padB;
  const area = `${line} L ${pts[pts.length - 1].x} ${base} L ${pts[0].x} ${base} Z`;
  const last = pts[pts.length - 1];
  const lastLabel = `${values[values.length - 1]}${unit}`;

  return (
    <div
      role="region"
      aria-label={`${ariaLabel} Scrollable.`}
      tabIndex={0}
      className="-mx-1 overflow-x-auto px-1"
    >
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className={cn("h-auto w-full min-w-[27rem]", className)}
    >
      <defs>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-flame)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-flame)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={padL}
            x2={W - padR}
            y1={Y(t)}
            y2={Y(t)}
            stroke="var(--color-ink-900)"
            strokeOpacity={t === 0 ? 0.18 : 0.07}
            strokeWidth="1"
          />
          <text
            x={padL - 10}
            y={Y(t) + 3.5}
            textAnchor="end"
            fontSize="13"
            fill="var(--color-ink-500)"
          >
            {Math.round(t)}
            {unit}
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${uid}-area)`} />
      <path
        d={line}
        fill="none"
        stroke="var(--color-copper-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {pts.slice(0, -1).map((p, i) => (
        <circle
          key={labels[i]}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#fff"
          stroke="var(--color-copper-500)"
          strokeWidth="2"
        />
      ))}

      <circle cx={last.x} cy={last.y} r="12" fill="var(--color-flame)" fillOpacity="0.16" />
      <circle cx={last.x} cy={last.y} r="6" fill="var(--color-copper-500)" stroke="#fff" strokeWidth="2.5" />
      <g transform={`translate(${last.x - 26} ${last.y - 38})`}>
        <rect width="52" height="24" rx="6" fill="var(--color-ink-900)" />
        <text x="26" y="16.5" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
          {lastLabel}
        </text>
      </g>

      {labels.map((l, i) => (
        <text
          key={l}
          x={X(i)}
          y={H - 10}
          textAnchor="middle"
          fontSize="13"
          fill="var(--color-ink-500)"
        >
          {l}
        </text>
      ))}
    </svg>
    <table className="sr-only">
      <caption>{ariaLabel}</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {labels.map((l, i) => (
          <tr key={l}>
            <th scope="row">{l}</th>
            <td>
              {values[i]}
              {unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
