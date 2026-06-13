import { IFormationRepository } from "../../domain/repositories/IFormationRepository";
import { Formation } from "../../domain/entities/Formation";

export class GetFormationsByRegionUseCase {
  constructor(private readonly formationRepository: IFormationRepository) {}

  async execute(regionId: string): Promise<Formation[]> {
    return this.formationRepository.findByRegion(regionId);
  }
}
