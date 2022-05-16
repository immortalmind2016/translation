import mongoose, { Schema } from "mongoose";
import {
  Language,
  TextTranslationDocument,
  TranslationDocument,
} from "../types";

const TextSchema = new Schema<TextTranslationDocument>(
  {
    defaultLanguage: {
      type: String,
      default: Language.en,
      enum: Object.values(Language),
    },
    text: { type: String, required: true },
    translations: Object,
  },
  {
    timestamps: true,
  }
);

TextSchema.index({ text: 1 });

export const TextModel = mongoose.model("Text", TextSchema);
