import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";

export class DeleteRegionUseCase {
  constructor(private readonly regionRepository: PrismaRegionRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new Error("Id is required");
    }

    const deletedRegion = await this.regionRepository.delete(id);
    return deletedRegion;
  }
}
