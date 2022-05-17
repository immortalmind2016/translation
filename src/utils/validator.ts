import Joi from "joi";
import joi from "joi";
import { Language, TextTranslationStatus } from "../types";
const joiString = Joi.string().required();
export const importDataSchema = Joi.object({
  data: Joi.array().items(
    Joi.object().keys({
      source: joiString,
      target: joiString,
      sourceLanguage: joiString.valid(...Object.values(Language)),
      targetLanguage: joiString.valid(...Object.values(Language)),
    })
  ),
});

export const updateStatusSchema = Joi.object({
  status: joiString.valid(...Object.keys(TextTranslationStatus)),
});
