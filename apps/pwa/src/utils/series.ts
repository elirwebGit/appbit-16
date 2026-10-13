function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * Gera uma série determinística e estável (mesma entrada -> mesma série),
 * terminando no valor atual. Substitui o Math.random() dos gráficos.
 */
export function buildSeries(seed: string, endValue: number, points = 5): number[] {
  const rnd = mulberry32(hash(seed));
  const end = clamp(endValue, 0, 1);
  const rev = [end];
  let v = end;
  for (let i = 1; i < points; i++) {
    v = clamp(v + (rnd() - 0.5) * 0.22, 0.02, 0.98);
    rev.push(v);
  }
  return rev.reverse(); // mais antigo -> mais recente
}

export const YEARS = ["2020", "2021", "2022", "2023", "2024"];
