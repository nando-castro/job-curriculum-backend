import joi from "joi";
import { IFormation } from "./../types/FormationTypes";

export const formationSchema = joi.object<IFormation>({
  formation: joi.string().required(),
  institution: joi.string().required(),
  city: joi.string().required(),
  monthStart: joi.string().max(2).required(),
  yearStart: joi.string().max(4).required(),
  monthEnd: joi.string().max(2).required(),
  yearEnd: joi.string().max(4).required(),
  description: joi.string().required(),
});
