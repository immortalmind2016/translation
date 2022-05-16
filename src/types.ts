interface TranslationDocument {
  language: string;
  word: string;
}
interface StringTranslationDocument {
  _id: string;
  word: string;
  src: string;
  translations: {};
  createdAt: Date;
  updatedAt: Date;
}
