import mongoose, { Schema } from "mongoose";
import {
  Language,
  TextTranslationDocument,
  TranslationDocument,
} from "../types";
const TranslationSchema = new Schema<TranslationDocument>(
  {
    language: {
      type: String,
      default: Language.en,
      enum: Object.values(Language),
    },
    text: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const TextSchema = new Schema<TextTranslationDocument>(
  {
    defaultLanguage: {
      type: String,
      default: Language.en,
      enum: Object.values(Language),
    },
    text: { type: String, required: true },
    translations: [TranslationSchema],
  },
  {
    timestamps: true,
  }
);

TextSchema.index({ text: 1 });

export const TextModel = mongoose.model("Text", TextSchema);
