import { SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lengoo Translation API",
      version: "1.0.0",
      servers: ["http://localhost:4000"],
    },
  },

  apis: ["./src/modules/**/*.controller.ts"], // files containing annotations as above
};
