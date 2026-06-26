import { Request, Response } from "express";
import { GetRegionIndicatorsUseCase } from "@application/useCases/GetRegionIndicatorsUseCase";

export class RegionIndicatorsController {
  constructor(
    private readonly getRegionIndicatorsUseCase: GetRegionIndicatorsUseCase,
  ) {}

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { regionId } = req.params;

      const result = await this.getRegionIndicatorsUseCase.execute(
        regionId as string,
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}
