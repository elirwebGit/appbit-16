import { Router } from "express";

const functionsRoute = Router();

// URL pública da Neon Function `hello` (injetada por `neon deploy` em .env.local).
const HELLO_BASE_URL = process.env.NEON_FUNCTION_HELLO_BASE_URL;

/**
 * @openapi
 * /functions/hello:
 *   get:
 *     summary: Encaminha a chamada para a Neon Function `hello`
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Resposta da function (inclui contagem de regiões no banco)
 */
functionsRoute.get("/hello", async (_req, res) => {
  if (!HELLO_BASE_URL) {
    return res
      .status(503)
      .json({ error: "NEON_FUNCTION_HELLO_BASE_URL não definida" });
  }
  try {
    const upstream = await fetch(HELLO_BASE_URL);
    const text = await upstream.text();
    return res
      .status(upstream.status)
      .type(upstream.headers.get("content-type") ?? "text/plain")
      .send(text);
  } catch (err) {
    return res
      .status(502)
      .json({ error: "Falha ao chamar a Neon Function", detail: String(err) });
  }
});

export { functionsRoute };
