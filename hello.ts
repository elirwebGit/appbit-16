import { Pool } from "pg";

// Pool no escopo do módulo: reutilizado entre requisições no mesmo isolate.
// DATABASE_URL (pooled) é injetada automaticamente pelo Neon nas Functions.
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

export default async function hello(): Promise<Response> {
  try {
    const { rows } = await pool.query<{ regions: number }>(
      'SELECT count(*)::int AS regions FROM "Region"',
    );
    return Response.json({
      message: "Hello from Neon Functions",
      regions: rows[0]?.regions ?? 0,
    });
  } catch (err) {
    return Response.json({
      message: "Hello from Neon Functions",
      error: String(err),
    });
  }
}
