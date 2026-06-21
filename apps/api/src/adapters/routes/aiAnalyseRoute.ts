import { Router } from "express";

import { AIAnalysisController } from "../controllers/AIAnalysisController";

import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";
import { GetAnalysisHistoryUseCase } from "@application/useCases/GetAnalysisHistoryUseCase";

const analysisRouter = Router();

const repository = new PrismaAIAnalysisRepository();
const getAnalysisHistoryUseCase = new GetAnalysisHistoryUseCase(repository);
const controller = new AIAnalysisController(getAnalysisHistoryUseCase);

/**
 * @openapi
 * /analysis/history:
 *   get:
 *     summary: Histórico das análises realizadas
 *     tags:
 *       - Analysis
 *     responses:
 *       200:
 *         description: Lista de análises
 */
analysisRouter.get("/history", (req, res) => controller.getHistory(req, res));

export { analysisRouter };
