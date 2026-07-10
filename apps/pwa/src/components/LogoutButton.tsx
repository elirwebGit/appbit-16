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
      className="logout-btn"
      aria-label="Sair"
    >
      <LogOut size={18} />
      Sair
    </button>
  );
}
