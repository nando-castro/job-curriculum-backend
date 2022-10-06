import joi from "joi";
import { IExperience } from "./../types/ExperienceTypes";

export const experienceSchema = joi.object<IExperience>({
  occupation: joi.string().required(),
  company: joi.string().required(),
  city: joi.string().required(),
  monthStart: joi.string().max(2).required(),
  yearStart: joi.string().max(4).required(),
  monthEnd: joi.string().max(2).required(),
  yearEnd: joi.string().max(4).required(),
  description: joi.string().required(),
  personalDataId: joi.number().required(),
});
