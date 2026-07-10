import * as dotenv from "dotenv";
import { defineConfig } from "@prisma/config";

// Injeta as variáveis do Railway no processo do Node
dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
