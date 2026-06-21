import { useState } from "react";
import {
  MapPin,
  ShieldAlert,
  Briefcase,
  GraduationCap,
  MessagesSquare,
  Bot,
} from "lucide-react";
import MapaVisent from "./components/MapaVisent";
import type { Mensagem } from "./types/visent";
import OfflineBanner from "./components/OfflineBanner";
import ReloadPrompt from "./components/ReloadPrompt";
import { analyzeQuestion } from "./services/api";

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
    } catch (error) {
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

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#1e293b",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          borderRight: "1px solid #334155",
        }}
      >
        <h2
          style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#38bdf8" }}
        >
          App BiT — B2G
        </h2>

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

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #334155",
            justifyContent: "space-between",
          }}
        >
          <h1>Painel Vísent CDRView</h1>
          <span style={{ background: "#0284c7", padding: "3px 8px" }}>MVP</span>
        </header>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* IA */}
          <div
            style={{
              width: 350,
              backgroundColor: "#111827",
              borderRight: "1px solid #334155",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: 10, display: "flex", gap: 8 }}>
              <Bot size={18} /> IA Analítica
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    margin: "8px 0",
                    padding: 10,
                    background: msg.autor === "usuario" ? "#0284c7" : "#1e293b",
                    borderLeft:
                      msg.autor === "ia" ? "3px solid #38bdf8" : "none",
                  }}
                >
                  {msg.texto}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ flex: 1 }}>
            <MapaVisent />
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={lidarComConsulta}
          style={{
            display: "flex",
            gap: 10,
            padding: 20,
            backgroundColor: "#1e293b",
          }}
        >
          <MessagesSquare />
          <input
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            placeholder="Pergunte sobre regiões, emprego, conectividade..."
            style={{
              flex: 1,
              padding: 10,
              background: "#0f172a",
              color: "#fff",
            }}
          />
          <button type="submit" style={{ padding: "10px 15px" }}>
            Consultar
          </button>
        </form>
      </main>

      <ReloadPrompt />
    </div>
  );
}
