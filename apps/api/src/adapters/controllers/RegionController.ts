import { Request, Response } from "express";
import { GetRegionsUseCase } from "../../application/useCases/GetRegionsUseCase";

export class RegionController {
  constructor(private readonly getRegionsUseCase: GetRegionsUseCase) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const regions = await this.getRegionsUseCase.execute();
    return res.status(200).json(regions);
  }
}
