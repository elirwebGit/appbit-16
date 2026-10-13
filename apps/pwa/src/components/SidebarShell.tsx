import { useState, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "./SidebarShell.css";

/**
 * Coluna lateral responsiva. No desktop é uma barra fixa;
 * no mobile vira um drawer off-canvas com botão de abrir.
 */
export function SidebarShell({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    return <aside className="app-sidebar">{children}</aside>;
  }

  return (
    <>
      <button className="app-sidebar-toggle" onClick={() => setOpen(true)} aria-label="Abrir filtros">
        <SlidersHorizontal size={16} />
        <span>Filtros</span>
      </button>

      {open && <div className="app-sidebar-backdrop" onClick={() => setOpen(false)} />}

      <aside className={`app-sidebar app-sidebar--drawer ${open ? "open" : ""}`}>
        <button className="app-sidebar-close" onClick={() => setOpen(false)} aria-label="Fechar filtros">
          Fechar
        </button>
        {children}
      </aside>
    </>
  );
}
