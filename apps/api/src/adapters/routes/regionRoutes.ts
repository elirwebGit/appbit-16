import { Router } from "express";
import { RegionController } from "../controllers/RegionController";
import { GetRegionsUseCase } from "../../application/useCases/GetRegionsUseCase";
import { InMemoryRegionRepository } from "../../infrastructure/repositories/InMemoryRegionRepository";

const router = Router();

const regionRepository = new InMemoryRegionRepository();
const getRegionsUseCase = new GetRegionsUseCase(regionRepository);
const regionController = new RegionController(getRegionsUseCase);

/**
 * @openapi
 * /regions:
 *   get:
 *     summary: Lista todas as regiões
 *     tags:
 *       - Regions
 *     responses:
 *       200:
 *         description: Lista de regiões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 */
router.get("/regions", (req, res) => regionController.getAll(req, res));

export { router };
