import { getRegionsForMap, getHistory as getHistoryApi, getDashboard, createRegion, deleteRegion, analyzeQuestion } from './api';
import type { InsightCard, AnalysisHistoryItem } from '../types/visent';

/**
 * Service layer for Dashboard data.
 * All data comes from the API — no mocks, no fallbacks.
 * Transformations happen here (service layer) not in components.
 */
export const dashboardService = {
  /**
   * GET /api/regions — formatted for Leaflet map
   */
  getRegions: async () => {
    return await getRegionsForMap();
  },
  
  /**
   * GET /api/analysis/history — transforms to sidebar-friendly format
   */
  getHistory: async (): Promise<{ id: string; label: string }[]> => {
    const data: AnalysisHistoryItem[] = await getHistoryApi();
    return data.map(item => ({
      id: item.id,
      label: item.question.length > 40 
        ? item.question.substring(0, 37) + '...' 
        : item.question
    }));
  },

  /**
   * GET /api/dashboard — consolidated dashboard data with AI insight
   */
  getDashboardData: async () => {
    return await getDashboard();
  },

  /**
   * POST /api/regions — create a new region
   */
  addRegion: async (data: { name: string; state: string; country: string }) => {
    return await createRegion(data);
  },

  /**
   * DELETE /api/regions/:id — remove a region
   */
  removeRegion: async (id: string) => {
    return await deleteRegion(id);
  },

  /**
   * POST /api/regions/analysis — sends a question to the region-aware AI.
   * Returns the raw answer string.
   */
  analyzeQuestion: async (question: string): Promise<string> => {
    const response = await analyzeQuestion(question);
    return response.answer;
  },

  /**
   * Generates structured insights via AI.
   * Transformation from raw AI text to InsightCard[] happens here (service layer),
   * NOT in the frontend component.
   * 
   * The backend returns a single text answer. We structure it into cards by
   * asking the AI to respond in a structured format, then parsing the response
   * in this service layer.
   */
  generateInsights: async (context: {
    regionNames: string[];
    indicatorId: string;
  }): Promise<InsightCard[]> => {
    const targetName = context.regionNames.length > 0 
      ? context.regionNames.join(', ') 
      : 'todas as regiões cadastradas';
    
    const indicatorLabel = context.indicatorId.replace('_', ' ');

    const prompt = `Gere exatamente 3 insights rápidos sobre ${indicatorLabel} em ${targetName}. 
Para cada insight, responda neste formato exato (use os delimitadores):
---INSIGHT---
TITULO: [título curto do insight]
CATEGORIA: [uma de: info, warning, success, alert]
CORPO: [análise em 1-2 frases]
---FIM---

Baseie nos dados reais das regiões. Seja direto e objetivo.`;

    const response = await analyzeQuestion(prompt);
    return parseInsightsResponse(response.answer);
  }
};

/**
 * Parses structured AI response into InsightCard[].
 * Handles graceful degradation if AI doesn't follow the exact format.
 */
function parseInsightsResponse(text: string): InsightCard[] {
  const blocks = text.split('---INSIGHT---').filter(b => b.trim());
  const insights: InsightCard[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].replace('---FIM---', '').trim();
    
    const titleMatch = block.match(/TITULO:\s*(.+)/i);
    const categoryMatch = block.match(/CATEGORIA:\s*(.+)/i);
    const bodyMatch = block.match(/CORPO:\s*(.+)/i);

    if (titleMatch && bodyMatch) {
      const rawCategory = (categoryMatch?.[1] || 'info').trim().toLowerCase();
      const category = (['info', 'warning', 'success', 'alert'].includes(rawCategory) 
        ? rawCategory 
        : 'info') as InsightCard['category'];
      
      insights.push({
        id: `insight-${i}-${Date.now()}`,
        title: titleMatch[1].trim(),
        body: bodyMatch[1].trim(),
        category,
      });
    }
  }

  // Fallback: if parsing failed, create a single info card with the raw text
  if (insights.length === 0 && text.trim()) {
    insights.push({
      id: `insight-fallback-${Date.now()}`,
      title: 'Análise da IA',
      body: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      category: 'info',
    });
  }

  return insights;
}
