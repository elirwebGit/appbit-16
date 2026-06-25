import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const regionIndicatorsRouter = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /region/{id}/indicators:
 *   get:
 *     summary: Lista indicadores de uma região
 *     description: Retorna todos os indicadores (Vísent CDRView + fontes públicas) de uma região específica.
 *     tags:
 *       - Regions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da região (UUID)
 *     responses:
 *       200:
 *         description: Lista de indicadores da região
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   indicator:
 *                     type: string
 *                   value:
 *                     type: number
 *                   peopleConcentration:
 *                     type: integer
 *                   networkCoverage:
 *                     type: string
 *                   source:
 *                     type: string
 *       404:
 *         description: Região não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

regionIndicatorsRouter.get("/:id/indicators", async (req, res) => {
  const { id } = req.params;

  const region = await prisma.region.findUnique({
    where: { id },
    include: {
      indicators: true,
    },
  });

  if (!region) {
    return res.status(404).json({ error: "Region not found" });
  }

  return res.json(region.indicators);
});

export { regionIndicatorsRouter };
