import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { getStoredUser, setSession } from "../services/api";
import "./Navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    setSession(null);
    navigate("/login");
  }

  return (
    <nav className="app-navbar">
      <div className="navbar-left">
        <img src="/img/Logo Definitiva.svg" alt="AppBiT Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink 
          to="/painel" 
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Painel
          <div className="active-indicator"></div>
        </NavLink>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Mapa
          <div className="active-indicator"></div>
        </NavLink>
        <NavLink 
          to="/consulta-ia" 
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Consulta IA
          <div className="active-indicator"></div>
        </NavLink>
      </div>

      <div className="navbar-right">
        <span className="navbar-user-name">{user?.name ?? "Usuário"}</span>
        <NavLink to="/profile" className="profile-link">
          <div className="profile-avatar">
            {/* Fallback avatar if no image */}
            <span className="profile-initial">
              {(user?.name ?? "U").charAt(0).toUpperCase()}
            </span>
          </div>
        </NavLink>
        <button
          type="button"
          className="navbar-logout"
          onClick={handleLogout}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}
