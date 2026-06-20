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

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
