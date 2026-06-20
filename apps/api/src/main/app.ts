import express from "express";
import { region } from "../adapters/routes/regionRoutes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { aiRouter } from "@adapters/routes/aiRoutes";
import { analysisRouter } from "@adapters/routes/aiAnalyseRoute";

const app = express();

app.use(express.json());

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", region);
app.use("/api", analysisRouter);

app.use("/api/ai", aiRouter);

// Health
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "appbit-api",
  });
});

export { app };
