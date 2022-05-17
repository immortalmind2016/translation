import { Router } from "express";
import { importData, translateFile } from "../controller/translate.controller";
import upload from "../config/multerConfig";

const translateRouter = Router();
/**
 * @openapi
 * "/translate":
 *   post:
 *     summary: Translate your subtitle file
 *     requestBody:
 *       description: Test
 *       content:
 *         application/x-www-form-urlencoded:
 *              schema:
 *                  properties:
 *                      file:
 *                          type: string
 *                          format: binary
 *
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *             application/json:
 *                  schema:
 *                     properties:
 *                          message:
 *                              type: string
 *                              example: Subtitles have been successfully translated, We will send it ASAP to your email
 */
translateRouter.post("/", upload.single("file"), translateFile);

translateRouter.post("/import-data", importData);

export default translateRouter;
