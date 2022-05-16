import { Router } from "express";
import { translateFile } from "../controller/translate.controller";

import upload from "../utils/multerConfig";
const translateRouter = Router();

translateRouter.post("/", upload.single("file"), translateFile);

export default translateRouter;
