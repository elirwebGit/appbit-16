import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";

export class CreateRegionUseCase {
  constructor(private readonly regionRepository: PrismaRegionRepository) {}

  async execute(data: any) {
    if (!data.name || !data.state || !data.country) {
      throw new Error("Name, state, and country are required");
    }

    // Gerar coordenadas fictícias baseadas em um raio de SP para fins de demonstração
    const lat = data.latitude || -23.5505 + (Math.random() * 2 - 1);
    const lng = data.longitude || -46.6333 + (Math.random() * 2 - 1);

    const regionData = {
      name: data.name,
      state: data.state,
      country: data.country,
      latitude: lat,
      longitude: lng,
      indicators: {
        create: [
          {
            indicator: "saude_mental",
            value: Math.random() * 0.9 + 0.1, // 0.1 a 1.0
            peopleConcentration: Math.floor(Math.random() * 100000) + 10000,
            networkCoverage: "4G",
            source: "Mock",
          },
          {
            indicator: "empregabilidade",
            value: Math.random() * 0.9 + 0.1,
            peopleConcentration: Math.floor(Math.random() * 100000) + 10000,
            networkCoverage: "4G",
            source: "Mock",
          },
          {
            indicator: "formacoes",
            value: Math.random() * 0.9 + 0.1,
            peopleConcentration: Math.floor(Math.random() * 100000) + 10000,
            networkCoverage: "4G",
            source: "Mock",
          },
        ],
      },
    };

    const newRegion = await this.regionRepository.create(regionData);
    return newRegion;
  }
}
