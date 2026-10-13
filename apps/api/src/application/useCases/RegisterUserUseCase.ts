import { PrismaUserRepository } from "@infrastructure/repositories/PrismaUserRepository";
import { hashPassword } from "@infrastructure/auth/password";
import { signToken } from "@infrastructure/auth/token";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  country?: string;
  jobTitle?: string;
  institution?: string;
  role?: string;
}

export function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  birthDate?: Date | null;
  country?: string | null;
  jobTitle?: string | null;
  institution?: string | null;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    birthDate: user.birthDate ?? null,
    country: user.country ?? null,
    jobTitle: user.jobTitle ?? null,
    institution: user.institution ?? null,
  };
}

export class RegisterUserUseCase {
  constructor(private readonly users: PrismaUserRepository) {}

  async execute(input: RegisterInput) {
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();
    const password = input.password;
    const country = input.country?.trim();

    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios");
    }
    if (password.length < 6) {
      throw new Error("A senha deve ter ao menos 6 caracteres");
    }
    if (!input.birthDate) {
      throw new Error("Data de nascimento é obrigatória");
    }
    if (!country) {
      throw new Error("País é obrigatório");
    }

    // Aceita ISO (YYYY-MM-DD) ou Date
    const birthDate = new Date(input.birthDate);
    if (Number.isNaN(birthDate.getTime())) {
      throw new Error("Data de nascimento inválida");
    }
    const now = new Date();
    if (birthDate > now) {
      throw new Error("Data de nascimento não pode ser no futuro");
    }
    const age = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 13 || age > 120) {
      throw new Error("Data de nascimento fora do intervalo permitido");
    }

    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new Error("Email já cadastrado");
    }

    const user = await this.users.create({
      name,
      email,
      passwordHash: hashPassword(password),
      role: input.role ?? "user",
      birthDate,
      country,
      jobTitle: input.jobTitle?.trim() || null,
      institution: input.institution?.trim() || null,
    });

    const token = signToken({ sub: user.id, email: user.email, role: user.role });

    return { token, user: toPublicUser(user) };
  }
}
