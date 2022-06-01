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
  defaultLanguage: string;
  translations: TranslationDocument;
  status: TextTranslationStatus;
  createdAt: Date;
  updatedAt: Date;
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
  sourceLanguage: string;
  targetLanguage: string;
}
export interface RequestWithData extends Request {
  body: {
    data: predefinedData[];
    status: TextTranslationStatus;
    email: string;
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
