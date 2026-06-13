import { IRegionRepository } from "../../domain/repositories/IRegionRepository";
import { Region } from "../../domain/entities/Region";

export class GetRegionsUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}

  async execute(): Promise<Region[]> {
    return this.regionRepository.findAll();
  }
}
