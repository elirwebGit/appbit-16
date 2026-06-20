import { Request, Response } from "express";
import { AskQuestionRegionUseCase } from "@application/useCases/AskQuestionRegionUseCase";

export class RegionController {
  constructor(
    private readonly askQuestionRegionUseCase: AskQuestionRegionUseCase,
  ) {}

  async analyze(req: Request, res: Response): Promise<Response> {
    const { question } = req.body;

    const answer = await this.askQuestionRegionUseCase.execute(question);

    return res.status(200).json({
      success: true,
      answer,
    });
  }
}
