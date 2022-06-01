import { Router } from "express";
import upload from "../../config/multerConfig";
import { sendSubtitlesEmail } from "./utils/translation";
import { importDataSchema, translateFileSchema } from "../../utils/validator";
import { TranslationService } from "./translation.service";
import { TextTranslationDocument, TextTranslationStatus } from "../../types";
import { TextModel } from "./translation.model";
import { errorsText } from "../../utils/errors";

const translateRouter = Router();
/**
 * @openapi
 * "/translation":
 *   post:
 *     summary: Translate your subtitle file
 *     requestBody:
 *       description: Test
 *       content:
 *         application/x-www-form-urlencoded:
 *              schema:
 *                  properties:
 *                      email:
 *                         type: string
 *                      fromLanguage:
 *                          type: string
 *                      toLanguage:
 *                          type: string
 *                      files:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
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
translateRouter.post("/", upload.array("files"), async (req, res, err) => {
  const body = req.body;
  const result = translateFileSchema.validate(body, { abortEarly: false });
  const { error } = result;

  if (!!error) {
    return res.status(422).json({
      error: errorsText(error),
    });
  }

  if (!req.files || !req.files.length) {
    return res
      .status(422)
      .json({ error: "Your input doesn't contain the required file" });
  }
  const { email, fromLanguage, toLanguage } = body;
  const translatedSubtitles = await TranslationService.translateFile(
    req.files,
    { fromLanguage, toLanguage }
  );

  try {
    await sendSubtitlesEmail(translatedSubtitles, email);
    res.json({
      message:
        "Subtitles have been successfully translated, We will send it ASAP to your email",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message:
        "Something went wrong with the email provider while sending your email",
    });
  }
});

/**
 * @openapi
 * "/translation/import-data":
 *   post:
 *     summary: Add translation data to the store
 *     requestBody:
 *       description: Test
 *       content:
 *         application/json:
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

translateRouter.post("/import-data", async (req, res, err) => {
  const body = req.body;
  const result = importDataSchema.validate(body, { abortEarly: false });
  const { error } = result;

  if (!!error) {
    return res.status(422).json({
      error: errorsText(error),
    });
  }

  const data = body.data;
  const textTranslationDocument = await TranslationService.importData(data);

  return res.json({
    data: textTranslationDocument,
  });
});

export default translateRouter;
