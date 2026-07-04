import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      <LogOut size={18} />
      Sair
    </button>
  );
}
