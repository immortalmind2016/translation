import { TextModel } from "./translation.model";
import {
  predefinedData,
  RequestWithData,
  SimilarityAlgorithm,
  TextTranslationDocument,
  TextTranslationStatus,
} from "../../types";
import { parseTextToOject } from "../../utils/parser";
import { scoreSimilarity } from "./utils/scoreSimilarityAlgorithm";
import { getTranslatedSubtitles } from "./utils/translation";
import { importDataSchema } from "../../utils/validator";
import { TranslationRepository } from "./translation.repository";

const getScoreSimilarityFiles = async ({ files, filesNames }, fromLanguage) => {
  const scoreSimilarityPromises: SimilarityAlgorithm[] = files.map(
    async (file) => {
      filesNames.push(file.originalname);
      const fileData = file.buffer.toString("utf-8");
      const parsedFileData = parseTextToOject(fileData) || [];
      const TranslatedSentences =
        await TranslationRepository.findTranslatedSentences(
          parsedFileData,
          fromLanguage
        );
      return scoreSimilarity(parsedFileData, TranslatedSentences);
    }
  );

  return Promise.all(scoreSimilarityPromises);
};

const translateSubtitles = async (
  { scoreSimilarityMultileFiles, filesNames },
  { toLanguage }
) => {
  const scoreSimilarityMultileFilesPromises = scoreSimilarityMultileFiles.map(
    async (result, index) => ({
      textData: await getTranslatedSubtitles(result, toLanguage),
      fileName: filesNames[index],
    })
  );
  return Promise.all(scoreSimilarityMultileFilesPromises);
};

const translateFile = async (files, { fromLanguage, toLanguage }) => {
  const filesNames = [];

  //Score similarity algorithm promise for all files
  const scoreSimilarityMultileFiles = await getScoreSimilarityFiles(
    { files, filesNames },
    fromLanguage
  );

  //create suitable format for translated subtitle version for every subtitle file
  //it returns a promise for all translated subtitles
  const translatedSubtitles = await translateSubtitles(
    {
      scoreSimilarityMultileFiles,
      filesNames,
    },
    {
      toLanguage,
    }
  );
  return Promise.all(translatedSubtitles);
};

const importData = async (data: predefinedData[]) => {
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

  const textTranslationDocument = await TranslationRepository.insertData(
    desiredData
  );

  return textTranslationDocument;
};

export const TranslationService = {
  translateFile,
  importData,
};
