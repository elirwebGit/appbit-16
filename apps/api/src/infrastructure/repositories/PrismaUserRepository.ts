import { prisma } from "../prisma/client";

export class PrismaUserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: string;
    birthDate?: Date | null;
    country?: string | null;
    jobTitle?: string | null;
    institution?: string | null;
  }) {
    return prisma.user.create({ data });
  }
}
