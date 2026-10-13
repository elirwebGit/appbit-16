export function Sparkline({
  values,
  color,
  width = 72,
  height = 24,
}: {
  values: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (values.length < 2) return null;
  const pts = values.map((v, i) => {
    const x = 1 + (i * (width - 2)) / (values.length - 1);
    const y = height - 2 - v * (height - 4);
    return [x, y] as const;
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{ strokeDasharray: 1, animation: "line-draw 600ms var(--nexo-ease) both" }}
      />
      <style>{`@keyframes line-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }`}</style>
    </svg>
  );
}
