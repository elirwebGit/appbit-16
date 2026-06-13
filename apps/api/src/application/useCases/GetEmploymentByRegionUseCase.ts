import { IEmploymentRepository } from "../../domain/repositories/IEmploymentRepository";
import { Employment } from "../../domain/entities/Employment";

export class GetEmploymentByRegionUseCase {
  constructor(private readonly employmentRepository: IEmploymentRepository) {}

  async execute(regionId: string): Promise<Employment[]> {
    return this.employmentRepository.findByRegion(regionId);
  }
}
