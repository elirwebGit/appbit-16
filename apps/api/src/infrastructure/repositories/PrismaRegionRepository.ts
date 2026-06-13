import { IRegionRepository } from "../../domain/repositories/IRegionRepository";
import { Region } from "../../domain/entities/Region";
import { prisma } from "@infrastructure/prisma/client";

export class PrismaRegionRepository implements IRegionRepository {
  async findAll(): Promise<Region[]> {
    const regions = await prisma.region.findMany();

    return regions.map(
      (region: Region) =>
        new Region(region.id, region.name, region.state, region.country),
    );
  }

  async findById(id: string): Promise<Region | null> {
    const region = await prisma.region.findUnique({
      where: { id },
    });

    if (!region) return null;

    return new Region(region.id, region.name, region.state, region.country);
  }
}
