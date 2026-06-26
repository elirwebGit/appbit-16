import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";

export class AskQuestionRegionUseCase {
  constructor(
    private readonly aiProvider: GeminiProvider,
    private readonly regionRepository: PrismaRegionRepository,
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute(question: string): Promise<string> {
    // Busca regiões com todos os indicadores relacionados (empregabilidade, saude_mental, qualidade_sinal)
    const regioes = await this.regionRepository.findIndicators();

    const prompt = `
Você é um especialista em inclusão digital e desenvolvimento socioeconômico do Brasil.
Responda SEMPRE em português e baseie sua análise EXCLUSIVAMENTE nos dados fornecidos abaixo.

Os dados contêm:
- name: identificador da região (ex: SP-ZonaSul, BA-Suburbio)
- state / country: estado e país
- latitude / longitude: coordenadas geográficas
- indicators: lista de indicadores medidos para a região:
  - indicator: nome do indicador ("empregabilidade", "saude_mental" ou "qualidade_sinal")
  - value: valor numérico entre 0 e 1 (quanto MAIS PRÓXIMO DE 0, PIOR; quanto MAIS PRÓXIMO DE 1, MELHOR)
  - peopleConcentration: quantidade de pessoas na região
  - networkCoverage: tipo de cobertura de rede móvel (2G, 3G, 4G, 5G)
- employments: dados reais de emprego da região:
  - unemploymentRate: taxa de desemprego em %
  - formalEmploymentRate: taxa de emprego formal em %
  - sector: setor predominante
  - demographicGroup: grupo demográfico

DADOS DAS REGIÕES:
${JSON.stringify(regioes, null, 2)}

PERGUNTA DO USUÁRIO:
${question}

Responda de forma objetiva e estruturada, citando os valores numéricos dos indicadores ao comparar regiões.
`;

    const answer = await this.aiProvider.generateAnalysis(prompt);

    await this.analysisRepository.save(question, answer);

    return answer;
  }
}
