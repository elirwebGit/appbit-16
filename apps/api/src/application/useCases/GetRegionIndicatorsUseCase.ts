import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";

export class GetRegionIndicatorsUseCase {
  constructor(private readonly regionRepository: PrismaRegionRepository) {}

  async execute(regionId: string) {
    const region = await this.regionRepository.findByIdWithRelations(regionId);

    if (!region) {
      throw new Error("Region not found");
    }

    const indicators = region.indicators.map((i) => ({
      indicator: i.indicator,
      value: i.value,
      peopleConcentration: i.peopleConcentration,
      networkCoverage: i.networkCoverage,
      source: i.source,
    }));

    const employments = region.employments.map((e) => ({
      unemploymentRate: e.unemploymentRate,
      formalEmploymentRate: e.formalEmploymentRate,
      sector: e.sector,
      demographicGroup: e.demographicGroup,
    }));

    const formations = region.formations.map((f) => ({
      title: f.title,
      type: f.type,
      provider: f.provider,
      description: f.description,
    }));

    return {
      region: {
        id: region.id,
        name: region.name,
        state: region.state,
        country: region.country,
      },

      indicators,
      employments,
      formations,
    };
  }
}
