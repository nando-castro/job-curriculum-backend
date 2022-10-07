import joi from "joi";
import { ILanguage } from "./../types/LanguageTypes";

export const languageSchema = joi.object<ILanguage>({
  language: joi.string().required(),
  personalDataId: joi.number().required(),
});
