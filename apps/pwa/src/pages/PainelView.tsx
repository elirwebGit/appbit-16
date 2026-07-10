import { useState } from "react";
import { Download } from "lucide-react";
import OfflineBanner from "../components/OfflineBanner";
import ReloadPrompt from "../components/ReloadPrompt";
import { Navbar } from "../components/Navbar";

import { RegionCard, IndicatorCard, HistoryCard } from "../components/SidebarCards";
import { ChatPopover } from "../components/ChatPopover";
import { ExportPopover } from "../components/ExportPopover";
import { useDashboard } from "../contexts/DashboardContext";

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
    removeRegion
  } = useDashboard();

  // Transform mapData into regions for RegionCard
  const regions = mapData.map(r => ({
    id: r.regiao,
    name: r.nome_exibicao,
    selected: selectedRegionIds.includes(r.regiao)
  }));

  // Define static indicators mapped to context state
  const indicators = [
    { id: 'saude_mental', name: 'Saúde mental', active: activeIndicatorId === 'saude_mental' },
    { id: 'empregabilidade', name: 'Empregabilidade', active: activeIndicatorId === 'empregabilidade' },
    { id: 'formacoes', name: 'Formações', active: activeIndicatorId === 'formacoes' }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", backgroundColor: "#f1f5f9", overflow: "hidden" }}>
      <OfflineBanner />
      <Navbar />

      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
        
        {/* Left Column - Independent Cards */}
        <div style={{
          width: 280,
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexShrink: 0,
          overflowY: "auto",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
          zIndex: 10
        }}>
          <RegionCard 
            countryName="Brasil"
            regions={regions} 
            onToggleRegion={toggleRegion} 
            onAddRegion={addRegion}
            onRemoveRegion={removeRegion}
          />
          <IndicatorCard 
            indicators={indicators} 
            onToggleIndicator={setIndicator} 
          />
          <HistoryCard 
            items={historyItems} 
            onSelectItem={(id) => console.log('Selected history:', id)} 
          />
          
          <div className="sidebar-footer">
            {isExportOpen && (
              <ExportPopover 
                isOpen={isExportOpen} 
                onClose={() => setIsExportOpen(false)} 
                onExport={(name, format) => console.log("Export", name, format)} 
              />
            )}
            <button className="export-trigger-btn" onClick={() => setIsExportOpen(!isExportOpen)}>
              <Download size={18} /> Exportar
            </button>
          </div>
        </div>

        <main style={{ flex: 1, padding: "30px", overflowY: "auto", position: "relative" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            padding: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", margin: 0, color: "#1e293b" }}>
              Visão geral do Painel - {activeIndicatorId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              {(selectedRegionIds.length > 0 ? mapData.filter(r => selectedRegionIds.includes(r.regiao)) : mapData.slice(0, 3)).map((regiao, idx) => {
                const colors = ["#4caf50", "#2196f3", "#9c27b0", "#ff9800", "#f44336", "#00bcd4"];
                const color = colors[idx % colors.length];
                
                let valor = 0;
                if (activeIndicatorId === 'saude_mental') valor = regiao.indicadores.saude_mental;
                else if (activeIndicatorId === 'empregabilidade') valor = regiao.indicadores.empregabilidade;
                else if (activeIndicatorId === 'formacoes') valor = regiao.indicadores.formacoes;
                
                let nivel = 'Médio';
                if (valor > 0.8) nivel = 'Alto';
                else if (valor < 0.4) nivel = 'Baixo';
                
                return (
                  <div key={regiao.regiao} style={{ background: "white", borderRadius: "10px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", marginBottom: "8px", color: "#1e293b" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: color }}></div>
                      {regiao.nome_exibicao}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "14px", color: "#64748b" }}>Índice: {(valor * 100).toFixed(0)} ({nivel})</span>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <polyline points={`0,${20 - valor*10} 15,${20 - valor*15} 30,${20 - valor*12} 45,${20 - valor*18} 60,${20 - valor*20}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Chart area */}
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px", color: "#1e293b" }}>Evolução do Índice (2020-2024)</h3>
              
              <div style={{ position: "relative", width: "100%", height: "250px" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                  <span>100</span><span>70</span><span>60</span><span>40</span><span>20</span><span>0</span>
                </div>
                <div style={{ position: "absolute", left: "25px", right: 0, top: "6px", bottom: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: "100%", height: "1px", background: "#f1f5f9" }}></div>
                  ))}
                </div>
                <div style={{ position: "absolute", left: "25px", right: 0, bottom: 0, display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                  <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span>
                </div>
                <svg style={{ position: "absolute", left: "25px", right: 0, top: "6px", width: "calc(100% - 25px)", height: "calc(100% - 26px)", overflow: "visible" }} preserveAspectRatio="none">
                  {(selectedRegionIds.length > 0 ? mapData.filter(r => selectedRegionIds.includes(r.regiao)) : mapData.slice(0, 3)).map((regiao, idx) => {
                    const colors = ["#4caf50", "#2196f3", "#9c27b0", "#ff9800", "#f44336", "#00bcd4"];
                    const color = colors[idx % colors.length];
                    
                    let valor = 0;
                    if (activeIndicatorId === 'saude_mental') valor = regiao.indicadores.saude_mental;
                    else if (activeIndicatorId === 'empregabilidade') valor = regiao.indicadores.empregabilidade;
                    else if (activeIndicatorId === 'formacoes') valor = regiao.indicadores.formacoes;
                    
                    // Generate pseudo-random historical data based on current value
                    const v24 = Math.max(10, 200 - (valor * 200)); // y-axis is inverted (0 is top)
                    const v23 = Math.max(10, Math.min(200, v24 + (Math.random() * 40 - 20)));
                    const v22 = Math.max(10, Math.min(200, v23 + (Math.random() * 40 - 20)));
                    const v21 = Math.max(10, Math.min(200, v22 + (Math.random() * 40 - 20)));
                    const v20 = Math.max(10, Math.min(200, v21 + (Math.random() * 40 - 20)));
                    
                    const p1 = `0,${v20}`;
                    const p2 = `212,${v21}`;
                    const p3 = `425,${v22}`;
                    const p4 = `637,${v23}`;
                    const p5 = `850,${v24}`;
                    
                    return (
                      <g key={regiao.regiao}>
                        <polyline points={`${p1} ${p2} ${p3} ${p4} ${p5}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="0" cy={v20} r="3" fill={color} />
                        <circle cx="212" cy={v21} r="3" fill={color} />
                        <circle cx="425" cy={v22} r="3" fill={color} />
                        <circle cx="637" cy={v23} r="3" fill={color} />
                        <circle cx="850" cy={v24} r="3" fill={color} />
                      </g>
                    );
                  })}
                </svg>
                <div style={{ position: "absolute", top: "-20px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "15px", fontSize: "12px", color: "#64748b", flexWrap: "wrap" }}>
                  {(selectedRegionIds.length > 0 ? mapData.filter(r => selectedRegionIds.includes(r.regiao)) : mapData.slice(0, 3)).map((regiao, idx) => {
                    const colors = ["#4caf50", "#2196f3", "#9c27b0", "#ff9800", "#f44336", "#00bcd4"];
                    return (
                      <div key={regiao.regiao} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div style={{ width: 8, height: 8, background: colors[idx % colors.length], borderRadius: "50%" }}></div> 
                        {regiao.nome_exibicao.split(' — ')[0]}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "20px", marginTop: "20px", maxWidth: "1000px", margin: "20px auto 0", flexWrap: "wrap" }}>
            {(selectedRegionIds.length > 0 ? mapData.filter(r => selectedRegionIds.includes(r.regiao)) : mapData.slice(0, 3)).map((regiao) => (
              <div key={regiao.regiao} style={{ flex: 1, minWidth: "250px", background: "rgba(255,255,255,0.9)", borderRadius: "12px", padding: "20px", minHeight: "150px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: 0 }}>Gráfico Adicional - {regiao.nome_exibicao.split(' — ')[0]}</h3>
              </div>
            ))}
          </div>
        </main>

        <ChatPopover />
      </div>
      <ReloadPrompt />
    </div>
  );
}
