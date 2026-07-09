import { Router } from "express";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { EmploymentController } from "@adapters/controllers/EmploymentController";
import { PrismaEmploymentRepository } from "@infrastructure/repositories/PrismaEmploymentRepository";
import { AskQuestionEmploymentUseCase } from "@application/useCases/AskQuestionEmploymentUseCase";

const employmentRoute = Router();

const geminiProvider = new GeminiProvider();
const employmentRepository = new PrismaEmploymentRepository();
const analysisRepository = new PrismaAIAnalysisRepository();
const askQuestionEmploymentUseCase = new AskQuestionEmploymentUseCase(
  geminiProvider,
  employmentRepository,
  analysisRepository,
);
const employmentController = new EmploymentController(
  askQuestionEmploymentUseCase,
);

/**
 * @openapi
 * /employment:
 *   post:
 *     summary: Consulta de Emprego com o Uso da I.A
 *     tags:
 *       - AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: Com base no Vísent qual região devo procurar emprego?
 *     responses:
 *       200:
 *         description: Resposta gerada pela IA
 */
employmentRoute.post("/query", (req, res) =>
  employmentController.ask(req, res),
);

export { employmentRoute };
