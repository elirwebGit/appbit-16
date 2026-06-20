import { Router } from "express";

import { AIAnalysisController } from "../controllers/AIAnalysisController";

import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

const analysisRouter = Router();

const repository = new PrismaAIAnalysisRepository();

const controller = new AIAnalysisController(repository);

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
analysisRouter.get("/analysis/history", (req, res) =>
  controller.getHistory(req, res),
);

export { analysisRouter };
