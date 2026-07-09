import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { PrismaFormationRepository } from "@infrastructure/repositories/PrismaFormationRepository";

export class AskQuestionFormationUseCase {
  constructor(
    private readonly aiProvider: GeminiProvider,
    private readonly formationRepository: PrismaFormationRepository,
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute(question: string): Promise<any> {
    const prompt = `
Você é um especialista em políticas públicas.

Pergunta:
${question}

Dados:
${JSON.stringify(this.formationRepository.findAll(), null, 2)}

Analise os dados e responda em português.
`;

    const aiInsight = await this.aiProvider.generateAnalysis(prompt);
    return this.analysisRepository.save(prompt, aiInsight);
  }
}
