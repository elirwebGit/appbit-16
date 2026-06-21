import { Router } from "express";
import { CrossRegionAnalysisUseCase } from "@application/useCases/CrossRegionAnalysisUseCase";
import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { CrossRegionController } from "@adapters/controllers/CrossRegionController";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

const crossRegionRouter = Router();

const regionRepository = new PrismaRegionRepository();
const geminiProvider = new GeminiProvider();
const analysisRepository = new PrismaAIAnalysisRepository();
const crossRegionUseCase = new CrossRegionAnalysisUseCase(
  regionRepository,
  geminiProvider,
  analysisRepository,
);
const controller = new CrossRegionController(crossRegionUseCase);

/**
 * @openapi
 * /cross-region:
 *   post:
 *     summary: Compara duas regiões e gera análise de desigualdade
 *     tags:
 *       - Analysis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - regionAId
 *               - regionBId
 *             properties:
 *               regionAId:
 *                 type: string
 *                 description: ID da primeira região
 *               regionBId:
 *                 type: string
 *                 description: ID da segunda região
 *     responses:
 *       200:
 *         description: Análise comparativa entre regiões
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 regions:
 *                   type: object
 *                   properties:
 *                     A:
 *                       type: string
 *                     B:
 *                       type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     A:
 *                       type: object
 *                       properties:
 *                         connectivity:
 *                           type: number
 *                         employability:
 *                           type: number
 *                         population:
 *                           type: number
 *                     B:
 *                       type: object
 *                       properties:
 *                         connectivity:
 *                           type: number
 *                         employability:
 *                           type: number
 *                         population:
 *                           type: number
 *                 comparison:
 *                   type: object
 *                   properties:
 *                     employabilityGap:
 *                       type: number
 *                     connectivityGap:
 *                       type: number
 *                     populationPressureGap:
 *                       type: number
 *                 insight:
 *                   type: string
 */

crossRegionRouter.post("/", (req, res) => controller.analyze(req, res));

export { crossRegionRouter };
