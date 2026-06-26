import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";

const DISPLAY_NAMES: Record<string, string> = {
  "SP-ZonaSul": "São Paulo — Zona Sul",
  "SP-ZonaLeste": "São Paulo — Zona Leste",
  "SP-Centro": "São Paulo — Centro",
  "RJ-ZonaNorte": "Rio de Janeiro — Zona Norte",
  "RJ-ZonaOeste": "Rio de Janeiro — Zona Oeste",
  "RJ-Centro": "Rio de Janeiro — Centro",
  "MG-BH-Centro": "Belo Horizonte — Centro",
  "MG-Contagem": "Contagem — Região Metropolitana BH",
  "BA-Salvador-Centro": "Salvador — Centro Histórico",
  "BA-Suburbio": "Salvador — Subúrbio Ferroviário",
};

export interface RegiaoMapa {
  regiao: string;
  nome_exibicao: string;
  lat: number;
  lng: number;
  concentracao_pessoas: number;
  cobertura_rede: string;
  qualidade_sinal: number;
  indicadores: {
    empregabilidade: number;
    saude_mental: number;
  };
}

export class GetMapRegionsUseCase {
  constructor(private readonly regionRepository: PrismaRegionRepository) {}

  async execute(): Promise<RegiaoMapa[]> {
    const regions = await this.regionRepository.findDashboardData();

    return regions.map((region) => {
      const indicators = region.indicators || [];

      const empregabilidadeInd = indicators.find(
        (i) => i.indicator === "empregabilidade"
      );
      const saudeMentalInd = indicators.find(
        (i) => i.indicator === "saude_mental"
      );
      const qualidadeSinalInd = indicators.find(
        (i) => i.indicator === "qualidade_sinal"
      );

      const mainInd = indicators[0];

      return {
        regiao: region.name,
        nome_exibicao: DISPLAY_NAMES[region.name] || region.name,
        lat: region.latitude ?? 0,
        lng: region.longitude ?? 0,
        concentracao_pessoas: mainInd?.peopleConcentration ?? 0,
        cobertura_rede: mainInd?.networkCoverage ?? "4G",
        qualidade_sinal: qualidadeSinalInd
          ? qualidadeSinalInd.value
          : (mainInd?.value ?? 0),
        indicadores: {
          empregabilidade: empregabilidadeInd ? empregabilidadeInd.value : 0,
          saude_mental: saudeMentalInd ? saudeMentalInd.value : 0,
        },
      };
    });
  }
}
