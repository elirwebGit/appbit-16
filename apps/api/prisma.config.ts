import dotenv from "dotenv";
import path from "node:path";
import { defineConfig } from "@prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

// Carrega o .env da API e, na sequência, o .env.local gerado pelo Neon (na raiz do repo).
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env.local") });

// Usa o Schema Engine em JS com o driver `pg` (Node). Isso evita a resolução
// apenas-IPv6 do engine Rust e usa a conexão direta (unpooled) para migrations.
export default defineConfig({
  schema: "./prisma/schema.prisma",
  experimental: { adapter: true },
  engine: "js",
  adapter: async () =>
    new PrismaPg({
      connectionString:
        process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
    }),
});
