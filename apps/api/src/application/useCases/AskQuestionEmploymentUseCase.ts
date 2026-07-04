import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { PrismaEmploymentRepository } from "@infrastructure/repositories/PrismaEmploymentRepository";

export class AskQuestionEmploymentUseCase {
  constructor(
    private readonly aiProvider: GeminiProvider,
    private readonly employmentRepository: PrismaEmploymentRepository,
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute(question: string): Promise<any> {
    const prompt = `
Você é um especialista em políticas públicas.

Pergunta:
${question}

Dados:
${JSON.stringify(this.employmentRepository.findAll(), null, 2)}

Analise os dados e responda em português.
`;

    const aiInsight = await this.aiProvider.generateAnalysis(prompt);
    return this.analysisRepository.save(prompt, aiInsight);
  }
}
