import Joi from "joi";
import joi from "joi";
import { Language } from "../types";
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
