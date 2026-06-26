import { Request, Response } from "express";
import { GetDashboardDataUseCase } from "@application/useCases/GetDashboardDataUseCase";

export class DashboardController {
  constructor(
    private readonly getDashboardDataUseCase: GetDashboardDataUseCase,
  ) {}

  async getDashboard(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.getDashboardDataUseCase.execute();

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}
