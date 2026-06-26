import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mapMockData = [
  {
    regiao: "SP-ZonaSul",
    lat: -23.6500,
    lng: -46.6600,
    concentracao_pessoas: 85000,
    cobertura_rede: "4G",
    qualidade_sinal: 0.72,
    indicadores: {
      empregabilidade: 0.42,
      saude_mental: 0.67
    }
  },
  {
    regiao: "SP-ZonaLeste",
    lat: -23.5400,
    lng: -46.4700,
    concentracao_pessoas: 120000,
    cobertura_rede: "3G",
    qualidade_sinal: 0.38,
    indicadores: {
      empregabilidade: 0.31,
      saude_mental: 0.45
    }
  },
  {
    regiao: "SP-Centro",
    lat: -23.5505,
    lng: -46.6333,
    concentracao_pessoas: 200000,
    cobertura_rede: "5G",
    qualidade_sinal: 0.95,
    indicadores: {
      empregabilidade: 0.78,
      saude_mental: 0.82
    }
  },
  {
    regiao: "RJ-ZonaNorte",
    lat: -22.8800,
    lng: -43.2700,
    concentracao_pessoas: 95000,
    cobertura_rede: "4G",
    qualidade_sinal: 0.55,
    indicadores: {
      empregabilidade: 0.38,
      saude_mental: 0.52
    }
  },
  {
    regiao: "RJ-ZonaOeste",
    lat: -22.9400,
    lng: -43.4000,
    concentracao_pessoas: 110000,
    cobertura_rede: "3G",
    qualidade_sinal: 0.30,
    indicadores: {
      empregabilidade: 0.25,
      saude_mental: 0.39
    }
  },
  {
    regiao: "RJ-Centro",
    lat: -22.9068,
    lng: -43.1729,
    concentracao_pessoas: 180000,
    cobertura_rede: "5G",
    qualidade_sinal: 0.91,
    indicadores: {
      empregabilidade: 0.73,
      saude_mental: 0.78
    }
  },
  {
    regiao: "MG-BH-Centro",
    lat: -19.9167,
    lng: -43.9345,
    concentracao_pessoas: 75000,
    cobertura_rede: "4G",
    qualidade_sinal: 0.68,
    indicadores: {
      empregabilidade: 0.55,
      saude_mental: 0.61
    }
  },
  {
    regiao: "MG-Contagem",
    lat: -19.9320,
    lng: -44.0539,
    concentracao_pessoas: 45000,
    cobertura_rede: "3G",
    qualidade_sinal: 0.42,
    indicadores: {
      empregabilidade: 0.34,
      saude_mental: 0.48
    }
  },
  {
    regiao: "BA-Salvador-Centro",
    lat: -12.9714,
    lng: -38.5124,
    concentracao_pessoas: 68000,
    cobertura_rede: "4G",
    qualidade_sinal: 0.60,
    indicadores: {
      empregabilidade: 0.47,
      saude_mental: 0.58
    }
  },
  {
    regiao: "BA-Suburbio",
    lat: -12.8900,
    lng: -38.4800,
    concentracao_pessoas: 92000,
    cobertura_rede: "2G",
    qualidade_sinal: 0.18,
    indicadores: {
      empregabilidade: 0.19,
      saude_mental: 0.28
    }
  }
];

async function main() {
  console.log("Cleaning up database...");
  await prisma.formation.deleteMany();
  await prisma.employment.deleteMany();
  await prisma.regionIndicator.deleteMany();
  await prisma.aIAnalysis.deleteMany();
  await prisma.region.deleteMany();

  console.log("Seeding regions and indicators...");
  const createdRegions: Record<string, any> = {};

  for (const item of mapMockData) {
    const state = item.regiao.split("-")[0]; // "SP", "RJ", "MG", "BA"
    
    const region = await prisma.region.create({
      data: {
        name: item.regiao,
        state: state,
        country: "Brasil",
        latitude: item.lat,
        longitude: item.lng,
      },
    });

    createdRegions[item.regiao] = region;

    // Create indicators in RegionIndicator
    await prisma.regionIndicator.createMany({
      data: [
        {
          indicator: "empregabilidade",
          value: item.indicadores.empregabilidade,
          peopleConcentration: item.concentracao_pessoas,
          networkCoverage: item.cobertura_rede,
          source: "Vísent CDRView + IBGE",
          regionId: region.id,
        },
        {
          indicator: "saude_mental",
          value: item.indicadores.saude_mental,
          peopleConcentration: item.concentracao_pessoas,
          networkCoverage: item.cobertura_rede,
          source: "Vísent CDRView + DATASUS",
          regionId: region.id,
        },
        {
          indicator: "qualidade_sinal",
          value: item.qualidade_sinal,
          peopleConcentration: item.concentracao_pessoas,
          networkCoverage: item.cobertura_rede,
          source: "Vísent CDRView",
          regionId: region.id,
        }
      ]
    });
  }

  // Seed Angola Regions
  const angolaRegions = [
    {
      regiao: "Luanda-Centro",
      estado: "Luanda",
      lat: -8.8390,
      lng: 13.2894
    },
    {
      regiao: "Benguela-Centro",
      estado: "Benguela",
      lat: -12.5760,
      lng: 13.4050
    },
    {
      regiao: "Huambo-Centro",
      estado: "Huambo",
      lat: -12.7761,
      lng: 15.7390
    }
  ];

  for (const item of angolaRegions) {
    const region = await prisma.region.create({
      data: {
        name: item.regiao,
        state: item.estado,
        country: "Angola",
        latitude: item.lat,
        longitude: item.lng,
      },
    });

    createdRegions[item.regiao] = region;
  }

  // Seed formations
  console.log("Seeding formations...");
  await prisma.formation.createMany({
    data: [
      {
        title: "Capacitação Digital Básica",
        description: "Curso de informática para iniciantes",
        type: "Tecnologia",
        provider: "Prefeitura",
        regionId: createdRegions["SP-ZonaLeste"].id,
      },
      {
        title: "Programação Web",
        description: "Curso introdutório de desenvolvimento",
        type: "Tecnologia",
        provider: "SENAI",
        regionId: createdRegions["SP-ZonaSul"].id,
      },
      {
        title: "Empreendedorismo Local",
        description: "Curso de gestão para pequenos negócios",
        type: "Negócios",
        provider: "Sebrae",
        regionId: createdRegions["BA-Suburbio"].id,
      },
      // Angola Formations
      {
        title: "Programação Web",
        description: "Formação em Programação Web",
        type: "Tecnologia",
        provider: "Local",
        regionId: createdRegions["Luanda-Centro"].id,
      },
      {
        title: "Inclusão Digital",
        description: "Formação em Inclusão Digital",
        type: "Tecnologia",
        provider: "Local",
        regionId: createdRegions["Luanda-Centro"].id,
      },
      {
        title: "Alfabetização Digital",
        description: "Formação em Alfabetização Digital",
        type: "Tecnologia",
        provider: "Local",
        regionId: createdRegions["Benguela-Centro"].id,
      },
      {
        title: "Marketing Digital",
        description: "Formação em Marketing Digital",
        type: "Tecnologia",
        provider: "Local",
        regionId: createdRegions["Benguela-Centro"].id,
      },
      {
        title: "Introdução à Tecnologia",
        description: "Formação em Introdução à Tecnologia",
        type: "Tecnologia",
        provider: "Local",
        regionId: createdRegions["Huambo-Centro"].id,
      },
      {
        title: "Empreendedorismo Digital",
        description: "Formação em Empreendedorismo Digital",
        type: "Negócios",
        provider: "Local",
        regionId: createdRegions["Huambo-Centro"].id,
      },
      // Angola Mental Health Services
      {
        title: "Apoio Psicológico",
        description: "Atendimento psicológico e orientação emocional",
        type: "Saúde Mental",
        provider: "Local",
        regionId: createdRegions["Luanda-Centro"].id,
      },
      {
        title: "Bem-estar Comunitário",
        description: "Programa de prevenção da depressão e ansiedade",
        type: "Saúde Mental",
        provider: "Local",
        regionId: createdRegions["Benguela-Centro"].id,
      },
      {
        title: "Saúde Mental Juvenil",
        description: "Acompanhamento psicológico para jovens e famílias",
        type: "Saúde Mental",
        provider: "Local",
        regionId: createdRegions["Huambo-Centro"].id,
      }
    ],
  });

  // Seed employments
  console.log("Seeding employments...");
  await prisma.employment.createMany({
    data: [
      {
        regionId: createdRegions["SP-ZonaLeste"].id,
        unemploymentRate: 18,
        formalEmploymentRate: 42,
        sector: "Serviços",
        demographicGroup: "Jovens",
      },
      {
        regionId: createdRegions["SP-ZonaSul"].id,
        unemploymentRate: 7,
        formalEmploymentRate: 75,
        sector: "Tecnologia",
        demographicGroup: "Adultos",
      },
      {
        regionId: createdRegions["BA-Suburbio"].id,
        unemploymentRate: 25,
        formalEmploymentRate: 20,
        sector: "Comércio",
        demographicGroup: "Geral",
      }
    ],
  });

  console.log("✅ Seed executed successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
