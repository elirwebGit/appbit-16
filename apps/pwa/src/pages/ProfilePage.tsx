import { ChevronLeft, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, setSession } from "../services/api";
import "./Profile.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    setSession(null);
    navigate("/login");
  }

  return (
    <main className="profile-page">
      {/* Background layer */}
      <div className="profile-page-bg" />

      {/* Main Content */}
      <div className="profile-content">
        <button
          className="profile-back-button"
          onClick={() => navigate(-1)}
          type="button"
        >
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
              <img
                src="https://placehold.co/137x137"
                alt="Avatar"
                className="profile-avatar-img"
              />
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
                <span className="profile-detail-value">00 / 00 / 0000</span>
              </div>
              
              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">País:</span>
                </div>
                <span className="profile-detail-value">Angola / Brasil</span>
              </div>
              
              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Cargo:</span>
                </div>
                <span className="profile-detail-value">{user?.role ?? "—"}</span>
              </div>
              
              <div className="profile-detail-row">
                <div className="profile-detail-label-wrapper">
                  <span className="profile-detail-label">Instituição:</span>
                </div>
                <span className="profile-detail-value">Nome da Instituição</span>
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
              style={{
                marginTop: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
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
