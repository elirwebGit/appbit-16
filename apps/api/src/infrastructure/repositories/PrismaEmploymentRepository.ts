import { IEmploymentRepository } from "../../domain/repositories/IEmploymentRepository";
import { Employment } from "../../domain/entities/Employment";
import { prisma } from "../prisma/client";

export class PrismaEmploymentRepository implements IEmploymentRepository {
  async findAll(): Promise<Employment[]> {
    const data = await prisma.employment.findMany();

    return data.map(
      (e: Employment) =>
        new Employment(
          e.id,
          e.regionId,
          e.unemploymentRate,
          e.formalEmploymentRate,
          e.sector,
          e.demographicGroup,
        ),
    );
  }

  async findByRegion(regionId: string): Promise<Employment[]> {
    const data = await prisma.employment.findMany({
      where: { regionId },
    });

    return data.map(
      (e: Employment) =>
        new Employment(
          e.id,
          e.regionId,
          e.unemploymentRate,
          e.formalEmploymentRate,
          e.sector,
          e.demographicGroup,
        ),
    );
  }
}
