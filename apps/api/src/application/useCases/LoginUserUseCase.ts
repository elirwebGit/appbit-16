import { PrismaUserRepository } from "@infrastructure/repositories/PrismaUserRepository";
import { verifyPassword } from "@infrastructure/auth/password";
import { signToken } from "@infrastructure/auth/token";
import { toPublicUser } from "./RegisterUserUseCase";

interface LoginInput {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private readonly users: PrismaUserRepository) {}

  async execute(input: LoginInput) {
    const email = input.email?.trim().toLowerCase();
    const password = input.password;

    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await this.users.findByEmail(email);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new Error("Credenciais inválidas");
    }

    const token = signToken({ sub: user.id, email: user.email, role: user.role });

    return { token, user: toPublicUser(user) };
  }
}
