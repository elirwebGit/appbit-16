import { prisma } from "../prisma/client";

export class PrismaAIAnalysisRepository {
  async save(question: string, answer: string) {
    return prisma.aIAnalysis.create({
      data: {
        question,
        answer,
      },
    });
  }

  async findAll() {
    return prisma.aIAnalysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
