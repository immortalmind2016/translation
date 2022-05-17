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
 *         description: Returns a message contains the status.
 *         content:
 *             application/json:
 *                  schema:
 *                     properties:
 *                          message:
 *                              type: string
 *                              example: Subtitles have been successfully translated, We will send it ASAP to your email
 */
translateRouter.post("/", upload.single("file"), translateFile);

/**
 * @openapi
 * "/translate/import-data":
 *   post:
 *     summary: Add translation data to the store
 *     requestBody:
 *       description: Test
 *       content:
 *         application/x-www-form-urlencoded:
 *              schema:
 *                  properties:
 *                      data:
 *                          example: [ { "source": "Hello World", "target": "Hallo Welt", "sourceLanguage": "en", "targetLanguage": "de" }, { "source": "Hello guys", "target": "Hallo Leute", "sourceLanguage": "en", "targetLanguage": "de" }, { "source": "I walk to the supermarket", "target": "Ich gehe zum Supermarkt.", "sourceLanguage": "en", "targetLanguage": "de" } ]
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  source:
 *                                      type: string
 *                                  targe:
 *                                      type: string
 *                                  sourceLanguage:
 *                                      type: string
 *                                  targetLanguage:
 *                                      type: string
 *
 *
 *     responses:
 *       200:
 *         description: return the created documents
 *         content:
 *             application/json:
 *                  schema:
 *                     properties:
 *                          data:
 *                              type: array
 */
translateRouter.post("/import-data", importData);

export default translateRouter;
