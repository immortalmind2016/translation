import { TextModel } from "../model/translate.model";
import {
  Language,
  TextTranslationDocument,
  TextTranslationStatus,
} from "../types";
import mongoose from "mongoose";
import config from "../config";
mongoose.connect(config.MONGO_URI);

const text_1: Omit<TextTranslationDocument, "_id" | "createdAt" | "updatedAt"> =
  {
    text: "I am Arwen - I've come to help you.",
    translations: {
      [Language.de]: "Ich bin Arwen - Ich bin gekommen, um dir zu helfen.",
    },
    defaultLanguage: Language.en,
    status: TextTranslationStatus.APPROVED,
  };

const text_2: Omit<TextTranslationDocument, "_id" | "createdAt" | "updatedAt"> =
  {
    text: "Come back to the light.",
    translations: {
      [Language.de]: "Komm zurück zum Licht.",
    },
    defaultLanguage: Language.en,
    status: TextTranslationStatus.APPROVED,
  };
const seed = async () => {
  console.log("Start seeding");
  console.log(await TextModel.create(text_1));
  console.log(await TextModel.create(text_2));
  console.log("Seeding has been finished");
};
seed();
