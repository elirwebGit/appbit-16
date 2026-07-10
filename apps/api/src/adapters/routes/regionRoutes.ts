import { Router } from "express";

import { RegionController } from "../controllers/RegionController";

import { PrismaRegionRepository } from "@infrastructure/repositories/PrismaRegionRepository";
import { AskQuestionRegionUseCase } from "@application/useCases/AskQuestionRegionUseCase";
import { GetMapRegionsUseCase } from "@application/useCases/GetMapRegionsUseCase";
import { CreateRegionUseCase } from "@application/useCases/CreateRegionUseCase";
import { DeleteRegionUseCase } from "@application/useCases/DeleteRegionUseCase";
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

const getMapRegionsUseCase = new GetMapRegionsUseCase(regionRepository);
const createRegionUseCase = new CreateRegionUseCase(regionRepository);
const deleteRegionUseCase = new DeleteRegionUseCase(regionRepository);

const regionController = new RegionController(
  askQuestionRegionUseCase,
  getMapRegionsUseCase,
  createRegionUseCase,
  deleteRegionUseCase
);

/**
 * @openapi
 * /regions:
 *   get:
 *     summary: Retorna a lista de todas as regiões com coordenadas e indicadores formatados para o mapa
 *     tags:
 *       - Regions
 *     responses:
 *       200:
 *         description: Lista de regiões formatada para o Leaflet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   regiao:
 *                     type: string
 *                   nome_exibicao:
 *                     type: string
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *                   concentracao_pessoas:
 *                     type: number
 *                   cobertura_rede:
 *                     type: string
 *                   qualidade_sinal:
 *                     type: number
 *                   indicadores:
 *                     type: object
 *                     properties:
 *                       empregabilidade:
 *                         type: number
 *                       saude_mental:
 *                         type: number
 */
region.get("/", (req, res) => regionController.getAll(req, res));

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
region.post("/analysis", (req, res) => regionController.analyze(req, res));

/**
 * @openapi
 * /regions:
 *   post:
 *     summary: Cria uma nova região
 *     tags:
 *       - Regions
 *     responses:
 *       201:
 *         description: Região criada com sucesso
 */
region.post("/", (req, res) => regionController.create(req, res));

/**
 * @openapi
 * /regions/{id}:
 *   delete:
 *     summary: Remove uma região
 *     tags:
 *       - Regions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Região removida com sucesso
 */
region.delete("/:id", (req, res) => regionController.delete(req, res));

export { region };
