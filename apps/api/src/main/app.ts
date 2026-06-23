import express from "express";
import { region } from "../adapters/routes/regionRoutes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { aiRouter } from "@adapters/routes/aiRoutes";
import { analysisRouter } from "@adapters/routes/aiAnalyseRoute";
import { crossRegionRouter } from "@adapters/routes/crossRegionRoute";
import { dashboardRouter } from "@adapters/routes/dashboardRouter";
import { regionIndicatorsRouter } from "@adapters/routes/regionIndicatorsRouter";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/regions", region);
app.use("/api/analysis", analysisRouter);
app.use("/api/cross-region", crossRegionRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/region", regionIndicatorsRouter);

app.use("/api/ai", aiRouter); // vou remover

// Health
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "appbit-api",
  });
});

export { app };
