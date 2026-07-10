export interface RegiaoMapa {
  regiao: string;
  nome_exibicao: string;
  lat: number;
  lng: number;
  concentracao_pessoas: number;
  cobertura_rede: string;
  qualidade_sinal: number;
  indicadores: {
    empregabilidade: number;
    saude_mental: number;
    formacoes: number;
  };
}

export interface Mensagem {
  id: number;
  autor: 'usuario' | 'ia';
  texto: string;
}

/** POST /api/regions/analysis response */
export interface AIAnalysisResponse {
  success: boolean;
  answer: string;
}

/** POST /api/ai/query response */
export interface AIQueryResponse {
  success: boolean;
  question: string;
  answer: string;
}

/** GET /api/analysis/history item */
export interface AnalysisHistoryItem {
  id: string;
  question: string;
  answer: string;
  sources: string[] | null;
  createdAt: string;
}

/** Structured insight card for display (transformed from API response in service layer) */
export interface InsightCard {
  id: string;
  title: string;
  body: string;
  category: 'info' | 'warning' | 'success' | 'alert';
}
