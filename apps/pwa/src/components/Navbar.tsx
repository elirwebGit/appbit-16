import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
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
        <NavLink to="/profile" className="profile-link">
          <div className="profile-avatar">
            {/* Fallback avatar if no image */}
            <span className="profile-initial">U</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
