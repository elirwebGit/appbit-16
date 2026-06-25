import { Request, Response } from "express";
import { CrossRegionAnalysisUseCase } from "@application/useCases/CrossRegionAnalysisUseCase";

export class CrossRegionController {
  constructor(private readonly useCase: CrossRegionAnalysisUseCase) {}

  async analyze(req: Request, res: Response) {
    const { regionAId, regionBId } = req.body;

    const result = await this.useCase.execute(regionAId, regionBId);

    return res.json(result);
  }
}
