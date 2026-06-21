import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

export class GetDashboardDataUseCase {
  constructor(
    private readonly regionRepository: PrismaRegionRepository,
    private readonly aiProvider: GeminiProvider,
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute() {
    const regions = await this.regionRepository.findDashboardData();

    const processed = regions.map((region) => {
      const indicators = region.indicators ?? [];
      const employments = region.employments ?? [];

      const employability =
        employments.length > 0
          ? employments.reduce(
              (acc: number, e: any) => acc + (1 - e.unemploymentRate / 100),
              0,
            ) / employments.length
          : 0;

      const connectivity =
        indicators.length > 0
          ? indicators.reduce((acc: number, i: any) => acc + i.value, 0) /
            indicators.length
          : 0;

      const population = indicators.reduce(
        (acc: number, i: any) => acc + i.peopleConcentration,
        0,
      );

      return {
        region: region.name,
        state: region.state,

        metrics: {
          employability,
          connectivity,
          population,
        },

        riskScore: employability + connectivity,
      };
    });

    // 🔥 cálculo de regiões críticas
    const sortedByRisk = [...processed].sort(
      (a, b) => a.riskScore - b.riskScore,
    );

    const prompt = `
Você é um especialista em políticas públicas B2G.

Analise o dashboard abaixo e gere um resumo executivo:

DADOS:
${JSON.stringify(processed, null, 2)}

TOP REGIÕES CRÍTICAS:
${JSON.stringify(sortedByRisk.slice(0, 2), null, 2)}

Responda:
- resumo do cenário
- principais desigualdades
- regiões prioritárias
- recomendação de investimento
`;

    const aiInsight = await this.aiProvider.generateAnalysis(prompt);
    await this.analysisRepository.save(prompt, aiInsight);
    return {
      regions: processed,
      criticalRegions: sortedByRisk.slice(0, 3),

      insight: aiInsight, // 🤖 IA aqui entra

      metadata: {
        totalRegions: processed.length,
      },
    };
  }
}
