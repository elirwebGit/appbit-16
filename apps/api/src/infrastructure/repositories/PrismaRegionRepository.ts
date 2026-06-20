import { prisma } from "../prisma/client";

export class PrismaRegionRepository {
  async findAll() {
    return prisma.region.findMany();
  }

  async findById(id: string) {
    return prisma.region.findUnique({
      where: {
        id,
      },
    });
  }
}
