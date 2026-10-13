import { useState } from "react";
import { Download } from "lucide-react";
import OfflineBanner from "../components/OfflineBanner";
import ReloadPrompt from "../components/ReloadPrompt";
import { Navbar } from "../components/Navbar";

import { RegionCard, IndicatorCard, HistoryCard } from "../components/SidebarCards";
import { SidebarShell } from "../components/SidebarShell";
import { ChatPopover } from "../components/ChatPopover";
import { ExportPopover } from "../components/ExportPopover";
import { LineChart } from "../components/charts/LineChart";
import { BarChart } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";
import { Sparkline } from "../components/charts/Sparkline";
import { useAnimatedNumber } from "../components/charts/useAnimatedNumber";
import { useDashboard } from "../contexts/DashboardContext";
import { buildSeries, YEARS } from "../utils/series";
import type { RegiaoMapa } from "../types/visent";

const PALETTE = ["#8AC475", "#DF7149", "#F7DF59", "#6B7A3F", "#EEA056", "#232323"];

const INDICATOR_LABEL: Record<string, string> = {
  saude_mental: "Saúde mental",
  empregabilidade: "Empregabilidade",
  formacoes: "Formações",
};

function getValue(regiao: RegiaoMapa, indicatorId: string): number {
  if (indicatorId === "saude_mental") return regiao.indicadores.saude_mental;
  if (indicatorId === "empregabilidade") return regiao.indicadores.empregabilidade;
  if (indicatorId === "formacoes") return regiao.indicadores.formacoes;
  return 0;
}

function level(value: number): string {
  if (value > 0.8) return "Alto";
  if (value < 0.4) return "Baixo";
  return "Médio";
}

function KpiCard({ regiao, name, value, color }: { regiao: string; name: string; value: number; color: string }) {
  const animated = useAnimatedNumber(value * 100);
  const series = buildSeries(`${regiao}:${name}:kpi`, value, 6);
  return (
    <div
      className="nexo-glass"
      style={{ borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "var(--nexo-ink)", fontSize: 14 }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--nexo-ink)", lineHeight: 1 }}>{animated.toFixed(0)}</div>
          <div style={{ fontSize: 12, color: "var(--nexo-text-muted)" }}>{level(value)}</div>
        </div>
        <Sparkline values={series} color={color} />
      </div>
    </div>
  );
}

export default function PainelView() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const {
    mapData,
    selectedRegionIds,
    toggleRegion,
    activeIndicatorId,
    setIndicator,
    historyItems,
    addRegion,
    removeRegion,
  } = useDashboard();

  const regions = mapData.map((r) => ({
    id: r.id,
    key: r.regiao,
    name: r.nome_exibicao,
    selected: selectedRegionIds.includes(r.regiao),
  }));

  const indicators = [
    { id: "saude_mental", name: "Saúde mental", active: activeIndicatorId === "saude_mental" },
    { id: "empregabilidade", name: "Empregabilidade", active: activeIndicatorId === "empregabilidade" },
    { id: "formacoes", name: "Formações", active: activeIndicatorId === "formacoes" },
  ];

  const target = selectedRegionIds.length > 0
    ? mapData.filter((r) => selectedRegionIds.includes(r.regiao))
    : mapData.slice(0, 3);

  const colorOf = (i: number) => PALETTE[i % PALETTE.length];

  const lineSeries = target.map((r, i) => ({
    label: r.nome_exibicao.split(" — ")[0],
    color: colorOf(i),
    values: buildSeries(`${r.regiao}:${activeIndicatorId}`, getValue(r, activeIndicatorId), YEARS.length),
  }));

  const barData = target.map((r, i) => ({
    label: r.nome_exibicao.split(" — ")[0],
    value: getValue(r, activeIndicatorId),
    color: colorOf(i),
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", background: "var(--nexo-paper)", overflow: "hidden" }}>
      <OfflineBanner />
      <Navbar />

      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
        {/* Sidebar */}
        <SidebarShell>
          <RegionCard countryName="Brasil" regions={regions} onToggleRegion={toggleRegion} onAddRegion={addRegion} onRemoveRegion={removeRegion} />
          <IndicatorCard indicators={indicators} onToggleIndicator={setIndicator} />
          <HistoryCard items={historyItems} onSelectItem={(id) => console.log("Selected history:", id)} />
          <div className="sidebar-footer">
            {isExportOpen && (
              <ExportPopover isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onExport={(name) => console.log("Export", name)} />
            )}
            <button className="export-trigger-btn" onClick={() => setIsExportOpen(!isExportOpen)}>
              <Download size={18} /> Exportar
            </button>
          </div>
        </SidebarShell>

        {/* Main */}
        <main style={{ flex: 1, padding: 24, overflowY: "auto", minWidth: 0 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px", color: "var(--nexo-ink)" }}>
            Visão geral · {INDICATOR_LABEL[activeIndicatorId] ?? activeIndicatorId}
          </h2>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {target.map((r, i) => (
              <KpiCard key={r.regiao} regiao={r.regiao} name={r.nome_exibicao} value={getValue(r, activeIndicatorId)} color={colorOf(i)} />
            ))}
          </div>

          {/* Line chart */}
          <section className="nexo-glass" style={{ marginTop: 20, borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "var(--nexo-ink)" }}>Evolução do índice</h3>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {lineSeries.map((s) => (
                  <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--nexo-text-muted)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /> {s.label}
                  </span>
                ))}
              </div>
            </div>
            {lineSeries.length > 0 ? (
              <LineChart series={lineSeries} labels={YEARS} />
            ) : (
              <p style={{ color: "var(--nexo-text-muted)", fontSize: 14 }}>Selecione regiões para ver a evolução.</p>
            )}
          </section>

          {/* Donuts + Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 20 }}>
            <section className="nexo-glass" style={{ borderRadius: 16, padding: 18 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px", color: "var(--nexo-ink)" }}>Índice por região</h3>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                {target.map((r, i) => (
                  <div key={r.regiao} style={{ textAlign: "center" }}>
                    <DonutChart value={getValue(r, activeIndicatorId)} color={colorOf(i)} label={r.nome_exibicao.split(" — ")[0]} />
                  </div>
                ))}
              </div>
            </section>

            <section className="nexo-glass" style={{ borderRadius: 16, padding: 18 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px", color: "var(--nexo-ink)" }}>Comparativo</h3>
              {barData.length > 0 ? <BarChart data={barData} /> : <p style={{ color: "var(--nexo-text-muted)", fontSize: 14 }}>Sem dados.</p>}
            </section>
          </div>
        </main>

        <ChatPopover />
      </div>
      <ReloadPrompt />
    </div>
  );
}
