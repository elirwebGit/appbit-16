import { AskQuestionEmploymentUseCase } from "@application/useCases/AskQuestionEmploymentUseCase";
import { Request, Response } from "express";

export class EmploymentController {
  constructor(
    private readonly askQuestionEmploymentUseCase: AskQuestionEmploymentUseCase,
  ) {}

  async ask(req: Request, res: Response): Promise<Response> {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({
          message: "Question is required",
        });
      }

      const answer = await this.askQuestionEmploymentUseCase.execute(question);

      return res.status(200).json({
        success: true,
        question,
        answer,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error generating AI response",
      });
    }
  }
}
