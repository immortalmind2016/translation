import { TextModel } from "./translation.model";
import {
  ParsedText,
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

const getParsedFilesData = ({ files, filesNames }): ParsedText[][] => {
  const parsedFilesData: ParsedText[][] = files.map((file) => {
    filesNames.push(file.originalname);
    const fileData = file.buffer.toString("utf-8");
    const parsedFileData = parseTextToOject(fileData) || [];
    return parsedFileData;
  });

  return parsedFilesData;
};

const translateSubtitles = (
  { TranslatedMultipleFileSentences, filesNames },
  { toLanguage }
) => {
  const scoreSimilarityMultipleFilesPromises =
    TranslatedMultipleFileSentences.map((result, index) => ({
      textData: getTranslatedSubtitles(result, toLanguage),
      fileName: filesNames[index],
    }));
  return scoreSimilarityMultipleFilesPromises;
};

const sortByScore = (translatedFiles) => {
  return translatedFiles.map((translatedFile) =>
    translatedFile.map((translatedSentence) => {
      return {
        ...translatedSentence,
        similar: translatedSentence.similar.sort((a, b) => b.score - a.score),
      };
    })
  );
};

const translateFile = async (files, { fromLanguage, toLanguage }) => {
  const filesNames = [];

  //Get parsed suitable file data
  const parsedFilesData = getParsedFilesData({ files, filesNames });

  //Get all translated subtitles for multiple files with scores
  const TranslatedMultipleFileSentences = parsedFilesData.map(
    async (fileData) => {
      const translatedSentences =
        await TranslationRepository.findTranslatedSentences(
          fileData,
          fromLanguage
        );
      return scoreSimilarity(fileData, translatedSentences, fromLanguage);
    }
  );

  const TranslatedSortedFilesByScore = sortByScore(
    await Promise.all(TranslatedMultipleFileSentences)
  );

  const translatedSubtitles = translateSubtitles(
    {
      TranslatedMultipleFileSentences: TranslatedSortedFilesByScore,
      filesNames,
    },
    {
      toLanguage,
    }
  );

  return translatedSubtitles;
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
