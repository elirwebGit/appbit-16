import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AppBit API",
      version: "1.0.0",
      description:
        "API do sistema AppBit - Dados públicos para inclusão social",
    },
    servers: [
      {
        url: process.env.PORT || `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["src/adapters/routes/*.ts"],
});
