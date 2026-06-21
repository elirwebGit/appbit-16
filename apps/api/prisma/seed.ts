import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const north = await prisma.region.create({
    data: {
      name: "Zona Norte",
      state: "SP",
      country: "Brasil",
    },
  });

  const south = await prisma.region.create({
    data: {
      name: "Zona Sul",
      state: "SP",
      country: "Brasil",
    },
  });

  const spCentro = await prisma.region.create({
    data: {
      name: "SP-Centro",
      state: "SP",
      country: "Brasil",
    },
  });

  const spZonaLeste = await prisma.region.create({
    data: {
      name: "SP-ZonaLeste",
      state: "SP",
      country: "Brasil",
    },
  });

  const salvadorCentro = await prisma.region.create({
    data: {
      name: "BA-Salvador-Centro",
      state: "BA",
      country: "Brasil",
    },
  });

  const suburbio = await prisma.region.create({
    data: {
      name: "BA-Suburbio",
      state: "BA",
      country: "Brasil",
    },
  });

  const rjZonaOeste = await prisma.region.create({
    data: {
      name: "RJ-ZonaOeste",
      state: "RJ",
      country: "Brasil",
    },
  });

  await prisma.formation.createMany({
    data: [
      {
        title: "Capacitação Digital Básica",
        description: "Curso de informática para iniciantes",
        type: "Tecnologia",
        provider: "Prefeitura",
        regionId: north.id,
      },
      {
        title: "Programação Web",
        description: "Curso introdutório de desenvolvimento",
        type: "Tecnologia",
        provider: "SENAI",
        regionId: south.id,
      },
    ],
  });

  await prisma.employment.createMany({
    data: [
      {
        regionId: north.id,
        unemploymentRate: 18,
        formalEmploymentRate: 42,
        sector: "Serviços",
        demographicGroup: "Jovens",
      },
      {
        regionId: south.id,
        unemploymentRate: 7,
        formalEmploymentRate: 75,
        sector: "Tecnologia",
        demographicGroup: "Adultos",
      },
    ],
  });

  await prisma.regionIndicator.createMany({
    data: [
      {
        indicator: "empregabilidade",
        value: 0.78,
        peopleConcentration: 200000,
        networkCoverage: "5G",
        source: "Vísent CDRView + IBGE",
        regionId: spCentro.id,
      },
      {
        indicator: "empregabilidade",
        value: 0.31,
        peopleConcentration: 120000,
        networkCoverage: "3G",
        source: "Vísent CDRView + IBGE",
        regionId: spZonaLeste.id,
      },
      {
        indicator: "empregabilidade",
        value: 0.47,
        peopleConcentration: 68000,
        networkCoverage: "4G",
        source: "Vísent CDRView + IBGE",
        regionId: salvadorCentro.id,
      },
      {
        indicator: "empregabilidade",
        value: 0.19,
        peopleConcentration: 92000,
        networkCoverage: "2G",
        source: "Vísent CDRView + IBGE",
        regionId: suburbio.id,
      },
      {
        indicator: "saude_mental",
        value: 0.28,
        peopleConcentration: 92000,
        networkCoverage: "2G",
        source: "Vísent CDRView + DATASUS",
        regionId: suburbio.id,
      },
      {
        indicator: "saude_mental",
        value: 0.39,
        peopleConcentration: 110000,
        networkCoverage: "3G",
        source: "Vísent CDRView + DATASUS",
        regionId: rjZonaOeste.id,
      },
      {
        indicator: "saude_mental",
        value: 0.45,
        peopleConcentration: 120000,
        networkCoverage: "3G",
        source: "Vísent CDRView + DATASUS",
        regionId: spZonaLeste.id,
      },
      {
        indicator: "empregabilidade",
        value: 0.42,
        peopleConcentration: 85000,
        networkCoverage: "4G",
        source: "Vísent CDRView + IBGE",
        regionId: south.id,
      },
    ],
  });

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
