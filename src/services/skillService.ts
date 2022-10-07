import { TypeSkillData } from "./../types/SkillTypes";
import * as skillRepository from "../repositories/skillRepository";

export async function createSkill(data: TypeSkillData) {
  const dataSkill = { ...data };
  const result = await skillRepository.insert(dataSkill);
  return result;
}
