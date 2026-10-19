/**
 * Decorative illustration: a medaka with its eye high on the head,
 * and thin sight lines running to the sources the engines read.
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
          stroke="var(--color-ink-900)"
          strokeWidth="1"
          opacity={0.28 - i * 0.05}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <path
            className="sight-line"
            d={`M150 118 C 250 ${60 + i * 40}, 360 ${n.y}, ${n.x - 8} ${n.y}`}
            stroke="var(--color-flame)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x={n.x}
            y={n.y - 14}
            width="64"
            height="28"
            rx="6"
            stroke="var(--color-ink-500)"
            strokeWidth="1.5"
          />
          <path
            d={`M${n.x + 12} ${n.y - 4} H ${n.x + 52} M${n.x + 12} ${n.y + 5} H ${n.x + 38}`}
            stroke="var(--color-ink-500)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      <g className="fish-drift fish-live" transform="translate(30 100) scale(2.6)">
        <path d="M6 32 C 20 11, 52 9, 70 30 C 52 53, 20 53, 6 32 Z" fill="var(--color-flame)" />
        <path className="fish-tail" d="M66 30 L 96 12 C 92 24, 92 36, 96 48 Z" fill="var(--color-flame)" />
        <circle cx="24" cy="22" r="6.4" fill="#f2f2ea" />
        <circle cx="25.5" cy="21.5" r="3" fill="#0a2013" />
      </g>
    </svg>
  );
}
