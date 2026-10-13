import { PrismaUserRepository } from "@infrastructure/repositories/PrismaUserRepository";
import { hashPassword } from "@infrastructure/auth/password";
import { signToken } from "@infrastructure/auth/token";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class RegisterUserUseCase {
  constructor(private readonly users: PrismaUserRepository) {}

  async execute(input: RegisterInput) {
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();
    const password = input.password;

    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios");
    }
    if (password.length < 6) {
      throw new Error("A senha deve ter ao menos 6 caracteres");
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
    });

    const token = signToken({ sub: user.id, email: user.email, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }
}
