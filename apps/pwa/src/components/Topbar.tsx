import { Menu } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

interface TopbarProps {
  title: string;
  isMobile: boolean;
  onMenuClick: () => void;
}

export function Topbar({ title, isMobile, onMenuClick }: TopbarProps) {
  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #334155",
        flexShrink: 0,
      }}
    >
      {/* Lado esquerdo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={onMenuClick}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu size={22} />
        </button>

        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: isMobile ? "18px" : "22px",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Lado direito */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span
          style={{
            background: "#0284c7",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          MVP
        </span>

        <LogoutButton />
      </div>
    </header>
  );
}
