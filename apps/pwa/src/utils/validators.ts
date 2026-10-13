/** true se for uma data DD/MM/AAAA de calendário real (considera bissexto). */
export function isValidDateBR(value: string): boolean {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!m) return false;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (year < 1900 || month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

/** Converte DD/MM/AAAA -> YYYY-MM-DD (ISO) ou null. */
export function dateBRToISO(value: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

export function ageFromBR(value: string): number | null {
  const iso = dateBRToISO(value);
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const md = now.getMonth() - d.getMonth();
  if (md < 0 || (md === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

export function isNotFutureBR(value: string): boolean {
  const iso = dateBRToISO(value);
  if (!iso) return false;
  return new Date(iso).getTime() <= Date.now();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 3 && /^[A-Za-zÀ-ÿ' -]+$/.test(value.trim());
}

export interface PasswordChecks {
  length: boolean;
  upper: boolean;
  lower: boolean;
  digit: boolean;
  symbol: boolean;
}

export function passwordChecks(pw: string): PasswordChecks {
  return {
    length: pw.length >= 6,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    digit: /\d/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  };
}

export function passwordStrength(pw: string): { score: number; label: string; color: string } {
  const c = passwordChecks(pw);
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (c.upper && c.lower) score++;
  if (c.digit) score++;
  if (c.symbol) score++;
  const labels = ["Muito fraca", "Fraca", "Média", "Boa", "Forte", "Excelente"];
  const colors = ["#ef4444", "#ef4444", "#eea056", "#f7df59", "#8ac475", "#8ac475"];
  const i = Math.min(score, 5);
  return { score: i, label: labels[i], color: colors[i] };
}
