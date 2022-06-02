import levenshtein from "js-levenshtein";
import path from "path";
import { promisify } from "util";

var workerFarm = require("worker-farm"),
  workers = workerFarm(
    require.resolve(
      path.join(__dirname, "..", "child-process", "calculate-distance.js")
    )
  );
const calculateDistance = promisify(workers);

import {
  ParsedText,
  SimilarityAlgorithm,
  TextTranslationDocument,
} from "../../../types";

//This is a simple way to find the similar sentences
//We can depend on any NLP algorithms to take on mind the context , sequence and the word by word comparison
//So we will use the current algorithm but it's not the efficient one

export const scoreSimilarity: (
  textFileData: ParsedText[],
  textTranslations: TextTranslationDocument[],
  requiredLanguage: string
) => Promise<SimilarityAlgorithm[]> = async (
  textFileData,
  textTranslations,
  requiredLanguage
) => {
  //compare each sentence from the text file with the results from db , get the score of similarity and return the results
  //in well-formatted shape

  const sentencesScores = textFileData.map(async ({ text, index, time }) => {
    const similarSentences = textTranslations
      .map(async (result) => {
        let [score, translationObjectScore] = await Promise.all([
          calculateDistance(`${result.text}#${text}`),
          calculateDistance(`${result.translations[requiredLanguage]}#${text}`),
        ]);
        if (score <= 5) {
          return {
            data: result,
            score,
          };
        }
        if (translationObjectScore <= 5) {
          //To keep the data order as expected output
          return {
            data: {
              ...result,
              defaultLanguage: requiredLanguage,
              text: result.translations[requiredLanguage],
              translations: {
                ...result.translations,
                [result.defaultLanguage]: result.text,
              },
            },
            score: translationObjectScore,
          };
        }
      })
      .filter((data) => !!data);

    return {
      similar: (await Promise.all(similarSentences)).filter((data) => !!data),
      message: text,
      index,
      time,
    };
  });
  return Promise.all(sentencesScores);
};
