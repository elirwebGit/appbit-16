import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const countries = ["Brasil", "Argentina", "Chile", "Colombia", "Mexico", "Portugal"];

export function CreateAccountPage() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="create-account-page">
      <div className="create-account-bg create-account-bg-top" />
      <div className="create-account-bg create-account-bg-bottom" />
      <div className="create-account-bottom-fade" />

      <header className="create-account-header">
        <img
          src="/img/Logo Definitiva.svg"
          alt="NEXO"
          className="create-account-logo"
        />
        <button
          className="create-account-back"
          type="button"
          onClick={() => navigate("/login")}
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span>Voltar</span>
        </button>
      </header>

      <section className="create-account-shell" aria-labelledby="create-account-title">
        <h1 id="create-account-title">Crie uma Conta</h1>

        <div className="create-account-card">
          <div className="create-account-intro">
            Acesse à plataforma e veja os insights
            <br />
            para tomar decisões de forma mais assertiva
          </div>

          <form className="create-account-form" onSubmit={handleSubmit}>
            <label className="create-account-field">
              <span>Nome Completo:</span>
              <input type="text" autoComplete="name" />
            </label>

            <label className="create-account-field">
              <span>Data de Nascimento:</span>
              <input type="text" placeholder="DD/MM/YYYY" inputMode="numeric" />
            </label>

            <label className="create-account-field">
              <span>País:</span>
              <select defaultValue="Brasil">
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className="create-account-field">
              <span>Cargo:</span>
              <input type="text" autoComplete="organization-title" />
            </label>

            <label className="create-account-field">
              <span>Instituição:</span>
              <input type="text" autoComplete="organization" />
            </label>

            <label className="create-account-field">
              <span>Email:</span>
              <input type="email" autoComplete="email" />
            </label>

            <label className="create-account-field">
              <span>Senha:</span>
              <input type="password" autoComplete="new-password" />
            </label>

            <label className="create-account-field">
              <span>Confirmação da senha:</span>
              <input type="password" autoComplete="new-password" />
            </label>

            <button className="create-account-submit" type="submit">
              Criar uma conta
            </button>

            <div className="create-account-divider">
              <span>Ou</span>
            </div>

            <button className="create-account-google" type="button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continuar com Google</span>
            </button>
          </form>

          <p className="create-account-login">
            Já tenho uma conta.{" "}
            <button type="button" onClick={() => navigate("/login")}>
              Voltar para Login
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
