import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { RegisterUserUseCase } from "@application/useCases/RegisterUserUseCase";
import { LoginUserUseCase } from "@application/useCases/LoginUserUseCase";
import { PrismaUserRepository } from "@infrastructure/repositories/PrismaUserRepository";
import { authMiddleware } from "@adapters/middleware/authMiddleware";

const authRouter = Router();

const users = new PrismaUserRepository();
const authController = new AuthController(
  new RegisterUserUseCase(users),
  new LoginUserUseCase(users),
  users,
);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Cria uma conta de usuário
 *     tags: [Auth]
 *   responses:
 *     201: { description: Usuário criado }
 */
authRouter.post("/register", (req, res) => authController.register(req, res));

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica e retorna um token JWT
 *     tags: [Auth]
 *   responses:
 *     200: { description: Token JWT + usuário }
 */
authRouter.post("/login", (req, res) => authController.login(req, res));

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Retorna o usuário autenticado (requer Bearer token)
 *     tags: [Auth]
 *   responses:
 *     200: { description: Usuário atual }
 */
authRouter.get("/me", authMiddleware, (req, res) => authController.me(req, res));

export { authRouter };
