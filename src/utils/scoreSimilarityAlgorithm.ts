import levenshtein from "js-levenshtein";
import { TextModel } from "../model/translate.model";

//This is a simple way to find the similar sentences
//We can depend on any NLP algorithms to take on mind the context , sequence and the word by word comparison
//So we will use the current algorithm but it's not the efficient one

export const scoreSimilarity = async (textFileData) => {
  const sentences = textFileData.map((sentence) => sentence.text);

  //convert every sentence as regex /text/g to query inside mongo as like operation inside sql dbs
  const sentencesAsRegex = sentences.map((text) => new RegExp(text, "g"));
  const queryResults = await TextModel.find({
    text: { $in: sentencesAsRegex },
  });

  //compare each sentence from the text file with the results from db , get the score of similarity and return the results
  //in well-formatted shape

  const sentencesScores = textFileData.map((message) => {
    return {
      similar: queryResults
        .map((result) => {
          let score = levenshtein(result.text, message.text);
          if (score <= 5) {
            return {
              data: result,
              score,
            };
          }
        })
        .filter((data) => !!data),
      message: message.text,
      index: message.index,
    };
  });
  return sentencesScores;
};
