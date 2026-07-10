import { Request, Response } from "express";
import { AskQuestionRegionUseCase } from "@application/useCases/AskQuestionRegionUseCase";
import { GetMapRegionsUseCase } from "@application/useCases/GetMapRegionsUseCase";

import { CreateRegionUseCase } from "@application/useCases/CreateRegionUseCase";
import { DeleteRegionUseCase } from "@application/useCases/DeleteRegionUseCase";

export class RegionController {
  constructor(
    private readonly askQuestionRegionUseCase: AskQuestionRegionUseCase,
    private readonly getMapRegionsUseCase: GetMapRegionsUseCase,
    private readonly createRegionUseCase: CreateRegionUseCase,
    private readonly deleteRegionUseCase: DeleteRegionUseCase,
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
      console.error("Erro na análise de IA:", error.message);
      return res.status(500).json({
        success: false,
        answer: "Erro interno ao processar análise. Verifique a configuração da API de IA.",
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const newRegion = await this.createRegionUseCase.execute(data);
      return res.status(201).json(newRegion);
    } catch (error: any) {
      console.error("Erro ao criar região:", error.message);
      return res.status(400).json({
        message: error.message || "Erro ao criar região",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.deleteRegionUseCase.execute(id as string);
      return res.status(200).json(deleted);
    } catch (error: any) {
      console.error("Erro ao deletar região:", error.message);
      return res.status(400).json({
        message: error.message || "Erro ao deletar região",
      });
    }
  }
}
