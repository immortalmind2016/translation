import { Router } from "express";
import { importData, translateFile } from "../controller/translate.controller";

import upload from "../utils/multerConfig";
const translateRouter = Router();

translateRouter.post("/", upload.single("file"), translateFile);
translateRouter.post("/import-data", importData);

export default translateRouter;
