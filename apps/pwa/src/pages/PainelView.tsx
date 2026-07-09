import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Download,
  ChevronDown,
  X
} from "lucide-react";
import OfflineBanner from "../components/OfflineBanner";
import { Topbar } from "../components/Topbar";
import { MenuAppBit } from "../components/MenuAppBit";
import ReloadPrompt from "../components/ReloadPrompt";

export default function PainelView() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(
    window.innerWidth > 768,
  );
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportName, setExportName] = useState("Nomear");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        fontFamily: "var(--app-font-family)",
        backgroundColor: "var(--app-color-page, #e7e7e7)",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <OfflineBanner />

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          position: "relative",
          width: "100%",
        }}
      >
        {isMobile && isLeftSidebarOpen && (
          <div
            onClick={() => setIsLeftSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 150,
            }}
          />
        )}

        {/* Sidebar */}
        <aside
          style={{
            boxSizing: "border-box",
            width: isMobile ? "260px" : isLeftSidebarOpen ? "260px" : "0px",
            backgroundColor: "#1e293b",
            padding: isMobile ? "20px" : isLeftSidebarOpen ? "20px" : "0px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderRight: isMobile || isLeftSidebarOpen ? "1px solid #334155" : "none",
            position: isMobile ? "fixed" : "relative",
            top: 0,
            left: isMobile ? (isLeftSidebarOpen ? 0 : "-260px") : 0,
            height: isMobile ? "100vh" : "auto",
            zIndex: isMobile ? 200 : "auto",
            transition: "width 0.3s ease, padding 0.3s ease, left 0.3s ease",
            boxShadow: isMobile && isLeftSidebarOpen ? "5px 0 15px rgba(0,0,0,0.5)" : "none",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#38bdf8", margin: 0 }}>
              App BiT — B2G
            </h2>
            {isMobile && (
              <button
                onClick={() => setIsLeftSidebarOpen(false)}
                style={{
                  background: "transparent", border: "none", color: "#9ca3af",
                  cursor: "pointer", padding: 4, display: "flex", alignItems: "center"
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
          <MenuAppBit />
        </aside>

        {/* Main */}
        <main
          style={{
            flex: 1, display: "flex", flexDirection: "column", minWidth: 0,
          }}
        >
          <Topbar
            title="Painel"
            isMobile={isMobile}
            onMenuClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          />
          
          <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
            {/* Left Inner Sidebar (Indicadores, Historico) */}
            <div style={{ 
              width: "250px", 
              backgroundColor: "var(--app-color-surface, #ffffff)", 
              borderRight: "1px solid var(--app-color-border-soft, #e0e0e0)",
              padding: "20px",
              display: isMobile ? "none" : "flex",
              flexDirection: "column",
              gap: "20px",
              flexShrink: 0,
              boxShadow: "var(--app-shadow-lg)",
              zIndex: 10
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", fontWeight: "600", color: "var(--app-color-text-strong)" }}>
                  <div style={{ background: "var(--app-color-region)", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={16} color="white" />
                  </div>
                  Regiões
                </div>
                <ChevronDown size={18} color="#666" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", fontWeight: "600", color: "var(--app-color-text-strong)" }}>
                  <div style={{ background: "var(--app-color-indicator)", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 14, background: "#282828", borderRadius: 2 }}></div>
                  </div>
                  Indicadores
                </div>
                <ChevronDown size={18} color="#666" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", fontWeight: "600", color: "var(--app-color-text-strong)" }}>
                  <div style={{ background: "var(--app-color-export)", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={16} color="white" />
                  </div>
                  Histórico
                </div>
                <ChevronDown size={18} color="#666" />
              </div>

              <div style={{ flex: 1 }}></div>

              {/* Export Button Area */}
              <div style={{ position: "relative" }}>
                {showExportModal && (
                  <div style={{ 
                    position: "absolute", bottom: "50px", left: 0, 
                    background: "rgba(246, 246, 246, 0.95)",
                    boxShadow: "var(--app-shadow-md)",
                    borderRadius: "12px", padding: "15px",
                    width: "280px", display: "flex", flexDirection: "column", gap: "10px"
                  }}>
                    <div style={{ textAlign: "center", fontWeight: "600", color: "var(--app-color-text-strong)", fontSize: "14px" }}>Exportar</div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input 
                        type="text" 
                        value={exportName} 
                        onChange={(e) => setExportName(e.target.value)}
                        style={{ flex: 1, padding: "5px 10px", borderRadius: "8px", border: "1px solid #A7A7A7", fontSize: "14px", outline: "none" }}
                      />
                      <select style={{ padding: "5px", borderRadius: "8px", border: "1px solid #A7A7A7", fontSize: "14px", background: "transparent", outline: "none" }}>
                        <option>PNG</option>
                        <option>PDF</option>
                      </select>
                      <button style={{ background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Download size={16} color="#242424" />
                      </button>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => setShowExportModal(!showExportModal)}
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    boxShadow: "var(--app-shadow-md)",
                    borderRadius: "12px",
                    border: "none",
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontWeight: "600",
                    color: "var(--app-color-text-strong)",
                    cursor: "pointer"
                  }}
                >
                  <Download size={18} /> Exportar
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: "30px", overflowY: "auto", position: "relative" }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                boxShadow: "var(--app-shadow-lg)",
                padding: "30px",
                maxWidth: "1000px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", margin: 0, color: "var(--app-color-text-strong)" }}>
                  Visão geral do Painel - Saúde Mental
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                  {/* Card 1 */}
                  <div style={{ background: "white", borderRadius: "10px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", marginBottom: "8px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#4caf50" }}></div>
                      São Paulo
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                      <span style={{ fontSize: "14px", color: "var(--app-color-text-soft)" }}>Índice: 78 (Alto)</span>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <polyline points="0,15 15,10 30,12 45,5 60,2" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div style={{ background: "white", borderRadius: "10px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", marginBottom: "8px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#2196f3" }}></div>
                      Rio de Janeiro
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                      <span style={{ fontSize: "14px", color: "var(--app-color-text-soft)" }}>Índice: 62 (Médio)</span>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <polyline points="0,18 15,15 30,12 45,8 60,4" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div style={{ background: "white", borderRadius: "10px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", marginBottom: "8px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#9c27b0" }}></div>
                      Luanda
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                      <span style={{ fontSize: "14px", color: "var(--app-color-text-soft)" }}>Índice: 45 (Baixo)</span>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <polyline points="0,10 15,14 30,10 45,12 60,15" fill="none" stroke="#9c27b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Main Chart area */}
                <div style={{ marginTop: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px", color: "var(--app-color-text-strong)" }}>Evolução do Índice de Saúde Mental (2020-2024)</h3>
                  
                  {/* Custom SVG Chart */}
                  <div style={{ position: "relative", width: "100%", height: "250px" }}>
                    {/* Y Axis Labels */}
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "12px", color: "#888" }}>
                      <span>100</span>
                      <span>70</span>
                      <span>60</span>
                      <span>40</span>
                      <span>20</span>
                      <span>0</span>
                    </div>

                    {/* Grid lines */}
                    <div style={{ position: "absolute", left: "25px", right: 0, top: "6px", bottom: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ width: "100%", height: "1px", background: "#eaeaea" }}></div>
                      ))}
                    </div>

                    {/* X Axis Labels */}
                    <div style={{ position: "absolute", left: "25px", right: 0, bottom: 0, display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888" }}>
                      <span>2020</span>
                      <span>2023</span>
                      <span>2024</span>
                    </div>

                    {/* Chart Lines */}
                    <svg style={{ position: "absolute", left: "25px", right: 0, top: "6px", width: "calc(100% - 25px)", height: "calc(100% - 26px)", overflow: "visible" }} preserveAspectRatio="none">
                      {/* SP Line */}
                      <polyline points="0,140 300,100 600,40 850,20" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="0" cy="140" r="3" fill="#4caf50" />
                      <circle cx="300" cy="100" r="3" fill="#4caf50" />
                      <circle cx="600" cy="40" r="3" fill="#4caf50" />
                      <circle cx="850" cy="20" r="3" fill="#4caf50" />

                      {/* RJ Line */}
                      <polyline points="0,150 300,130 600,70 850,80" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="0" cy="150" r="3" fill="#2196f3" />
                      <circle cx="300" cy="130" r="3" fill="#2196f3" />
                      <circle cx="600" cy="70" r="3" fill="#2196f3" />
                      <circle cx="850" cy="80" r="3" fill="#2196f3" />

                      {/* Luanda Line */}
                      <polyline points="0,160 300,165 600,110 850,130" fill="none" stroke="#9c27b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="0" cy="160" r="3" fill="#9c27b0" />
                      <circle cx="300" cy="165" r="3" fill="#9c27b0" />
                      <circle cx="600" cy="110" r="3" fill="#9c27b0" />
                      <circle cx="850" cy="130" r="3" fill="#9c27b0" />
                    </svg>

                    {/* Legend */}
                    <div style={{ position: "absolute", top: "-20px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "15px", fontSize: "12px", color: "var(--app-color-text-soft)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: 8, height: 8, background: "#4caf50", borderRadius: "50%" }}></div> SP</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: 8, height: 8, background: "#2196f3", borderRadius: "50%" }}></div> RJ</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: 8, height: 8, background: "#9c27b0", borderRadius: "50%" }}></div> Luanda</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Cards Row */}
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px", marginTop: "20px", maxWidth: "1000px", margin: "20px auto 0" }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.9)", borderRadius: "12px", padding: "20px", minHeight: "150px", boxShadow: "var(--app-shadow-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--app-color-text-strong)", margin: 0 }}>Gráfico - São Paulo</h3>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.9)", borderRadius: "12px", padding: "20px", minHeight: "150px", boxShadow: "var(--app-shadow-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--app-color-text-strong)", margin: 0 }}>Gráfico - Luanda</h3>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      <ReloadPrompt />
    </div>
  );
}
