import { Router } from "express";
import { TextModel } from "../../modules/translation/translation.model";
import { RequestWithData, TextTranslationStatus } from "../../types";
import { errorsText } from "../../utils/errors";
import { updateStatusSchema } from "../../utils/validator";
import { backofficeService } from "./backoffice.service";

const backofficeRouter = Router();

/**
 * @openapi
 * "/backoffice/translations/:id/status":
 *   put:
 *     summary: change the status of the translation text
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *              schema:
 *                  properties:
 *                      status:
 *                          example: APPROVED
 *                          type: string
 *                          enum: [UNDER_REVIEW,APPROVED,DECLINED]
 *
 *
 *     responses:
 *       200:
 *         description: return the updated document
 *         content:
 *             application/json:
 *                  schema:
 *                     properties:
 *                          data:
 *                              type: array
 */

backofficeRouter.put(
  "/translations/:id/status/",
  async (req: RequestWithData, res) => {
    const body = req.body;
    const result = updateStatusSchema.validate(body);
    const { error } = result;

    if (!!error) {
      return res.status(422).json({
        error: errorsText(error),
      });
    }

    res.json({
      data: await backofficeService.changeStatus(
        req.params.id,
        TextTranslationStatus[body.status]
      ),
    });
  }
);

/**
 * @openapi
 * "/backoffice/translations":
 *   get:
 *     summary: to get the all stored translations
 *     responses:
 *       200:
 *         description: return all documents stored
 *         content:
 *             application/json:
 *                  schema:
 *                     properties:
 *                          data:
 *                              type: array
 */

backofficeRouter.get("/translations/", async (req, res) => {
  res.json({ data: await backofficeService.listTranslations() });
});

export default backofficeRouter;
