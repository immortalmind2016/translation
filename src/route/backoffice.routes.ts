import { Router } from "express";
import {
  changeStatus,
  listStoredTranslations,
} from "../controller/backoffice.controller";

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
 *                          example:
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
 *                              type: object
 */

backofficeRouter.put("/translations/:id/status/", changeStatus);

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

backofficeRouter.get("/translations/", listStoredTranslations);

export default backofficeRouter;
