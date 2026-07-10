import { useState } from "react";
import { Download } from "lucide-react";
import OfflineBanner from "../components/OfflineBanner";
import MapaVisent from "../components/MapaVisent";
import ReloadPrompt from "../components/ReloadPrompt";
import { Navbar } from "../components/Navbar";

import { RegionCard, IndicatorCard, HistoryCard } from "../components/SidebarCards";
import { ChatPopover } from "../components/ChatPopover";
import { ExportPopover } from "../components/ExportPopover";
import { useDashboard } from "../contexts/DashboardContext";

function DashboardContent() {
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

        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
          <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
            <MapaVisent />
          </div>
          
          <ChatPopover />
        </main>

      </div>

      <ReloadPrompt />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardContent />
  );
}
