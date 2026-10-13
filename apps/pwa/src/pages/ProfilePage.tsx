import { useEffect, useState } from "react";
import { ChevronLeft, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMe, getStoredUser, setSession, type AuthUser } from "../services/api";
import "./Profile.css";

function formatBirthDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd} / ${mm} / ${d.getUTCFullYear()}`;
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => { /* mantém o usuário da sessão */ });
  }, []);

  function handleLogout() {
    setSession(null);
    navigate("/login");
  }

  return (
    <main className="profile-page">
      <div className="profile-page-bg" />

      <div className="profile-content">
        <button className="profile-back-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </button>

        <h1 className="profile-title">Perfil de Usuário</h1>

        <section className="profile-card">
          <div className="profile-card-header">
            <button className="profile-edit-button" type="button">
              <Pencil size={18} />
              <span>Editar Perfil</span>
            </button>
            <div className="profile-avatar-container">
              <img src="https://placehold.co/137x137" alt="Avatar" className="profile-avatar-img" />
              <button className="profile-avatar-edit" type="button">
                <Pencil size={14} color="#fff" />
              </button>
            </div>
          </div>

          <div className="profile-card-body">
            <h2 className="profile-name">{user?.name ?? "Usuário"}</h2>

            <div className="profile-details">
              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Data de Nascimento:</span>
                </div>
                <span className="profile-detail-value">{formatBirthDate(user?.birthDate)}</span>
              </div>

              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">País:</span>
                </div>
                <span className="profile-detail-value">{user?.country ?? "—"}</span>
              </div>

              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Cargo:</span>
                </div>
                <span className="profile-detail-value">{user?.jobTitle ?? user?.role ?? "—"}</span>
              </div>

              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Instituição:</span>
                </div>
                <span className="profile-detail-value">{user?.institution ?? "—"}</span>
              </div>

              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Email:</span>
                </div>
                <span className="profile-detail-value">{user?.email ?? "—"}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="profile-logout"
              style={{ marginTop: "20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <LogOut size={18} />
              <span>Sair da conta</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
