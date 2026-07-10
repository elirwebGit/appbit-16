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

  async findIndicators(regionId?: string) {
    return prisma.region.findMany({
      where: regionId ? { id: regionId } : undefined,
      include: {
        indicators: true,
        employments: true,
        formations: true,
      },
    });
  }

  async findDashboardData() {
    return prisma.region.findMany({
      include: {
        indicators: true,
        employments: true,
        formations: true,
      },
    });
  }

  async findByIdWithRelations(id: string) {
    return prisma.region.findUnique({
      where: { id },

      include: {
        indicators: true,
        employments: true,
        formations: true,
      },
    });
  }

  async create(data: any) {
    return prisma.region.create({
      data,
    });
  }

  async delete(id: string) {
    // Delete relations first
    await prisma.regionIndicator.deleteMany({ where: { regionId: id } });
    await prisma.formation.deleteMany({ where: { regionId: id } });
    await prisma.employment.deleteMany({ where: { regionId: id } });
    
    return prisma.region.delete({
      where: { id },
    });
  }
}
