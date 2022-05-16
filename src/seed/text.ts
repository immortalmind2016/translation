import { TextModel } from "../model/translate.model";
import { Language, TextTranslationDocument } from "../types";
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
  };

const seed = async () => {
  console.log("Start seeding");
  console.log(await TextModel.create(text_1));
  console.log("Seeding has been finished");
};
seed();
