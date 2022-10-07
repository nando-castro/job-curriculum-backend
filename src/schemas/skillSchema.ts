import joi from "joi";
import { ISkill } from "./../types/SkillTypes";

export const skillSchema = joi.object<ISkill>({
  skill: joi.string().required(),
  personalDataId: joi.number().required(),
});
