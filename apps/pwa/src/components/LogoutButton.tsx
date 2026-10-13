import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { setSession } from "../services/api";

export function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    setSession(null);
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
