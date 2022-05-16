import { Request } from "express";

export interface TranslationDocument {
  [k: string]: string;
}
export interface TextTranslationDocument {
  _id: string;
  text: string;
  defaultLanguage: Language;
  translations: TranslationDocument;
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
