import { TextTranslationDocument, TextTranslationStatus } from "../../types";
import { TextModel } from "./translation.model";

const findTranslatedSentences = async (textFileData, fromLanguage) => {
  const queryResults = (
    await Promise.all(
      textFileData.map((sentence) =>
        TextModel.aggregate([
          {
            $search: {
              index: "default",
              text: {
                query: sentence.text,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ]).match({ status: TextTranslationStatus.APPROVED })
      )
    )
  )
    .flat(2)
    .filter((result) => !!result);

  return queryResults;
};

const insertData = (
  desiredData: Omit<
    TextTranslationDocument,
    "_id" | "createdAt" | "updatedAt"
  >[]
) => {
  return TextModel.insertMany(desiredData);
};

const list = () => TextModel.find();

export const TranslationRepository = {
  findTranslatedSentences,
  insertData,
  list,
};
