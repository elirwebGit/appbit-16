import { Router } from "express";
import {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3, STORAGE_BUCKET } from "@infrastructure/storage/s3";

const storageRoute = Router();

/**
 * @openapi
 * /storage/upload:
 *   post:
 *     summary: Envia um objeto para o Neon Object Storage (bucket "assets")
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, content]
 *             properties:
 *               key:
 *                 type: string
 *               content:
 *                 type: string
 *               contentType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Objeto enviado
 */
storageRoute.post("/upload", async (req, res) => {
  const { key, content, contentType } = req.body ?? {};
  if (!key || typeof content !== "string") {
    return res.status(400).json({ error: "key e content são obrigatórios" });
  }
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: STORAGE_BUCKET,
        Key: key,
        Body: content,
        ContentType: contentType ?? "text/plain",
      }),
    );
    return res.status(201).json({ ok: true, bucket: STORAGE_BUCKET, key });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Falha ao enviar objeto", detail: String(err) });
  }
});

/**
 * @openapi
 * /storage/url:
 *   get:
 *     summary: Gera uma URL pré-assinada (GET) para um objeto
 *     tags: [Storage]
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: URL pré-assinada
 */
storageRoute.get("/url", async (req, res) => {
  const key = String(req.query.key ?? "");
  if (!key) return res.status(400).json({ error: "key é obrigatório" });
  try {
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: STORAGE_BUCKET, Key: key }),
      { expiresIn: 3600 },
    );
    return res.json({ url });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Falha ao gerar URL", detail: String(err) });
  }
});

/**
 * @openapi
 * /storage/list:
 *   get:
 *     summary: Lista os objetos do bucket
 *     tags: [Storage]
 *     responses:
 *       200:
 *         description: Lista de objetos
 */
storageRoute.get("/list", async (_req, res) => {
  try {
    const out = await s3.send(
      new ListObjectsV2Command({ Bucket: STORAGE_BUCKET }),
    );
    const keys = (out.Contents ?? []).map((o) => ({ key: o.Key, size: o.Size }));
    return res.json({ bucket: STORAGE_BUCKET, count: keys.length, keys });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Falha ao listar objetos", detail: String(err) });
  }
});

export { storageRoute };
