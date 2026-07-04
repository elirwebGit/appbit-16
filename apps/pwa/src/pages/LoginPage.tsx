import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    // Login fake
    if (email === "admin@appbit.com" && password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
      return;
    }

    setError("Usuário ou senha inválidos.");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          width: 420,
          background: "#1e293b",
          padding: 40,
          borderRadius: 15,
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            textAlign: "center",
          }}
        >
          AppBiT
        </h1>

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Plataforma Inteligente para Inclusão Digital
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "white" }}>E-mail</label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#334155",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Mail color="#38bdf8" />

              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  background: "transparent",
                  border: "none",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "white" }}>Senha</label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#334155",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Lock color="#38bdf8" />

              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  background: "transparent",
                  border: "none",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "#ef4444", marginBottom: 20 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#38bdf8",
              color: "#0f172a",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <LogIn
              size={18}
              style={{
                verticalAlign: "middle",
                marginRight: 8,
              }}
            />
            Entrar
          </button>
        </form>

        <p
          style={{
            marginTop: 30,
            color: "#94a3b8",
            textAlign: "center",
            fontSize: 13,
          }}
        >
          Usuário: <strong>admin@appbit.com</strong>
          <br />
          Senha: <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}
