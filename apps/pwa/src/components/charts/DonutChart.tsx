import { useAnimatedNumber } from "./useAnimatedNumber";

export function DonutChart({
  value,
  color,
  label,
  size = 128,
}: {
  value: number; // 0..1
  color: string;
  label?: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(1, value));
  const stroke = 10;
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const display = useAnimatedNumber(pct * 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eee4d8" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset var(--nexo-dur-slow) var(--nexo-ease)" }}
      />
      <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central" fontSize={size * 0.2} fontWeight={700} fill="var(--nexo-ink)">
        {display.toFixed(0)}
      </text>
      {label && (
        <text x="50%" y="68%" textAnchor="middle" fontSize={11} fill="var(--nexo-text-muted)">
          {label}
        </text>
      )}
    </svg>
  );
}
