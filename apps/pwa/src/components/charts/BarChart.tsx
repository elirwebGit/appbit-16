export interface BarDatum {
  label: string;
  value: number; // 0..1
  color: string;
}

export function BarChart({ data, height = 220 }: { data: BarDatum[]; height?: number }) {
  const max = Math.max(0.0001, ...data.map((d) => d.value));

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height, padding: "10px 6px 0" }}>
      {data.map((d, i) => (
        <div key={`${d.label}-${i}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--nexo-ink)" }}>{Math.round(d.value * 100)}</span>
          <div
            style={{
              width: "100%",
              height: `${(d.value / max) * 100}%`,
              background: d.color,
              borderRadius: "8px 8px 0 0",
              transformOrigin: "bottom",
              animation: `bar-grow var(--nexo-dur-slow) var(--nexo-ease) both`,
            }}
            title={`${d.label}: ${Math.round(d.value * 100)}`}
          />
          <span style={{ fontSize: 11, color: "var(--nexo-text-muted)", textAlign: "center", lineHeight: 1.2 }}>{d.label}</span>
        </div>
      ))}
      <style>{`@keyframes bar-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }`}</style>
    </div>
  );
}
