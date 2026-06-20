import { Request, Response } from "express";
import { AskQuestionUseCase } from "@application/useCases/AskQuestionUseCase";

export class AIController {
  constructor(private readonly askQuestionUseCase: AskQuestionUseCase) {}

  async ask(req: Request, res: Response): Promise<Response> {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({
          message: "Question is required",
        });
      }

      const answer = await this.askQuestionUseCase.execute(question);

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
