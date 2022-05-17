import mongoose, { Schema } from "mongoose";
import {
  Language,
  TextTranslationDocument,
  TextTranslationStatus,
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
    status: {
      type: String,
      default: TextTranslationStatus.UNDER_REVIEW,
      enum: Object.values(TextTranslationStatus),
    },
  },
  {
    timestamps: true,
  }
);

TextSchema.index({ text: 1 });

export const TextModel = mongoose.model("Text", TextSchema);
