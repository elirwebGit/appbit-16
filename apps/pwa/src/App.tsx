import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ShieldAlert,
  Briefcase,
  GraduationCap,
  MessagesSquare,
  Bot,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Send,
} from "lucide-react";
import MapaVisent from "./components/MapaVisent";
import type { Mensagem } from "./types/visent";
import OfflineBanner from "./components/OfflineBanner";
import ReloadPrompt from "./components/ReloadPrompt";
import { analyzeQuestion } from "./services/api";
import MarkdownMessage from "./components/MarkdownMessage";

export default function App() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: "ia",
      texto:
        "Painel Vísent AI carregado. Faça uma consulta sobre SP, RJ ou indicadores regionais.",
    },
  ]);

  const [textoInput, setTextoInput] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [iaWidth, setIaWidth] = useState(350);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(window.innerWidth > 768);
  const [isDesktopChatOpen, setIsDesktopChatOpen] = useState(true);

  // Mobile: chat open/close
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Desktop: track if chat is in overlay mode (expanded beyond default)
  const DEFAULT_CHAT_WIDTH = 350;

  const iaRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Monitor screen resize to toggle mobile mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mouse move during dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate new width based on the left edge of the content area
      // The sidebar is 260px + 1px border, and the chat starts at the left of the content area
      const sidebarWidth = 261; // 260px sidebar + 1px border
      const newWidth = e.clientX - sidebarWidth;

      // Limits: min 300px, max 60% of the screen
      const minWidth = 300;
      const maxWidth = window.innerWidth * 0.6;
      const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      setIaWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const toggleMobileExpand = () => {
    setIsMobileExpanded((prev) => !prev);
  };

  const lidarComConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoInput.trim()) return;

    const novaMsgUsuario: Mensagem = {
      id: Date.now(),
      autor: "usuario",
      texto: textoInput,
    };

    setMensagens((prev) => [...prev, novaMsgUsuario]);

    const pergunta = textoInput;
    setTextoInput("");

    try {
      const response = await analyzeQuestion(pergunta);

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

  // Whether the desktop chat is expanded beyond default (overlay mode)
  const isDesktopOverlay = !isMobile && iaWidth > DEFAULT_CHAT_WIDTH;

  // --- Chat panel content (shared between desktop and mobile) ---
  const chatContent = (
    <>
      {/* Chat header */}
      <div
        style={{
          padding: isMobile ? "8px 16px 12px" : "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: isMobile ? "pointer" : "default",
          borderBottom: "1px solid #334155",
          userSelect: "none",
          flexShrink: 0,
        }}
        onClick={isMobile ? toggleMobileExpand : undefined}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Bot size={18} style={{ color: "#38bdf8" }} />
          <span style={{ fontWeight: "bold", fontSize: "14px", letterSpacing: "0.5px" }}>
            IA Analítica
          </span>
        </div>
        {isMobile && (
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
          >
            {isMobileExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        )}
        {!isMobile && (
          <button
            type="button"
            onClick={() => setIsDesktopChatOpen(false)}
            title="Fechar chat"
            style={{
              background: "transparent",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 4,
              transition: "opacity 0.2s",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            style={{
              margin: "8px 0",
              padding: 10,
              background: msg.autor === "usuario" ? "#0284c7" : "#1e293b",
              borderLeft: msg.autor === "ia" ? "3px solid #38bdf8" : "none",
              borderRadius: isMobile ? 8 : 4,
              fontSize: isMobile ? "14px" : "14px",
              lineHeight: 1.5,
            }}
          >
            {msg.autor === "ia" ? (
              <MarkdownMessage texto={msg.texto} />
            ) : (
              msg.texto
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input (inside chat panel for both modes) */}
      <form
        onSubmit={lidarComConsulta}
        style={{
          display: "flex",
          gap: 10,
          padding: "12px 16px",
          backgroundColor: isMobile ? "rgba(30, 41, 59, 0.4)" : "#1e293b",
          borderTop: "1px solid #334155",
          borderBottomLeftRadius: isMobile ? 16 : 0,
          borderBottomRightRadius: isMobile ? 16 : 0,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            background: isMobile ? "rgba(15, 23, 42, 0.6)" : "#0f172a",
            border: isMobile
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid #334155",
            borderRadius: "24px",
            padding: "4px 16px",
            gap: 8,
          }}
        >
          {!isMobile && <MessagesSquare size={16} style={{ color: "#64748b", flexShrink: 0 }} />}
          <input
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            placeholder="Pergunte sobre regiões, emprego, conectividade..."
            style={{
              flex: 1,
              padding: "8px 0",
              background: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "none",
              color: "#38bdf8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        fontFamily: "sans-serif",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 150,
          }}
        />
      )}

      {/* ===== Left Sidebar ===== */}
      <aside
        style={{
          boxSizing: "border-box",
          width: isMobile ? "260px" : (isLeftSidebarOpen ? "260px" : "0px"),
          backgroundColor: "#1e293b",
          padding: isMobile ? "20px" : (isLeftSidebarOpen ? "20px" : "0px"),
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
          boxShadow:
            isMobile && isLeftSidebarOpen
              ? "5px 0 15px rgba(0,0,0,0.5)"
              : "none",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#38bdf8",
              margin: 0,
            }}
          >
            App BiT — B2G
          </h2>
          {isMobile && (
            <button
              onClick={() => setIsLeftSidebarOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#9ca3af",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <GraduationCap size={20} /> Formações
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Briefcase size={20} /> Empregabilidade
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <MapPin size={20} /> Iniciativas
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <ShieldAlert size={20} /> Saúde Mental
          </div>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #334155",
            justifyContent: isMobile ? "center" : "space-between",
            position: "relative",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", position: isMobile ? "absolute" : "static", left: isMobile ? 20 : "auto" }}>
            <button
              onClick={() => {
                const newState = !isLeftSidebarOpen;
                setIsLeftSidebarOpen(newState);
                if (isMobile && newState) {
                  setIsChatOpen(false);
                  setIsMobileExpanded(false);
                }
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#f8fafc",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                marginRight: isMobile ? 0 : 20,
              }}
            >
              <Menu size={24} />
            </button>
          </div>
          <h1
            style={{
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Painel Vísent CDRView
          </h1>
          {!isMobile && (
            <span style={{ background: "#0284c7", padding: "3px 8px", borderRadius: 4 }}>
              MVP
            </span>
          )}
        </header>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* ===== DESKTOP CHAT PANEL ===== */}
          {!isMobile && isDesktopChatOpen && (
            <div
              ref={iaRef}
              style={{
                width: iaWidth,
                backgroundColor: "#111827",
                borderRight: "1px solid #334155",
                display: "flex",
                flexDirection: "column",
                position: isDesktopOverlay ? "absolute" : "relative",
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: isDesktopOverlay ? 40 : 1,
                boxShadow: isDesktopOverlay
                  ? "4px 0 20px rgba(0, 0, 0, 0.5)"
                  : "none",
                transition: isDragging
                  ? "none"
                  : "box-shadow 0.3s ease",
                flexShrink: 0,
              }}
            >
              {chatContent}

              {/* Drag Handle */}
              <div
                onMouseDown={handleMouseDown}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: -4,
                  bottom: 0,
                  width: 8,
                  cursor: "col-resize",
                  zIndex: 50,
                  backgroundColor:
                    isHovered || isDragging ? "#38bdf8" : "transparent",
                  transition: "background-color 0.2s",
                }}
              />
            </div>
          )}

          {/* ===== MAP ===== */}
          <div style={{ flex: 1, position: "relative", minWidth: 0, zIndex: 0 }}>
            <MapaVisent />
          </div>

          {/* ===== MOBILE CHAT BACKDROP ===== */}
          {isMobile && isChatOpen && (
            <div
              onClick={() => {
                setIsChatOpen(false);
                setIsMobileExpanded(false);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(2px)",
                zIndex: 30,
              }}
            />
          )}

          {/* ===== MOBILE CHAT (Bottom Sheet) ===== */}
          {isMobile && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: isMobileExpanded
                  ? "calc(100% - 16px)"
                  : "min(360px, calc(100% - 16px))",
                top: isChatOpen
                  ? isMobileExpanded
                    ? 8
                    : "calc(100% - 320px)"
                  : "calc(100% + 10px)",
                bottom: isChatOpen ? 8 : "auto",
                height: isChatOpen ? undefined : 0,
                backgroundColor: "rgba(17, 24, 39, 0.92)",
                backdropFilter: "blur(12px) saturate(180%)",
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 -4px 30px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5)",
                zIndex: 40,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition:
                  "top 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s ease, bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                opacity: isChatOpen ? 1 : 0,
                pointerEvents: isChatOpen ? "auto" : "none",
              }}
            >
              {/* Top pill indicator */}
              <div
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: "#4b5563",
                  borderRadius: 2,
                  margin: "8px auto 4px",
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />

              {chatContent}
            </div>
          )}

          {/* ===== FAB (open/close chat) ===== */}
          {((isMobile) || (!isMobile && !isDesktopChatOpen)) && (
            <button
              onClick={() => {
                if (isMobile) {
                  if (!isChatOpen) {
                    setIsChatOpen(true);
                    setIsLeftSidebarOpen(false); // Fecha a sidebar ao abrir o chat
                  } else {
                    setIsChatOpen(false);
                    setIsMobileExpanded(false);
                  }
                } else {
                  setIsDesktopChatOpen(true);
                }
              }}
              style={{
                position: "absolute",
                bottom: isMobile && isChatOpen ? -60 : 20,
                right: 20,
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(2, 132, 199, 0.4)",
                zIndex: 35,
                transition: "bottom 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(2, 132, 199, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(2, 132, 199, 0.4)";
              }}
            >
              {isMobile && isChatOpen ? <X size={24} /> : <Bot size={24} />}
            </button>
          )}
        </div>
        </main>
      </div>

      <ReloadPrompt />
    </div>
  );
}
