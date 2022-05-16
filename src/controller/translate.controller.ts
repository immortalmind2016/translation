import { Response } from "express";
import Joi from "joi";
import { TextModel } from "../model/translate.model";
import { RequestWithData, TextTranslationDocument } from "../types";
import { parseTextToOject } from "../utils/parser";
import { scoreSimilarity } from "../utils/scoreSimilarityAlgorithm";
import { importDataSchema } from "../utils/validator";
export const translateFile = async (req, res) => {
  if (!req.file) {
    return res
      .status(422)
      .json({ error: "Your input doesn't contain a required file" });
  }
  const fileData = req?.file?.buffer.toString("utf-8");
  const parsedFileData = parseTextToOject(fileData) || [];
  const results = await scoreSimilarity(parsedFileData);
};
export const importData = async (req: RequestWithData, res) => {
  const body = req.body;
  const result = importDataSchema.validate(body);
  const { error } = result;

  if (!!error) {
    return res.status(422).json({
      error: "Invalid Input",
    });
  }
  const data = body.data;
  const desiredData: Omit<
    TextTranslationDocument,
    "_id" | "createdAt" | "updatedAt"
  >[] = data.map(({ source, sourceLanguage, target, targetLanguage }) => {
    return {
      defaultLanguage: sourceLanguage,
      text: source,
      translations: { [targetLanguage]: target },
    };
  });
  const textTranslationDocument = await TextModel.insertMany(desiredData);
  return res.json({
    data: textTranslationDocument,
  });
};
