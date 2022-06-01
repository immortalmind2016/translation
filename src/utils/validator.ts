import Joi from "joi";
import joi from "joi";
import { TextTranslationStatus } from "../types";
const joiString = Joi.string().required();

export const importDataSchema = Joi.object({
  data: Joi.array().items(
    Joi.object().keys({
      source: joiString,
      target: joiString,
      sourceLanguage: joiString,
      targetLanguage: joiString,
    })
  ),
});

export const updateStatusSchema = Joi.object({
  status: joiString.valid(...Object.keys(TextTranslationStatus)),
});

export const translateFileSchema = Joi.object({
  email: joiString.email(),
  fromLanguage: joiString,
  toLanguage: joiString,
});
