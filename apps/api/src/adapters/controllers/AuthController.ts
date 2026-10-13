import { Request, Response } from "express";
import { RegisterUserUseCase, toPublicUser } from "@application/useCases/RegisterUserUseCase";
import { LoginUserUseCase } from "@application/useCases/LoginUserUseCase";
import { PrismaUserRepository } from "@infrastructure/repositories/PrismaUserRepository";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUserUseCase,
    private readonly users: PrismaUserRepository,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.registerUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Erro ao cadastrar" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.loginUseCase.execute(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message || "Credenciais inválidas" });
    }
  }

  async me(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as Request & { userId?: string }).userId!;
      const user = await this.users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.json(toPublicUser(user));
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro interno" });
    }
  }
}
