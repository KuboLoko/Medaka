/**
 * Decorative line illustration: a medaka with its eye high on the head,
 * and faint sight lines running to the sources the engines read.
 * Motion is CSS-only and switched off for reduced motion.
 */
export function FishIllustration({ className }: { className?: string }) {
  const nodes = [
    { x: 520, y: 70 },
    { x: 560, y: 150 },
    { x: 520, y: 230 },
    { x: 440, y: 290 },
  ];
  return (
    <svg
      viewBox="0 0 640 340"
      className={className}
      aria-hidden
      fill="none"
      focusable="false"
    >
      {[110, 170, 230, 290].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} C 120 ${y - 14}, 220 ${y + 14}, 340 ${y} S 560 ${y - 12}, 640 ${y}`}
          stroke="var(--color-ink-700)"
          strokeWidth="1"
          opacity={0.7 - i * 0.12}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <path
            className="sight-line"
            d={`M150 118 C 250 ${60 + i * 40}, 360 ${n.y}, ${n.x - 8} ${n.y}`}
            stroke="var(--color-copper-500)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x={n.x}
            y={n.y - 14}
            width="64"
            height="28"
            rx="6"
            stroke="var(--color-ink-300)"
            strokeWidth="1.5"
          />
          <path
            d={`M${n.x + 12} ${n.y - 4} H ${n.x + 52} M${n.x + 12} ${n.y + 5} H ${n.x + 38}`}
            stroke="var(--color-ink-300)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      <g className="fish-drift fish-live" transform="translate(40 120) scale(2.6)">
        <path
          d="M8 32 C 20 12, 52 10, 70 30 C 52 52, 20 52, 8 32 Z"
          stroke="var(--color-paper)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          className="fish-tail"
          d="M68 30 L 94 14 C 91 24, 91 38, 94 48 Z"
          stroke="var(--color-paper)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M30 20 C 38 15, 48 16, 54 21"
          stroke="var(--color-paper)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="23" cy="23" r="4.2" fill="var(--color-copper-500)" />
        <circle cx="22" cy="22" r="1.2" fill="var(--color-paper)" />
      </g>
    </svg>
  );
}
