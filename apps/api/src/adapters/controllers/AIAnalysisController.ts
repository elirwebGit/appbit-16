import { Request, Response } from "express";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

export class AIAnalysisController {
  constructor(private readonly repository: PrismaAIAnalysisRepository) {}

  async getHistory(req: Request, res: Response): Promise<Response> {
    const history = await this.repository.findAll();

    return res.status(200).json(history);
  }
}
