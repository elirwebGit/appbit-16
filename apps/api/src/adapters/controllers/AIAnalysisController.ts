import { Request, Response } from "express";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { GetAnalysisHistoryUseCase } from "@application/useCases/GetAnalysisHistoryUseCase";

export class AIAnalysisController {
  constructor(
    private readonly getAnalysisHistoryUseCase: GetAnalysisHistoryUseCase,
  ) {}

  async getHistory(req: Request, res: Response): Promise<Response> {
    const history = await this.getAnalysisHistoryUseCase.execute();

    return res.status(200).json(history);
  }
}
