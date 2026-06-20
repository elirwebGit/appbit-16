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
    const indicators = await this.regionRepository.findAll();

    const prompt = `
Você é especialista em inclusão digital.

Pergunta:
${question}

Dados:
${JSON.stringify(indicators, null, 2)}

Forneça recomendações detalhadas.
`;

    const answer = await this.aiProvider.generateAnalysis(prompt);

    await this.analysisRepository.save(question, answer);

    return answer;
  }
}
