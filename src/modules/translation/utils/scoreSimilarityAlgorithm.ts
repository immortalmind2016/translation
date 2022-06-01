import levenshtein from "js-levenshtein";

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
  textTranslations: TextTranslationDocument[]
) => Promise<SimilarityAlgorithm[]> = async (
  textFileData,
  textTranslations
) => {
  //compare each sentence from the text file with the results from db , get the score of similarity and return the results
  //in well-formatted shape

  const sentencesScores = textFileData.map(({ text, index, time }) => {
    const similarSentences = textTranslations
      .map((result) => {
        let score = levenshtein(result.text, text);
        if (score <= 5) {
          return {
            data: result,
            score,
          };
        }
      })
      .filter((data) => !!data);

    return {
      similar: similarSentences,
      message: text,
      index,
      time,
    };
  });
  return sentencesScores;
};
