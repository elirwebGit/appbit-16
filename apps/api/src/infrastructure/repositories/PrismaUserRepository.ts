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
  }) {
    return prisma.user.create({ data });
  }
}
