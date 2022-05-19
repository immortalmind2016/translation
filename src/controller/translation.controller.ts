import { TextModel } from "../model/translate.model";
import {
  RequestWithData,
  TextTranslationDocument,
  TextTranslationStatus,
} from "../types";
import { parseTextToOject } from "../utils/parser";
import { scoreSimilarity } from "../utils/scoreSimilarityAlgorithm";
import {
  getTranslatedSubtitles,
  sendSubtitlesEmail,
} from "../utils/translation";
import { importDataSchema, translateFileSchema } from "../utils/validator";

export const translateFile = async (req, res) => {
  const body = req.body;
  const result = translateFileSchema.validate(body);
  const { error } = result;
  if (!!error) {
    return res.status(422).json({
      error: "Invalid Input",
    });
  }
  const { email } = body;
  if (!req.files) {
    return res
      .status(422)
      .json({ error: "Your input doesn't contain a required file" });
  }

  const filesNames = [];
  //Score similarity algorithm promise for every file
  const scoreSimilarityPromises = req.files.map(async (file) => {
    filesNames.push(file.originalname);
    const fileData = file.buffer.toString("utf-8");
    const parsedFileData = parseTextToOject(fileData) || [];
    return scoreSimilarity(parsedFileData);
  });

  //output the similar sentences and scores for every sentence result of promises
  const scoreSimilarityPromisesResults = await Promise.all(
    scoreSimilarityPromises
  );

  //create suitable format for translated subtitle version for every subtitle file
  const translatedSubtitles = scoreSimilarityPromisesResults.map(
    (result, index) => ({
      textData: getTranslatedSubtitles(result),
      fileName: filesNames[index],
    })
  );

  try {
    await sendSubtitlesEmail(translatedSubtitles, email);
    res.json({
      message:
        "Subtitles have been successfully translated, We will send it ASAP to your email",
    });
  } catch (e) {
    res.status(500).json({
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

  //convert the input data to a suitable data format
  const desiredData: Omit<
    TextTranslationDocument,
    "_id" | "createdAt" | "updatedAt"
  >[] = data.map(({ source, sourceLanguage, target, targetLanguage }) => {
    return {
      defaultLanguage: sourceLanguage,
      text: source,
      translations: { [targetLanguage]: target },
      status: TextTranslationStatus.UNDER_REVIEW,
    };
  });
  const textTranslationDocument = await TextModel.insertMany(desiredData);
  return res.json({
    data: textTranslationDocument,
  });
};
