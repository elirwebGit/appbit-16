import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { RegiaoMapa, Mensagem, InsightCard } from '../types/visent';

interface ActiveFilters {
  [key: string]: any;
}

// ── AI-related state (prepared for future AIContext extraction) ──────────────
interface AIState {
  aiMessages: Mensagem[];
  aiInsights: InsightCard[];
  isAiLoading: boolean;
}

// ── Full context interface ──────────────────────────────────────────────────
interface DashboardContextData {
  // Map & Region data
  mapData: RegiaoMapa[];
  selectedRegionIds: string[];
  activeIndicatorId: string;
  activeFilters: ActiveFilters;
  historyItems: { id: string; label: string }[];
  isLoading: boolean;
  error: string | null;

  // Region actions
  toggleRegion: (id: string) => void;
  setIndicator: (id: string) => void;
  setFilter: (key: string, value: any) => void;
  addRegion: (data: { name: string; state: string; country: string }) => Promise<void>;
  removeRegion: (id: string) => Promise<void>;

  // AI state & actions (grouped for future AIContext extraction)
  aiMessages: Mensagem[];
  aiInsights: InsightCard[];
  isAiLoading: boolean;
  sendAiMessage: (question: string) => Promise<void>;
  generateInsights: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // ── Map & Region state ──────────────────────────────────────────────────
  const [mapData, setMapData] = useState<RegiaoMapa[]>([]);
  const [selectedRegionIds, setSelectedRegionIds] = useState<string[]>([]);
  const [activeIndicatorId, setActiveIndicatorId] = useState<string>('saude_mental');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [historyItems, setHistoryItems] = useState<{ id: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── AI state (grouped for future AIContext extraction) ─────────────────
  const [aiMessages, setAiMessages] = useState<Mensagem[]>([
    {
      id: 1,
      autor: 'ia',
      texto: 'Olá! Como posso ajudar você hoje?',
    },
  ]);
  const [aiInsights, setAiInsights] = useState<InsightCard[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // ── Initial data load ─────────────────────────────────────────────────
  useEffect(() => {
    let active = true;
    
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[DashboardContext] Fetching map data (getRegions) and history...");
        
        const regionsPromise = dashboardService.getRegions().then(res => {
          console.log("[DashboardContext] Resposta recebida da API getRegions:", res);
          return res;
        });

        const historyPromise = dashboardService.getHistory().catch(err => {
          console.warn("[DashboardContext] Erro ao carregar histórico (getHistory). Ignorando falha para não quebrar o mapa.", err);
          return [];
        });

        const [regions, history] = await Promise.all([
          regionsPromise,
          historyPromise
        ]);
        
        if (active) {
          console.log("[DashboardContext] Estado mapData a ser atualizado antes de renderizar:", regions);
          setMapData(regions);
          setHistoryItems(history);
        }
      } catch (err) {
        if (active) {
          console.error("Erro ao carregar dados do dashboard:", err);
          setError("Não foi possível carregar as informações do dashboard.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  // ── Region actions ────────────────────────────────────────────────────

  const toggleRegion = useCallback((id: string) => {
    setSelectedRegionIds((prev) => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  }, []);

  const setIndicator = useCallback((id: string) => {
    setActiveIndicatorId(id);
  }, []);

  const setFilter = useCallback((key: string, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addRegion = useCallback(async (data: { name: string; state: string; country: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("[DashboardContext] Payload enviado para API (addRegion):", data);
      await dashboardService.addRegion(data);
      // Re-fetch from API to maintain SSOT
      const regions = await dashboardService.getRegions();
      setMapData(regions);
    } catch (err) {
      console.error("Erro ao adicionar região:", err);
      setError("Não foi possível adicionar a região.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeRegion = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await dashboardService.removeRegion(id);
      // Clean up selected IDs and re-fetch from API
      setSelectedRegionIds(prev => prev.filter(r => r !== id));
      const regions = await dashboardService.getRegions();
      setMapData(regions);
    } catch (err) {
      console.error("Erro ao remover região:", err);
      setError("Não foi possível remover a região.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── AI actions (grouped for future AIContext extraction) ───────────────

  const sendAiMessage = useCallback(async (question: string) => {
    const userMsg: Mensagem = {
      id: Date.now(),
      autor: 'usuario',
      texto: question,
    };

    setAiMessages(prev => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      const answer = await dashboardService.analyzeQuestion(question);
      
      const iaMsg: Mensagem = {
        id: Date.now() + 1,
        autor: 'ia',
        texto: answer,
      };

      setAiMessages(prev => [...prev, iaMsg]);

      // Also refresh history since analyses are saved server-side
      try {
        const history = await dashboardService.getHistory();
        setHistoryItems(history);
      } catch {
        // Non-critical: history refresh failure shouldn't block the UI
      }
    } catch (err) {
      console.error("Erro ao consultar IA:", err);
      const errorMsg: Mensagem = {
        id: Date.now() + 1,
        autor: 'ia',
        texto: 'Erro ao conectar com o serviço de IA. Tente novamente.',
      };
      setAiMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  const generateInsights = useCallback(async () => {
    setIsAiLoading(true);
    try {
      const regionNames = mapData
        .filter(r => selectedRegionIds.includes(r.regiao))
        .map(r => r.nome_exibicao);

      const insights = await dashboardService.generateInsights({
        regionNames,
        indicatorId: activeIndicatorId,
      });

      setAiInsights(insights);
    } catch (err) {
      console.error("Erro ao gerar insights:", err);
      setAiInsights([{
        id: 'error',
        title: 'Erro ao gerar insights',
        body: 'Não foi possível gerar os insights. Verifique a conexão e tente novamente.',
        category: 'alert',
      }]);
    } finally {
      setIsAiLoading(false);
    }
  }, [mapData, selectedRegionIds, activeIndicatorId]);

  return (
    <DashboardContext.Provider value={{
      // Map & Region
      mapData,
      selectedRegionIds,
      activeIndicatorId,
      activeFilters,
      historyItems,
      isLoading,
      error,
      toggleRegion,
      setIndicator,
      setFilter,
      addRegion,
      removeRegion,

      // AI (grouped for future AIContext extraction)
      aiMessages,
      aiInsights,
      isAiLoading,
      sendAiMessage,
      generateInsights,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
