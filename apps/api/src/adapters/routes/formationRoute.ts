import { Router } from "express";

import { AIController } from "@adapters/controllers/AIController";
import { AskQuestionUseCase } from "@application/useCases/AskQuestionUseCase";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { AskQuestionFormationUseCase } from "@application/useCases/AskQuestionFormationUseCase";
import { PrismaFormationRepository } from "@infrastructure/repositories/PrismaFormationRepository";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { FormationController } from "@adapters/controllers/FormationController";

const formationRoute = Router();

const geminiProvider = new GeminiProvider();
const formationRepository = new PrismaFormationRepository();
const analysisRepository = new PrismaAIAnalysisRepository();
const askQuestionFormationUseCase = new AskQuestionFormationUseCase(
  geminiProvider,
  formationRepository,
  analysisRepository,
);
const formationController = new FormationController(
  askQuestionFormationUseCase,
);

/**
 * @openapi
 * /formation:
 *   post:
 *     summary: Consulta Formação com o Uso da I.A
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
 *                 example: Qual Formação devo seguir no mercado de trabalho com base no Vísent ?
 *     responses:
 *       200:
 *         description: Resposta gerada pela IA
 */
formationRoute.post("/query", (req, res) => formationController.ask(req, res));

export { formationRoute };
