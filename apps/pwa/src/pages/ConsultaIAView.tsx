import { useState } from "react";
import { Bot, Download, RefreshCw, AlertTriangle, TrendingUp, Info, CheckCircle } from "lucide-react";
import OfflineBanner from "../components/OfflineBanner";
import ReloadPrompt from "../components/ReloadPrompt";
import { Navbar } from "../components/Navbar";

import { RegionCard, IndicatorCard, HistoryCard } from "../components/SidebarCards";
import { ChatPopover } from "../components/ChatPopover";
import { ExportPopover } from "../components/ExportPopover";
import { useDashboard } from "../contexts/DashboardContext";
import MarkdownMessage from "../components/MarkdownMessage";
import type { InsightCard } from "../types/visent";

// ── Insight card icon mapping (design system icons, no emojis) ───────────
function InsightIcon({ category }: { category: InsightCard['category'] }) {
  const iconProps = { size: 20, strokeWidth: 2 };
  switch (category) {
    case 'warning': return <AlertTriangle {...iconProps} color="#f59e0b" />;
    case 'alert': return <AlertTriangle {...iconProps} color="#ef4444" />;
    case 'success': return <CheckCircle {...iconProps} color="#22c55e" />;
    case 'info':
    default: return <Info {...iconProps} color="#3b82f6" />;
  }
}

function insightCategoryStyle(category: InsightCard['category']) {
  switch (category) {
    case 'warning': return { borderLeft: '4px solid #f59e0b', background: '#fffbeb' };
    case 'alert': return { borderLeft: '4px solid #ef4444', background: '#fef2f2' };
    case 'success': return { borderLeft: '4px solid #22c55e', background: '#f0fdf4' };
    case 'info':
    default: return { borderLeft: '4px solid #3b82f6', background: '#eff6ff' };
  }
}

export function ConsultaIAView() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { 
    mapData, 
    selectedRegionIds, 
    toggleRegion, 
    activeIndicatorId,
    setIndicator, 
    historyItems,
    aiInsights,
    isAiLoading,
    addRegion,
    removeRegion,
    generateInsights,
    sendAiMessage,
    aiMessages,
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim() || isAiLoading) return;
    
    const question = searchInput.trim();
    setSearchInput("");
    await sendAiMessage(question);
    
    // Show the latest AI response in the main content area
    // The response will be the last IA message after sendAiMessage completes
  };

  // Get latest AI response from the shared message history
  const latestIaMessages = aiMessages.filter(m => m.autor === 'ia' && m.id !== 1);
  const lastResponse = latestIaMessages.length > 0 ? latestIaMessages[latestIaMessages.length - 1] : null;

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

        <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", overflowY: "auto", position: "relative" }}>
          
          <h2 style={{ fontSize: "32px", fontWeight: 600, textAlign: "center", color: "#040404", marginTop: "40px" }}>
            Consulte a IA e Investigue
          </h2>

          {/* Main Input */}
          <form
            onSubmit={handleSearch}
            style={{
              width: "100%",
              maxWidth: "830px",
              backgroundColor: "#ffffff",
              borderRadius: "55px",
              boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.05)",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "40px"
            }}
          >
            <Bot size={24} style={{ color: "#888", flexShrink: 0 }} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Pergunte a IA: Como está a situação de São Paulo?"
              disabled={isAiLoading}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: "18px",
                outline: "none",
                color: "#334155",
              }}
            />
            <button 
              type="submit" 
              disabled={isAiLoading}
              style={{
                background: isAiLoading ? '#cbd5e1' : '#0284c7',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: isAiLoading ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <Bot size={20} />
            </button>
          </form>

          {/* AI Loading indicator */}
          {isAiLoading && (
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#64748b',
              fontSize: '14px' 
            }}>
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
              <span>Processando consulta...</span>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Latest AI Response */}
          {lastResponse && !isAiLoading && (
            <div style={{
              width: "100%",
              maxWidth: "830px",
              marginTop: "30px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
              padding: "24px",
              border: "1px solid #e2e8f0",
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <Bot size={20} style={{ color: '#0284c7' }} />
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '15px' }}>Resposta da IA</span>
              </div>
              <MarkdownMessage texto={lastResponse.texto} />
            </div>
          )}

          {/* Insights Rápidos */}
          <div style={{ width: "100%", maxWidth: "830px", marginTop: "60px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1e293b", margin: 0 }}>Insights Rápidos</h3>
              <button 
                onClick={generateInsights}
                disabled={isAiLoading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: isAiLoading ? "#cbd5e1" : "#8AC475",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isAiLoading ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.2s",
                }}
              >
                <RefreshCw size={14} />
                Atualizar Insights
              </button>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {aiInsights.length > 0 ? (
                aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    style={{
                      flex: "1 1 240px",
                      minHeight: "120px",
                      borderRadius: "12px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      ...insightCategoryStyle(insight.category),
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <InsightIcon category={insight.category} />
                      <span style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>
                        {insight.title}
                      </span>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '13px', 
                      lineHeight: '1.5', 
                      color: '#475569' 
                    }}>
                      {insight.body}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ 
                  color: "#64748b", 
                  fontStyle: "italic",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <TrendingUp size={16} />
                  Clique em "Atualizar Insights" para gerar análises baseadas nos filtros atuais.
                </div>
              )}
            </div>
          </div>

        </main>

        <ChatPopover />
      </div>
      <ReloadPrompt />
    </div>
  );
}
