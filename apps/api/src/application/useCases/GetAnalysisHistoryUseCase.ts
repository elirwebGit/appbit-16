import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

export class GetAnalysisHistoryUseCase {
  constructor(
    private readonly analysisRepository: PrismaAIAnalysisRepository,
  ) {}

  async execute() {
    const history = await this.analysisRepository.findAll();

    return history.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      sources: item.sources ? JSON.parse(item.sources) : null,
      createdAt: item.createdAt,
    }));
  }
}
