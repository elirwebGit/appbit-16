import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { GetDashboardDataUseCase } from "@application/useCases/GetDashboardDataUseCase";
import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

const dashboardRouter = Router();

// dependencies
const regionRepository = new PrismaRegionRepository();
const geminiProvider = new GeminiProvider();
const analysisRepository = new PrismaAIAnalysisRepository();
const getDashboardDataUseCase = new GetDashboardDataUseCase(
  regionRepository,
  geminiProvider,
  analysisRepository,
);

const dashboardController = new DashboardController(getDashboardDataUseCase);

/**
 * @openapi
 * /dashboard:
 *   get:
 *     summary: Retorna dados consolidados do dashboard com análise de IA
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dados do dashboard + insight da IA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
dashboardRouter.get("/", (req, res) =>
  dashboardController.getDashboard(req, res),
);

export { dashboardRouter };
