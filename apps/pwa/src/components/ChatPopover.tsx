import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import MarkdownMessage from "./MarkdownMessage";
import { useDashboard } from "../contexts/DashboardContext";
import "./ChatPopover.css";

export function ChatPopover() {
  const {
    aiMessages,
    isAiLoading,
    sendAiMessage,
  } = useDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const [textoInput, setTextoInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, isOpen]);

  const lidarComConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoInput.trim() || isAiLoading) return;

    const question = textoInput.trim();
    setTextoInput("");
    await sendAiMessage(question);
  };

  return (
    <div className="chat-popover-container">
      {isOpen && (
        <div className="chat-popover-window">
          {/* Header */}
          <div className="chat-popover-header">
            <h3>AI Chat</h3>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <img src="/img/x icone.svg" alt="Fechar" className="close-icon" />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-popover-messages">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.autor === "usuario" ? "msg-user" : "msg-ia"}`}
              >
                <div className="chat-message-bubble">
                  <strong>{msg.autor === "usuario" ? "Eu" : "IA"}:</strong>{" "}
                  {msg.autor === "ia" ? (
                    <MarkdownMessage texto={msg.texto} />
                  ) : (
                    msg.texto
                  )}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="chat-message msg-ia">
                <div className="chat-message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="chat-popover-input-area">
            <form onSubmit={lidarComConsulta} className="chat-input-form">
              <input
                type="text"
                value={textoInput}
                onChange={(e) => setTextoInput(e.target.value)}
                placeholder="Pergunte a IA..."
                className="chat-input-field"
                disabled={isAiLoading}
              />
              <button type="submit" className="chat-send-btn" disabled={isAiLoading}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB */}
      <button 
        className={`chat-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <img src="/img/x icone.svg" alt="Fechar Chat" className="fab-icon" />
        ) : (
          <img src="/img/chat icone.svg" alt="Abrir Chat" className="fab-icon" />
        )}
      </button>
    </div>
  );
}
