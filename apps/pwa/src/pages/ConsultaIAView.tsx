import { useState, useEffect, useRef } from "react";
import { Bot, Send, X } from "lucide-react";
import type { Mensagem } from "../types/visent";
import { getDashboard } from "../services/api";
import MarkdownMessage from "../components/MarkdownMessage";
import OfflineBanner from "../components/OfflineBanner";
import ReloadPrompt from "../components/ReloadPrompt";
import { Topbar } from "../components/Topbar";
import { MenuAppBit } from "../components/MenuAppBit";

// Mock data based on the design reference
const historyMock = [
  { id: 1, title: "Nome Exp. 1", subtitle: "São Paulo - Luanda\nSaúde Mental", date: "00/00/0000" },
  { id: 2, title: "Nome Exp. 2", subtitle: "Região X\nIndicadores", date: "00/00/0000" },
  { id: 3, title: "Nome Exp. 3", subtitle: "Região Y e Região X\nIndicadores", date: "00/00/0000" },
  { id: 4, title: "Nome Exp. 4", subtitle: "Região X\nIndicadores", date: "00/00/0000" },
];

export function ConsultaIAView() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: "ia",
      texto: "Teste resposta chat IA...",
    },
  ]);

  const [textoInput, setTextoInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(window.innerWidth > 768);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lidarComConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoInput.trim()) return;

    const novaMsgUsuario: Mensagem = {
      id: Date.now(),
      autor: "usuario",
      texto: textoInput,
    };

    setMensagens((prev) => [...prev, novaMsgUsuario]);
    setTextoInput("");

    try {
      const response = await getDashboard();

      const respostaIA: Mensagem = {
        id: Date.now() + 1,
        autor: "ia",
        texto: response.answer ?? "Sem resposta da IA",
      };

      setMensagens((prev) => [...prev, respostaIA]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          autor: "ia",
          texto: "Erro ao conectar com o backend.",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#E7E7E7",
        color: "#212121",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <OfflineBanner />

      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative", width: "100%" }}>
        {/* ===== Left Sidebar Backdrop (Mobile only) ===== */}
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

        {/* ===== Left Sidebar (Global Navigation) ===== */}
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
                style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
              >
                <X size={20} />
              </button>
            )}
          </div>
          <MenuAppBit />
        </aside>

        {/* ===== Main ===== */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, backgroundColor: "#E7E7E7" }}>
          <Topbar title="Consulta IA" isMobile={isMobile} onMenuClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} />

          {/* Content area: History + Main Search/Insights + Chat */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              overflowY: "auto",
              padding: "20px",
              gap: "20px",
            }}
          >
            {/* History Panel */}
            <div
              style={{
                width: isMobile ? "100%" : "340px",
                backgroundColor: "white",
                borderRadius: "13px",
                boxShadow: "0px 5px 9px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 600, textAlign: "center", marginBottom: "20px" }}>Histórico</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {historyMock.map((item) => (
                  <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
                    <h4 style={{ fontSize: "17px", fontWeight: 600, margin: 0 }}>{item.title}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "#555" }}>
                      <span style={{ whiteSpace: "pre-wrap" }}>{item.subtitle}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Area: Search and Insights */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                alignItems: "center",
                padding: isMobile ? "0" : "20px",
              }}
            >
              <h2 style={{ fontSize: "32px", fontWeight: 600, textAlign: "center", color: "#040404", marginTop: "40px" }}>
                Consulte a IA e Investigue
              </h2>

              {/* Main Input */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "830px",
                  backgroundColor: "#FBFBFB",
                  borderRadius: "55px",
                  boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.1)",
                  padding: "12px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Bot size={24} style={{ color: "#888" }} />
                <input
                  type="text"
                  placeholder="Pergunte a IA: Como está a situação de São Paulo?"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    fontSize: "20px",
                    outline: "none",
                    color: "#3C3C3C",
                  }}
                />
              </div>

              {/* Insights Rápidos */}
              <div style={{ width: "100%", maxWidth: "830px", marginTop: "40px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#212121", marginBottom: "20px" }}>Insights Rápidos</h3>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "211px",
                        height: "103px",
                        backgroundColor: "#ddd",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      Insight {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Chat Panel */}
            <div
              style={{
                width: isMobile ? "100%" : "340px",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                borderRadius: "13px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <div style={{ padding: "16px", borderBottom: "1px solid #eee", textAlign: "center" }}>
                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#535353", margin: 0 }}>AI Chat</h3>
              </div>

              {/* Messages Area */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: msg.autor === "usuario" ? "flex-end" : "flex-start",
                      backgroundColor: msg.autor === "usuario" ? "#F0E389" : "#F6F7BF",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      maxWidth: "85%",
                      fontSize: "16px",
                      lineHeight: 1.4,
                      color: "#292929",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{msg.autor === "ia" ? "IA: " : "Eu: "}</span>
                    {msg.autor === "ia" ? <MarkdownMessage texto={msg.texto} /> : msg.texto}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div style={{ padding: "16px", borderTop: "1px solid #eee" }}>
                <form
                  onSubmit={lidarComConsulta}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                  }}
                >
                  <input
                    value={textoInput}
                    onChange={(e) => setTextoInput(e.target.value)}
                    placeholder="Pergunte a IA..."
                    style={{
                      flex: 1,
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontSize: "16px",
                      color: "#292929",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#292929",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                    }}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ReloadPrompt />
    </div>
  );
}
