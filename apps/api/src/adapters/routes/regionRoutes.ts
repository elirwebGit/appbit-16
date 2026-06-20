import { Router } from "express";

import { RegionController } from "../controllers/RegionController";

import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { AskQuestionRegionUseCase } from "@application/useCases/AskQuestionRegionUseCase";
import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
import { PrismaAIAnalysisRepository } from "@infrastructure/repositories/PrismaAIAnalysisRepository";

const region = Router();

const regionRepository = new PrismaRegionRepository();
const geminiProvider = new GeminiProvider();
const analysisRepository = new PrismaAIAnalysisRepository();

const askQuestionRegionUseCase = new AskQuestionRegionUseCase(
  geminiProvider,
  regionRepository,
  analysisRepository,
);

const regionController = new RegionController(askQuestionRegionUseCase);

/**
 * @openapi
 * /regions/analysis:
 *   post:
 *     summary: Analisa indicadores regionais utilizando IA
 *     tags:
 *       - Regions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: Qual região deve receber prioridade de investimento?
 *     responses:
 *       200:
 *         description: Análise gerada pela IA
 */
region.post("/regions/analysis", (req, res) =>
  regionController.analyze(req, res),
);

export { region };
