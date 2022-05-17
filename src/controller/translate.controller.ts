import { Response } from "express";
import Joi from "joi";
import { TextModel } from "../model/translate.model";
import { translationDataEmail } from "../templates/emailTemplate";
import {
  Language,
  RequestWithData,
  SimilarityAlgorithm,
  TextTranslationDocument,
} from "../types";
import transporter from "../config/emailConfig";
import { parseTextToOject } from "../utils/parser";
import { scoreSimilarity } from "../utils/scoreSimilarityAlgorithm";
import { importDataSchema } from "../utils/validator";

const getTranslatedSubtitles = (results: SimilarityAlgorithm[]): string => {
  const translatedSubTitles = results.map((result) => {
    let message = ``;
    if (result.similar?.length === 0) {
      message = result.message;
    } else {
      message = result.similar[0].data.translations[Language.de];
    }
    return `${result.index} ${result.time} ${message}`;
  });
  return translatedSubTitles.join("\n");
};

export const translateFile = async (req, res) => {
  /*
    #swagger.tags = ["calculations"]
    #swagger.description = 'Fetch a calculation result'
  */
  if (!req.files) {
    return res
      .status(422)
      .json({ error: "Your input doesn't contain a required file" });
  }

  const scoreSimilarityPromises = req.files.map(async (file) => {
    const fileData = file.buffer.toString("utf-8");
    const parsedFileData = parseTextToOject(fileData) || [];
    return scoreSimilarity(parsedFileData);
  });

  const scoreSimilarityPromisesResults = await Promise.all(
    scoreSimilarityPromises
  );
  const translatedSubtitles = scoreSimilarityPromisesResults.map((result) =>
    getTranslatedSubtitles(result)
  );

  const translatedSubtitlesEmailPromises = translatedSubtitles.map(
    (translatedSubtitle, index) =>
      transporter.sendMail(
        translationDataEmail({
          to: "mohamedsalah.software@gmail.com",
          attachments: [
            {
              content: translatedSubtitle,
              filename: `translated-subtitles-${index + 1}.txt`,
            },
          ],
        })
      )
  );
  try {
    await Promise.all(translatedSubtitlesEmailPromises);
    res.json({
      message:
        "Subtitles have been successfully translated, We will send it ASAP to your email",
    });
  } catch (e) {
    res.status(500)({
      message: "Something went wrong while sending your email",
    });
  }
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
