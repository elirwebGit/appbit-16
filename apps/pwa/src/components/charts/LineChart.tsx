import { useMemo, useRef, useState } from "react";

export interface Series {
  label: string;
  color: string;
  values: number[];
}

interface LineChartProps {
  series: Series[];
  labels?: string[];
  height?: number;
  yMax?: number;
}

const W = 800;
const PAD = { top: 18, right: 18, bottom: 30, left: 40 };
const H = 260;

function smoothPath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0][0]},${pts[0][1]}`;
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function LineChart({ series, labels = [], height = 300, yMax = 1 }: LineChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const n = Math.max(1, ...series.map((s) => s.values.length));

  const toPts = (values: number[]): [number, number][] =>
    values.map((v, i) => {
      const x = PAD.left + (n === 1 ? innerW / 2 : (i * innerW) / (n - 1));
      const y = PAD.top + innerH - (v / yMax) * innerH;
      return [x, y];
    });

  const paths = useMemo(
    () =>
      series.map((s) => {
        const pts = toPts(s.values);
        const line = smoothPath(pts);
        const area = `${line} L ${pts[pts.length - 1][0]},${PAD.top + innerH} L ${pts[0][0]},${PAD.top + innerH} Z`;
        return { ...s, line, area, pts };
      }),
    [series, n, innerW, innerH, yMax],
  );

  const ticks = [0, 0.25, 0.5, 0.75, 1];

  function handleMove(e: React.MouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || n <= 1) return;
    const frac = (e.clientX - rect.left) / rect.width;
    const svgX = frac * W;
    const rawIdx = ((svgX - PAD.left) / innerW) * (n - 1);
    setHover(Math.max(0, Math.min(n - 1, Math.round(rawIdx))));
  }

  const hoverX = hover === null ? 0 : PAD.left + (n === 1 ? innerW / 2 : (hover * innerW) / (n - 1));

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }} onMouseMove={handleMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={height} role="img" aria-label="Gráfico de evolução">
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* grid + y labels */}
        {ticks.map((t) => {
          const y = PAD.top + innerH - t * innerH;
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#eee4d8" strokeWidth={1} />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill="#b3a898">
                {Math.round(t * yMax * 100)}
              </text>
            </g>
          );
        })}

        {/* x labels */}
        {labels.map((l, i) => {
          const x = PAD.left + (n === 1 ? innerW / 2 : (i * innerW) / (n - 1));
          return (
            <text key={l + i} x={x} y={H - 8} textAnchor="middle" fontSize={11} fill="#b3a898">
              {l}
            </text>
          );
        })}

        {/* areas */}
        {paths.map((p, i) => (
          <path key={`a-${i}`} d={p.area} fill={`url(#grad-${i})`} style={{ animation: `area-fade var(--nexo-dur-slow) var(--nexo-ease) both` }} />
        ))}

        {/* lines */}
        {paths.map((p, i) => (
          <path
            key={`l-${i}-${p.values.join("_")}`}
            d={p.line}
            fill="none"
            stroke={p.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: `line-draw var(--nexo-dur-slow) var(--nexo-ease) both` }}
          />
        ))}

        {/* hover crosshair + points */}
        {hover !== null && (
          <>
            <line x1={hoverX} y1={PAD.top} x2={hoverX} y2={PAD.top + innerH} stroke="#d9cdbb" strokeDasharray="4 4" />
            {paths.map((p, i) => {
              const y = p.pts[hover]?.[1];
              return y === undefined ? null : <circle key={i} cx={hoverX} cy={y} r={4.5} fill="#fff" stroke={p.color} strokeWidth={3} />;
            })}
          </>
        )}
      </svg>

      {hover !== null && (
        <div
          className="nexo-glass"
          style={{
            position: "absolute",
            top: 8,
            left: `${Math.min(80, Math.max(8, (hoverX / W) * 100))}%`,
            transform: "translateX(-50%)",
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 12,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {labels[hover] && <div style={{ fontWeight: 600, marginBottom: 2 }}>{labels[hover]}</div>}
          {series.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: "inline-block" }} />
              {s.label}: {(s.values[hover] * 100).toFixed(0)}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes line-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        @keyframes area-fade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
