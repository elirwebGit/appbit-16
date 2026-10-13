import type { RegiaoMapa, AIAnalysisResponse, AIQueryResponse, AnalysisHistoryItem } from '../types/visent';

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// ─── Auth (JWT) ───────────────────────────────────────────────────────────────
const TOKEN_KEY = "appbit.token";
const USER_KEY = "appbit.user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function setSession(session: AuthResponse | null): void {
  if (session) {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = getToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: "Falha no login" }));
    throw new Error(data.message || "Falha no login");
  }
  return res.json();
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Falha ao cadastrar" }));
    throw new Error(err.message || "Falha ao cadastrar");
  }
  return res.json();
}

export async function getMe(): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Não autenticado");
  return res.json();
}

// ─── Dados (exigem Bearer token) ──────────────────────────────────────────────

export async function getDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Dashboard request failed: ${res.status}`);
  return res.json();
}

export async function getRegionIndicators(regionId: string) {
  const res = await fetch(`${BASE_URL}/region/${regionId}/indicators`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Region indicators request failed: ${res.status}`);
  return res.json();
}

export async function crossRegionAnalysis(
  regionAId: string,
  regionBId: string,
) {
  const res = await fetch(`${BASE_URL}/cross-region`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ regionAId, regionBId }),
  });
  if (!res.ok) throw new Error(`Cross-region analysis failed: ${res.status}`);
  return res.json();
}

/**
 * POST /api/regions/analysis
 * Sends question to region-aware AI (uses real region data as context).
 * This is the primary AI endpoint for the application.
 */
export async function analyzeQuestion(question: string): Promise<AIAnalysisResponse> {
  const res = await fetch(`${BASE_URL}/regions/analysis`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Analysis request failed: ${res.status}`);
  return res.json();
}

/**
 * GET /api/regions
 * Returns all registered regions formatted for the map (Leaflet).
 */
export async function getRegionsForMap(): Promise<RegiaoMapa[]> {
  const res = await fetch(`${BASE_URL}/regions`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Regions request failed: ${res.status}`);
  return res.json();
}

/**
 * GET /api/analysis/history
 * Returns history of AI analyses performed.
 */
export async function getHistory(): Promise<AnalysisHistoryItem[]> {
  const res = await fetch(`${BASE_URL}/analysis/history`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`History request failed: ${res.status}`);
  return res.json();
}

/**
 * POST /api/regions
 * Creates a new region. Backend expects { name, state, country }.
 */
export async function createRegion(data: { name: string; state: string; country: string }) {
  const res = await fetch(`${BASE_URL}/regions`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Create region failed: ${res.status}`);
  return res.json();
}

/**
 * DELETE /api/regions/:id
 * Removes a region by its name/id.
 */
export async function deleteRegion(id: string) {
  const res = await fetch(`${BASE_URL}/regions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Delete region failed: ${res.status}`);
  return res.json();
}

/**
 * POST /api/ai/query
 * Generic AI query endpoint (not region-aware). Kept for compatibility.
 */
export async function aiQuery(question: string): Promise<AIQueryResponse> {
  const res = await fetch(`${BASE_URL}/ai/query`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`AI query failed: ${res.status}`);
  return res.json();
}

export async function formationQuestion(question: string) {
  const res = await fetch(`${BASE_URL}/formation`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Formation question failed: ${res.status}`);
  return res.json();
}

export async function employmentQuestion(question: string) {
  const res = await fetch(`${BASE_URL}/employment`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Employment question failed: ${res.status}`);
  return res.json();
}
