import express from "express";
import config from "./config";
import translateRouter from "./route/translate.routes";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJs from "swagger-jsdoc";
import { swaggerOptions } from "./config/swaggerConfig";
import backofficeRouter from "./route/backoffice.routes";

mongoose.connect(config.MONGO_URI);

export const app = express();
const swaggerDocument = swaggerJs(swaggerOptions);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/translate", translateRouter);
app.use("/backoffice/", backofficeRouter);
export const server = app.listen(config.PORT, () => {
  console.log(`The service has been started on port ${config.PORT}`);
});
