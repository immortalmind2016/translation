import express from "express";
import config from "./config";
import translateRouter from "./route/translate.routes";
const app = express();

app.use("/translate", translateRouter);
app.listen(config.PORT, () => {
  console.log(`The service has been started on port ${config.PORT}`);
});
