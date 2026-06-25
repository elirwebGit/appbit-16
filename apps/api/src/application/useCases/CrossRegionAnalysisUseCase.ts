import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

export class CrossRegionAnalysisUseCase {
  constructor(
    private readonly regionRepository: PrismaRegionRepository,
    private readonly aiProvider: GeminiProvider,
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute(regionAId: string, regionBId: string) {
    const [regionA, regionB] = await Promise.all([
      this.regionRepository.findByIdWithRelations(regionAId),
      this.regionRepository.findByIdWithRelations(regionBId),
    ]);

    if (!regionA || !regionB) {
      throw new Error("One or both regions not found");
    }

    const analysisA = this.buildMetrics(regionA);
    const analysisB = this.buildMetrics(regionB);

    const comparison = {
      employabilityGap: analysisA.employability - analysisB.employability,
      connectivityGap: analysisA.connectivity - analysisB.connectivity,
      populationPressureGap: analysisA.population - analysisB.population,
    };

    const prompt = `
Você é um especialista em políticas públicas B2G.

Analise a comparação entre duas regiões:

REGIÃO A: ${regionA.name}
${JSON.stringify(analysisA, null, 2)}

REGIÃO B: ${regionB.name}
${JSON.stringify(analysisB, null, 2)}

COMPARAÇÃO:
${JSON.stringify(comparison, null, 2)}

Responda:
- diagnóstico
- principal desigualdade
- recomendação de política pública
- prioridade de investimento
`;

    const aiInsight = await this.aiProvider.generateAnalysis(prompt);
    await this.analysisRepository.save(prompt, aiInsight);

    return {
      regions: {
        A: regionA.name,
        B: regionB.name,
      },

      data: {
        A: analysisA,
        B: analysisB,
      },

      comparison,

      insight: aiInsight, // 🔥 IA aqui entra
    };
  }

  private buildMetrics(region: any) {
    const indicators = region.indicators ?? [];
    const employments = region.employments ?? [];

    const connectivity =
      indicators.length > 0
        ? indicators.reduce((acc: number, i: any) => acc + i.value, 0) /
          indicators.length
        : 0;

    const employability =
      employments.length > 0
        ? employments.reduce(
            (acc: number, e: any) => acc + (1 - e.unemploymentRate / 100),
            0,
          ) / employments.length
        : 0;

    const population = indicators.reduce(
      (acc: number, i: any) => acc + i.peopleConcentration,
      0,
    );

    return {
      connectivity,
      employability,
      population,
    };
  }
}
