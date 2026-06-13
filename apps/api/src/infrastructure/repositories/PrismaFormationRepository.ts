import { IFormationRepository } from "../../domain/repositories/IFormationRepository";
import { Formation } from "../../domain/entities/Formation";
import { prisma } from "../prisma/client";

export class PrismaFormationRepository implements IFormationRepository {
  async findAll(): Promise<Formation[]> {
    const formations = await prisma.formation.findMany();

    return formations.map(
      (f: Formation) =>
        new Formation(
          f.id,
          f.title,
          f.description,
          f.regionId,
          f.type as any,
          f.provider,
        ),
    );
  }

  async findByRegion(regionId: string): Promise<Formation[]> {
    const formations = await prisma.formation.findMany({
      where: { regionId },
    });

    return formations.map(
      (f: Formation) =>
        new Formation(
          f.id,
          f.title,
          f.description,
          f.regionId,
          f.type as any,
          f.provider,
        ),
    );
  }

  async findById(id: string): Promise<Formation | null> {
    const f = await prisma.formation.findUnique({
      where: { id },
    });

    if (!f) return null;

    return new Formation(
      f.id,
      f.title,
      f.description,
      f.regionId,
      f.type as any,
      f.provider,
    );
  }
}
