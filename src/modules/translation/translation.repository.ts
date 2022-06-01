import { TextTranslationDocument, TextTranslationStatus } from "../../types";
import { TextModel } from "./translation.model";

const findTranslatedSentences = async (textFileData, fromLanguage) => {
  const sentences = textFileData.map((sentence) => sentence.text);
  const queryResults = await TextModel.find({
    status: TextTranslationStatus.APPROVED,
    $or: [
      { text: { $in: sentences }, defaultLanguage: fromLanguage },
      {
        [`translations.${fromLanguage}`]: { $in: sentences },
      },
    ],
  });
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
