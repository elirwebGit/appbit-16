export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Máscara progressiva DD/MM/AAAA. Digitar 01012000 vira "01/01/2000". */
export function maskDateBR(value: string): string {
  const d = digitsOnly(value).slice(0, 8);
  const day = d.slice(0, 2);
  const month = d.slice(2, 4);
  const year = d.slice(4, 8);
  let out = day;
  if (month) out += `/${month}`;
  if (year) out += `/${year}`;
  return out;
}

/** Remove dígitos do nome e colapsa espaços múltiplos. */
export function sanitizeName(value: string): string {
  return value.replace(/[0-9]/g, "").replace(/\s{2,}/g, " ");
}

/** Capitaliza cada palavra (para aplicar no blur). */
export function titleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}
