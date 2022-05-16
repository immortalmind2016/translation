export interface TranslationDocument {
  language: Language;
  text: string;
}
export interface TextTranslationDocument {
  _id: string;
  text: string;
  defaultLanguage: Language;
  translations: {};
  createdAt: Date;
  updatedAt: Date;
}

export enum Language {
  en = "en",
  de = "de",
}
