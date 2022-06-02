import mongoose, { Schema } from "mongoose";
import { TextTranslationDocument, TextTranslationStatus } from "../../types";

const TextSchema = new Schema<TextTranslationDocument>(
  {
    defaultLanguage: {
      type: String,
      required: true,
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

TextSchema.index({ "$**": "text" });
export const TextModel = mongoose.model("Text", TextSchema);
