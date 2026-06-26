const BASE_URL = "http://localhost:3000/api";

export async function getDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard`);
  return res.json();
}

export async function getRegionIndicators(regionId: string) {
  const res = await fetch(`${BASE_URL}/regions/${regionId}/indicators`);
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

  return res.json();
}

export async function analyzeQuestion(question: string) {
  const res = await fetch(`${BASE_URL}/regions/analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  return res.json();
}

export async function getRegionsForMap() {
  const res = await fetch(`${BASE_URL}/regions`);
  return res.json();
}
