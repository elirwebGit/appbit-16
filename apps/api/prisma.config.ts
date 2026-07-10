import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

if (!process.env.RAILWAY_ENVIRONMENT) {
  dotenv.config();
}

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
