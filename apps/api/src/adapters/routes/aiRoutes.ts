import { Router } from "express";

import { AIController } from "@adapters/controllers/AIController";
import { AskQuestionUseCase } from "@application/useCases/AskQuestionUseCase";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";

const router = Router();

const geminiProvider = new GeminiProvider();
const askQuestionUseCase = new AskQuestionUseCase(geminiProvider);
const aiController = new AIController(askQuestionUseCase);

/**
 * @openapi
 * /ai/query:
 *   post:
 *     summary: Consulta IA Gemini
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
 *                 example: Onde devo investir em inclusão digital?
 *     responses:
 *       200:
 *         description: Resposta gerada pela IA
 */
router.post("/query", (req, res) => aiController.ask(req, res));

export { router as aiRouter };
