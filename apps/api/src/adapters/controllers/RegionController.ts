import { Request, Response } from "express";
import { AskQuestionRegionUseCase } from "@application/useCases/AskQuestionRegionUseCase";
import { GetMapRegionsUseCase } from "@application/useCases/GetMapRegionsUseCase";

export class RegionController {
  constructor(
    private readonly askQuestionRegionUseCase: AskQuestionRegionUseCase,
    private readonly getMapRegionsUseCase: GetMapRegionsUseCase,
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const regions = await this.getMapRegionsUseCase.execute();
      return res.status(200).json(regions);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async analyze(req: Request, res: Response): Promise<Response> {
    try {
      const { question } = req.body;

      if (!question || typeof question !== "string") {
        return res.status(400).json({
          success: false,
          answer: "O campo 'question' é obrigatório.",
        });
      }

      const answer = await this.askQuestionRegionUseCase.execute(question);

      return res.status(200).json({
        success: true,
        answer,
      });
    } catch (error: any) {
      console.error("Erro na análise de IA:", error);
      return res.status(500).json({
        success: false,
        answer: "Erro interno ao processar análise. Verifique a configuração da API de IA.",
      });
    }
  }
}
