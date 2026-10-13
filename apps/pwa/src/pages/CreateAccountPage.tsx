import { useMemo, useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register, setSession } from "../services/api";
import { COUNTRIES } from "../utils/countries";
import { maskDateBR, sanitizeName, titleCase } from "../utils/masks";
import {
  ageFromBR,
  dateBRToISO,
  isNotFutureBR,
  isValidDateBR,
  isValidEmail,
  isValidName,
  passwordStrength,
} from "../utils/validators";
import "./CreateAccount.css";

export function CreateAccountPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [jobTitle, setJobTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const age = ageFromBR(birthDate);
    return {
      name: !isValidName(name) ? "Informe seu nome completo (mín. 3 letras, sem números)." : "",
      birthDate: !birthDate
        ? "Informe a data de nascimento."
        : !isValidDateBR(birthDate)
          ? "Data inválida. Use o formato DD/MM/AAAA."
          : !isNotFutureBR(birthDate)
            ? "A data não pode ser no futuro."
            : age === null || age < 13 || age > 120
              ? "Idade deve estar entre 13 e 120 anos."
              : "",
      country: !country ? "Selecione o país." : "",
      email: !isValidEmail(email) ? "Informe um email válido." : "",
      password: password.length < 6 ? "A senha deve ter ao menos 6 caracteres." : "",
      confirm: confirm !== password || !confirm ? "As senhas não conferem." : "",
    };
  }, [name, birthDate, country, email, password, confirm]);

  const isValid = Object.values(errors).every((e) => !e);
  const strength = passwordStrength(password);
  const show = (field: string) => touched[field] && errors[field as keyof typeof errors];
  const blur = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setTouched({
      name: true,
      birthDate: true,
      country: true,
      email: true,
      password: true,
      confirm: true,
    });
    if (!isValid) return;

    const iso = dateBRToISO(birthDate);
    setLoading(true);
    try {
      const session = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        birthDate: iso!,
        country,
        jobTitle: jobTitle.trim() || undefined,
        institution: institution.trim() || undefined,
      });
      setSession(session);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="create-account-page">
      <div className="create-account-bg create-account-bg-top" />
      <div className="create-account-bg create-account-bg-bottom" />
      <div className="create-account-bottom-fade" />

      <header className="create-account-header">
        <img src="/img/Logo Definitiva.svg" alt="NEXO" className="create-account-logo" />
        <button className="create-account-back" type="button" onClick={() => navigate("/login")}>
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

          <form className="create-account-form" onSubmit={handleSubmit} noValidate>
            <label className="create-account-field">
              <span>Nome Completo:*</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(sanitizeName(e.target.value))}
                onBlur={(e) => { setName(titleCase(e.target.value)); blur("name"); }}
                aria-invalid={!!show("name")}
              />
              {show("name") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.name}</small>}
            </label>

            <label className="create-account-field">
              <span>Data de Nascimento:*</span>
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                inputMode="numeric"
                maxLength={10}
                value={birthDate}
                onChange={(e) => setBirthDate(maskDateBR(e.target.value))}
                onBlur={() => blur("birthDate")}
                aria-invalid={!!show("birthDate")}
              />
              {show("birthDate") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.birthDate}</small>}
            </label>

            <label className="create-account-field">
              <span>País:*</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} onBlur={() => blur("country")}>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {show("country") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.country}</small>}
            </label>

            <label className="create-account-field">
              <span>Cargo:</span>
              <input
                type="text"
                autoComplete="organization-title"
                maxLength={80}
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </label>

            <label className="create-account-field">
              <span>Instituição:</span>
              <input
                type="text"
                autoComplete="organization"
                maxLength={80}
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </label>

            <label className="create-account-field">
              <span>Email:*</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => { setEmail(e.target.value.trim().toLowerCase()); blur("email"); }}
                aria-invalid={!!show("email")}
              />
              {show("email") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.email}</small>}
            </label>

            <label className="create-account-field">
              <span>Senha:*</span>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => blur("password")}
                  aria-invalid={!!show("password")}
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", display: "flex" }}
                >
                  {showPassword ? <EyeOff size={18} color="#a2a2a2" /> : <Eye size={18} color="#a2a2a2" />}
                </button>
              </div>
              {password.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 999, background: "#eee", overflow: "hidden" }}>
                    <div style={{ width: `${(strength.score / 5) * 100}%`, height: "100%", background: strength.color, transition: "width var(--nexo-dur) var(--nexo-ease)" }} />
                  </div>
                  <small style={{ color: strength.color, fontSize: 11, minWidth: 72, textAlign: "right" }}>{strength.label}</small>
                </div>
              )}
              {show("password") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.password}</small>}
            </label>

            <label className="create-account-field">
              <span>Confirmação da senha:*</span>
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onBlur={() => blur("confirm")}
                aria-invalid={!!show("confirm")}
              />
              {confirm.length > 0 && confirm === password && <small style={{ color: "var(--nexo-success)", fontSize: 12 }}>Senhas conferem ✓</small>}
              {show("confirm") && <small style={{ color: "var(--nexo-danger)", fontSize: 12 }}>{errors.confirm}</small>}
            </label>

            {error && <p className="create-account-error" style={{ color: "var(--nexo-danger)", textAlign: "center" }}>{error}</p>}

            <button className="create-account-submit" type="submit" disabled={loading || !isValid}>
              {loading ? "Criando..." : "Criar uma conta"}
            </button>

            <div className="create-account-divider">
              <span>Ou</span>
            </div>

            <button className="create-account-google" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
