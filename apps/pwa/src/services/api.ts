import type {
  RegiaoMapa,
  AIAnalysisResponse,
  AIQueryResponse,
  AnalysisHistoryItem,
} from "../types/visent";

const BASE_URL = import.meta.env.PORT ?? "http://localhost:3000/api";

export async function getDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard`);
  if (!res.ok) throw new Error(`Dashboard request failed: ${res.status}`);
  return res.json();
}

export async function getRegionIndicators(regionId: string) {
  const res = await fetch(`${BASE_URL}/regions/${regionId}/indicators`);
  if (!res.ok)
    throw new Error(`Region indicators request failed: ${res.status}`);
  return res.json();
}

export async function crossRegionAnalysis(
  regionAId: string,
  regionBId: string,
) {
  const res = await fetch(`${BASE_URL}/analysis/cross-region`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
export async function analyzeQuestion(
  question: string,
): Promise<AIAnalysisResponse> {
  const res = await fetch(`${BASE_URL}/regions/analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(`${BASE_URL}/regions`);
  if (!res.ok) throw new Error(`Regions request failed: ${res.status}`);
  return res.json();
}

/**
 * GET /api/analysis/history
 * Returns history of AI analyses performed.
 */
export async function getHistory(): Promise<AnalysisHistoryItem[]> {
  const res = await fetch(`${BASE_URL}/analysis/history`);
  if (!res.ok) throw new Error(`History request failed: ${res.status}`);
  return res.json();
}

/**
 * POST /api/regions
 * Creates a new region. Backend expects { name, state, country }.
 */
export async function createRegion(data: {
  name: string;
  state: string;
  country: string;
}) {
  const res = await fetch(`${BASE_URL}/regions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`AI query failed: ${res.status}`);
  return res.json();
}

export async function formationQuestion(question: string) {
  const res = await fetch(`${BASE_URL}/formation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Formation question failed: ${res.status}`);
  return res.json();
}

export async function employmentQuestion(question: string) {
  const res = await fetch(`${BASE_URL}/employment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Employment question failed: ${res.status}`);
  return res.json();
}
