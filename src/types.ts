import { Request } from "express";

export interface TranslationDocument {
  [k: string]: string;
}
export enum TextTranslationStatus {
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  DECLINED = "declined",
}
export interface TextTranslationDocument {
  _id: string;
  text: string;
  defaultLanguage: Language;
  translations: TranslationDocument;
  status: TextTranslationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum Language {
  en = "en",
  de = "de",
}

export interface SimilarityAlgorithm {
  message: string;
  index: number;
  time: string;
  similar: {
    data: TextTranslationDocument;
    score: number;
  }[];
}

export interface ParsedText {
  index: number;
  time: string;
  text: string;
}

export interface predefinedData {
  source: string;
  target: string;
  sourceLanguage: Language;
  targetLanguage: Language;
}
export interface RequestWithData extends Request {
  body: {
    data: predefinedData[];
    status: TextTranslationStatus;
  };
}

export interface EmailTemplateArgs {
  to: String;
  subject: String;
  text: String;
  attachments?: {
    filename: string;
    content: string;
  }[];
}
