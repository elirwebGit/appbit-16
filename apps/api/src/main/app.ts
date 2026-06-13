import express from "express";
import { router } from "../adapters/routes/regionRoutes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(express.json());

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", router);

// Health
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "appbit-api",
  });
});

export { app };
