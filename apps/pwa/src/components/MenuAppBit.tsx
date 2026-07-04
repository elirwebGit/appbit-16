import { Briefcase, GraduationCap, MapPin, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export function MenuAppBit() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: "#fff",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link
            to="/regions"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <MapPin size={20} /> Regiões
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/employability"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Briefcase size={20} /> Empregabilidade
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/formations"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <GraduationCap size={20} /> Formações
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/mental-health"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <ShieldAlert size={20} /> Saúde Mental
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <ShieldAlert size={20} /> Histórico de Análises
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
